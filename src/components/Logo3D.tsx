import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ============================================================
   DUALINK · CLIP 3D — render fotorrealista + cámara cinemática
   ------------------------------------------------------------
   El asset (dos eslabones de cadena entrelazados, azul metálico
   oscuro + grafito) permanece FIJO en la escena. Es la CÁMARA
   la que se desplaza: hace "zoom in" y paneos calculados hacia
   una cara concreta del modelo por cada servicio.

   - `activeIndex`  -> qué cara enfocar (0..5)
   - `inIntro`      -> encuadre amplio del modelo completo
   - `autoPlayActive` -> movimiento de cámara más lento/cinematográfico
   - `onShotSettled(index)` -> avisa cuando la cámara llega a destino,
     para sincronizar la aparición de la UI contextual.
   ============================================================ */

type Shot = {
  /* Posición de la cámara en el espacio */
  pos: [number, number, number]
  /* Punto al que mira la cámara (una cara/eslabón del clip) */
  target: [number, number, number]
}

/* Encuadre de introducción: el modelo completo, alejado y en
   un escorzo diagonal que reproduce el render de referencia. */
const INTRO_SHOT: Shot = { pos: [2.6, 1.8, 7.6], target: [0, 0, 0] }

/* Una toma de cámara por servicio. Cada una hace foco ("zoom in"
   + paneo) sobre una cara distinta del clip:
     0 eslabón azul · arco superior 3/4 frontal
     1 eslabón grafito · perfil derecho
     2 zona de entrelazado · primer plano
     3 eslabón azul · 3/4 izquierdo
     4 arco superior · contrapicado alto
     5 eslabón grafito · picado inferior */
const SHOTS: Shot[] = [
  { pos: [2.4, 1.5, 4.6], target: [0, 0.6, 0] },
  { pos: [4.3, -1.0, 3.1], target: [0, -0.6, 0] },
  { pos: [-1.5, 0.25, 3.3], target: [0, 0, 0] },
  { pos: [-3.9, 1.6, 3.6], target: [0, 0.6, 0] },
  { pos: [0.6, 3.3, 4.3], target: [0, 1.1, 0] },
  { pos: [-3.0, -2.4, 3.8], target: [0, -0.7, 0] },
]

/* ----- Geometría de un eslabón de cadena (forma de "pista de
   atletismo": dos rectas unidas por dos semicírculos) ----- */
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

/* Proporciones más robustas/chunky para acercarse al render real */
const STRAIGHT_HALF = 0.5
const LINK_RADIUS = 0.72
const TUBE_RADIUS = 0.31

function ChainLink({
  color,
  metalness,
  roughness,
  clearcoat,
  clearcoatRoughness,
  envMapIntensity,
  position,
  rotation,
}: {
  color: string
  metalness: number
  roughness: number
  clearcoat: number
  clearcoatRoughness: number
  envMapIntensity: number
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  const geometry = useMemo(() => {
    const curve = makeLinkCurve(STRAIGHT_HALF, LINK_RADIUS)
    return new THREE.TubeGeometry(curve, 320, TUBE_RADIUS, 40, true)
  }, [])

  return (
    <mesh geometry={geometry} position={position} rotation={rotation} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        clearcoat={clearcoat}
        clearcoatRoughness={clearcoatRoughness}
        envMapIntensity={envMapIntensity}
        reflectivity={0.7}
      />
    </mesh>
  )
}

/* El clip completo: dos eslabones entrelazados. El modelo NO rota;
   sólo flota de forma casi imperceptible para dar "vida". */
function Clip() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const g = groupRef.current
    if (!g) return
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04
  })

  return (
    <group ref={groupRef}>
      {/* Eslabón azul metálico oscuro — acabado tipo pintura automotriz */}
      <ChainLink
        color="#0d1a44"
        metalness={0.9}
        roughness={0.16}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.7}
        position={[0, 0.6, 0]}
        rotation={[0, 0, 0]}
      />
      {/* Eslabón grafito — acabado metálico satinado oscuro */}
      <ChainLink
        color="#15171d"
        metalness={0.82}
        roughness={0.34}
        clearcoat={0.55}
        clearcoatRoughness={0.4}
        envMapIntensity={1.1}
        position={[0, -0.6, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  )
}

/* ----- Plataforma de cámara: intercepta `activeIndex`/`inIntro`
   y desplaza la cámara hacia la toma correspondiente ----- */
function CameraRig({
  activeIndex,
  inIntro,
  autoPlayActive,
  onShotSettled,
}: {
  activeIndex: number
  inIntro: boolean
  autoPlayActive: boolean
  onShotSettled?: (index: number) => void
}) {
  const { camera } = useThree()
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const targetLook = useMemo(() => new THREE.Vector3(), [])
  const currentLook = useRef(new THREE.Vector3(0, 0, 0))
  const settledRef = useRef(false)

  /* Al cambiar de toma, la cámara vuelve a estar "en tránsito" */
  useEffect(() => {
    settledRef.current = false
  }, [activeIndex, inIntro])

  useFrame((_, delta) => {
    const shot = inIntro ? INTRO_SHOT : SHOTS[activeIndex] ?? SHOTS[0]
    targetPos.set(shot.pos[0], shot.pos[1], shot.pos[2])
    targetLook.set(shot.target[0], shot.target[1], shot.target[2])

    /* Suavizado independiente del framerate. Más lento (más
       cinematográfico) cuando el recorrido es automático. */
    const smooth = autoPlayActive ? 0.0022 : 0.0042
    const lerp = 1 - Math.pow(smooth, delta)

    camera.position.lerp(targetPos, lerp)
    currentLook.current.lerp(targetLook, lerp)
    camera.lookAt(currentLook.current)

    /* Detección de llegada: dispara la UI contextual una sola vez */
    const dist = camera.position.distanceTo(targetPos)
    if (!settledRef.current && dist < 0.07) {
      settledRef.current = true
      if (!inIntro) onShotSettled?.(activeIndex)
    }
  })

  return null
}

function Scene({
  activeIndex,
  inIntro,
  autoPlayActive,
  onShotSettled,
}: {
  activeIndex: number
  inIntro: boolean
  autoPlayActive: boolean
  onShotSettled?: (index: number) => void
}) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 6]} intensity={2.6} castShadow />
      <directionalLight position={[-6, 3, -5]} intensity={1} color="#7aa2ff" />
      <directionalLight position={[3, -4, 3]} intensity={0.7} color="#1e40af" />
      <pointLight position={[0, -2, 6]} intensity={0.9} color="#3b82f6" />

      <Clip />

      <CameraRig
        activeIndex={activeIndex}
        inIntro={inIntro}
        autoPlayActive={autoPlayActive}
        onShotSettled={onShotSettled}
      />

      <ContactShadows position={[0, -2.6, 0]} opacity={0.45} scale={13} blur={3} far={5} />
      <Environment preset="studio" />
    </>
  )
}

const Logo3D: React.FC<{
  activeIndex?: number
  inIntro?: boolean
  autoPlayActive?: boolean
  onShotSettled?: (index: number) => void
}> = ({ activeIndex = 0, inIntro = true, autoPlayActive = false, onShotSettled }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: INTRO_SHOT.pos, fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene
        activeIndex={activeIndex}
        inIntro={inIntro}
        autoPlayActive={autoPlayActive}
        onShotSettled={onShotSettled}
      />
    </Canvas>
  )
}

export default Logo3D
