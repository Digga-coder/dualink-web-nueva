import { useRef, useMemo, useEffect, memo, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

/* ============================================================
   DUALINK · CLIP 3D — render fotorrealista + cámara cinemática
   ------------------------------------------------------------
   RENDIMIENTO (puntos clave de esta versión):

   1. Desacople de eventos nativos: el scroll NO mueve la cámara
      directamente. El Hero sólo escribe un "target value" en
      `sceneStateRef`. La cámara persigue ese target mediante
      lerp dentro de useFrame (= requestAnimationFrame de R3F).
   2. El árbol del Canvas NO se vuelve a renderizar al hacer
      scroll: la escena lee de un ref mutable, no de props.
   3. Estrategia adaptativa (LOD): `quality` reduce geometría,
      sombras y reflejos en hardware móvil / de gama baja.
   4. Culling: el Canvas pausa el bucle de render (frameloop
      'never') cuando el Hero sale del viewport.
   5. PerformanceMonitor + AdaptiveDpr bajan la resolución de
      render si los FPS caen por debajo del umbral.
   ============================================================ */

export type SceneState = {
  activeIndex: number
  inIntro: boolean
  autoPlay: boolean
}

export type Quality = 'high' | 'low'

/* Detección de gama de dispositivo (una sola vez en el cliente) */
export function detectQuality(): Quality {
  if (typeof window === 'undefined') return 'high'
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'low'
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.matchMedia('(max-width: 820px)').matches
    const cores = navigator.hardwareConcurrency ?? 8
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8
    if (coarse && narrow) return 'low'
    if (cores <= 4 || mem <= 4) return 'low'
  } catch {
    /* matchMedia no disponible: asumimos gama alta */
  }
  return 'high'
}

type Shot = {
  pos: [number, number, number]
  target: [number, number, number]
}

const INTRO_SHOT: Shot = { pos: [2.6, 1.8, 7.6], target: [0, 0, 0] }

/* Una toma de cámara por servicio (foco sobre una cara del clip) */
const SHOTS: Shot[] = [
  { pos: [2.4, 1.5, 4.6], target: [0, 0.6, 0] },
  { pos: [4.3, -1.0, 3.1], target: [0, -0.6, 0] },
  { pos: [-1.5, 0.25, 3.3], target: [0, 0, 0] },
  { pos: [-3.9, 1.6, 3.6], target: [0, 0.6, 0] },
  { pos: [0.6, 3.3, 4.3], target: [0, 1.1, 0] },
  { pos: [-3.0, -2.4, 3.8], target: [0, -0.7, 0] },
]

/* ----- Nivel de detalle (LOD) por gama de dispositivo -----
   La carga geométrica del tubo es el principal coste de VRAM:
   gama alta ~51k triángulos, gama baja ~6k. */
const LOD: Record<Quality, { tubular: number; radial: number }> = {
  high: { tubular: 320, radial: 40 },
  low: { tubular: 110, radial: 14 },
}

/* ----- Geometría de un eslabón (forma de "pista de atletismo") ----- */
function makeLinkCurve(straightHalf: number, radius: number) {
  const pts: THREE.Vector3[] = []
  const arcSeg = 20
  const sideSeg = 8

  for (let i = 0; i < sideSeg; i++) {
    const y = -straightHalf + 2 * straightHalf * (i / sideSeg)
    pts.push(new THREE.Vector3(radius, y, 0))
  }
  for (let i = 0; i <= arcSeg; i++) {
    const t = Math.PI * (i / arcSeg)
    pts.push(new THREE.Vector3(Math.cos(t) * radius, straightHalf + Math.sin(t) * radius, 0))
  }
  for (let i = 1; i < sideSeg; i++) {
    const y = straightHalf - 2 * straightHalf * (i / sideSeg)
    pts.push(new THREE.Vector3(-radius, y, 0))
  }
  for (let i = 0; i <= arcSeg; i++) {
    const t = Math.PI + Math.PI * (i / arcSeg)
    pts.push(new THREE.Vector3(Math.cos(t) * radius, -straightHalf + Math.sin(t) * radius, 0))
  }

  return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0)
}

const STRAIGHT_HALF = 0.5
const LINK_RADIUS = 0.72
const TUBE_RADIUS = 0.31

/* Material adaptativo: en gama baja se sustituye el material
   físico (clearcoat = segundo lóbulo especular, caro en GPU
   móvil) por uno estándar metálico más ligero. */
function LinkMaterial({ quality, variant }: { quality: Quality; variant: 'blue' | 'graphite' }) {
  const isBlue = variant === 'blue'
  const color = isBlue ? '#0d1a44' : '#15171d'

  if (quality === 'low') {
    return (
      <meshStandardMaterial
        color={color}
        metalness={isBlue ? 0.9 : 0.82}
        roughness={isBlue ? 0.22 : 0.42}
        envMapIntensity={isBlue ? 1.5 : 1.0}
      />
    )
  }

  return (
    <meshPhysicalMaterial
      color={color}
      metalness={isBlue ? 0.9 : 0.82}
      roughness={isBlue ? 0.16 : 0.34}
      clearcoat={isBlue ? 1 : 0.55}
      clearcoatRoughness={isBlue ? 0.1 : 0.4}
      envMapIntensity={isBlue ? 1.7 : 1.1}
      reflectivity={0.7}
    />
  )
}

/* El clip completo: dos eslabones entrelazados (geometría
   compartida entre ambos para no duplicar VRAM). El modelo NO
   rota; sólo flota de forma casi imperceptible. */
function Clip({ quality }: { quality: Quality }) {
  const groupRef = useRef<THREE.Group>(null)
  const seg = LOD[quality]
  const shadows = quality === 'high'

  const geometry = useMemo(() => {
    const curve = makeLinkCurve(STRAIGHT_HALF, LINK_RADIUS)
    return new THREE.TubeGeometry(curve, seg.tubular, TUBE_RADIUS, seg.radial, true)
  }, [seg.tubular, seg.radial])

  /* Libera la VRAM de la geometría al desmontar */
  useEffect(() => () => geometry.dispose(), [geometry])

  const floatAmp = quality === 'high' ? 0.04 : 0.02
  useFrame((state) => {
    const g = groupRef.current
    if (!g) return
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * floatAmp
  })

  return (
    <group ref={groupRef}>
      <mesh
        geometry={geometry}
        position={[0, 0.6, 0]}
        castShadow={shadows}
        receiveShadow={shadows}
      >
        <LinkMaterial quality={quality} variant="blue" />
      </mesh>
      <mesh
        geometry={geometry}
        position={[0, -0.6, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow={shadows}
        receiveShadow={shadows}
      >
        <LinkMaterial quality={quality} variant="graphite" />
      </mesh>
    </group>
  )
}

/* ----- Plataforma de cámara -----
   Lee el "target value" desde `stateRef` (mutado por el Hero) y
   persigue la toma correspondiente con interpolación lineal.
   No depende de props de React => el scroll no re-renderiza. */
function CameraRig({
  stateRef,
  onShotSettled,
}: {
  stateRef: MutableRefObject<SceneState>
  onShotSettled?: (index: number) => void
}) {
  const { camera } = useThree()
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const targetLook = useMemo(() => new THREE.Vector3(), [])
  const currentLook = useRef(new THREE.Vector3(0, 0, 0))
  const settledRef = useRef(false)
  const prevKey = useRef('')

  useFrame((_, delta) => {
    const s = stateRef.current

    /* Al cambiar de toma, la cámara vuelve a estar "en tránsito" */
    const key = s.inIntro ? 'intro' : `svc-${s.activeIndex}`
    if (key !== prevKey.current) {
      prevKey.current = key
      settledRef.current = false
    }

    const shot = s.inIntro ? INTRO_SHOT : SHOTS[s.activeIndex] ?? SHOTS[0]
    targetPos.set(shot.pos[0], shot.pos[1], shot.pos[2])
    targetLook.set(shot.target[0], shot.target[1], shot.target[2])

    /* Suavizado independiente del framerate. `delta` se acota
       para evitar saltos al reanudar el bucle tras el culling. */
    const d = Math.min(delta, 0.05)
    const smooth = s.autoPlay ? 0.0022 : 0.0042
    const lerp = 1 - Math.pow(smooth, d)

    camera.position.lerp(targetPos, lerp)
    currentLook.current.lerp(targetLook, lerp)
    camera.lookAt(currentLook.current)

    /* Detección de llegada: dispara la UI contextual una sola vez */
    if (!settledRef.current && camera.position.distanceTo(targetPos) < 0.07) {
      settledRef.current = true
      if (!s.inIntro) onShotSettled?.(s.activeIndex)
    }
  })

  return null
}

function Scene({
  quality,
  stateRef,
  onShotSettled,
}: {
  quality: Quality
  stateRef: MutableRefObject<SceneState>
  onShotSettled?: (index: number) => void
}) {
  const shadows = quality === 'high'

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 6]} intensity={2.6} castShadow={shadows} />
      <directionalLight position={[-6, 3, -5]} intensity={1} color="#7aa2ff" />
      <directionalLight position={[3, -4, 3]} intensity={0.7} color="#1e40af" />
      <pointLight position={[0, -2, 6]} intensity={0.9} color="#3b82f6" />

      <Clip quality={quality} />

      <CameraRig stateRef={stateRef} onShotSettled={onShotSettled} />

      {/* Sombra de contacto horneada una sola vez (frames=1):
          deja de recalcularse cada frame => gran ahorro de GPU. */}
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.45}
        scale={13}
        blur={3}
        far={5}
        frames={1}
        resolution={shadows ? 512 : 256}
      />

      <Environment preset="studio" />
    </>
  )
}

const Logo3D = memo(function Logo3D({
  stateRef,
  quality,
  visible,
  onShotSettled,
}: {
  stateRef: MutableRefObject<SceneState>
  quality: Quality
  visible: boolean
  onShotSettled?: (index: number) => void
}) {
  const maxDpr = quality === 'high' ? 2 : 1.3

  return (
    <Canvas
      shadows={quality === 'high'}
      /* AdaptiveDpr ajusta la resolución real dentro de este rango */
      dpr={[1, maxDpr]}
      /* CULLING: pausa total del bucle WebGL fuera del viewport */
      frameloop={visible ? 'always' : 'never'}
      camera={{ position: INTRO_SHOT.pos, fov: 38 }}
      gl={{
        antialias: quality === 'high',
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      style={{ background: 'transparent' }}
    >
      {/* Monitoriza FPS y degrada calidad si caen bajo el umbral */}
      <PerformanceMonitor />
      <AdaptiveDpr pixelated />
      <Scene quality={quality} stateRef={stateRef} onShotSettled={onShotSettled} />
    </Canvas>
  )
})

export default Logo3D
