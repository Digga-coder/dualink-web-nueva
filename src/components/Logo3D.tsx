import { useRef, useMemo, useEffect, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import type { Quality } from '../lib/quality'

/* ============================================================
   DUALINK · CLIP 3D — decorativo
   ------------------------------------------------------------
   CAMBIOS FRENTE A LA VERSIÓN ANTERIOR:

   1. Ya no depende del scroll. Antes la cámara viajaba entre 7
      "tomas" empujada por un hero de 765vh, y las tarjetas de
      servicio sólo se mostraban cuando la cámara aterrizaba —
      cosa que no ocurre si el visitante scrollea seguido. El
      scrollytelling se ha eliminado: esto es un adorno de fondo
      y se comporta como tal.

   2. Sin descargas externas. `<Environment preset="studio" />`
      se bajaba un HDRI de varios MB desde un CDN de terceros en
      CADA carga, y hasta que llegaba el metal se veía negro.
      Ahora el mapa de entorno se genera en GPU con Lightformers:
      cero red, mismo acabado.

   3. Carga diferida. Este módulo arrastra three.js (~1 MB sin
      comprimir). Ahora se importa con React.lazy desde el Hero,
      así que el titular, el texto y el botón de WhatsApp se
      pintan y funcionan SIN esperar al 3D, que llega después.
      `detectQuality` vive en lib/quality.ts justo por esto.

   SE MANTIENE lo que estaba bien hecho: LOD por gama de
   dispositivo, culling del bucle de render fuera del viewport y
   DPR adaptativo.
   ============================================================ */

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
   compartida entre ambos para no duplicar VRAM). Rotación lenta
   y flotación casi imperceptible. */
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
  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    /* `delta` se acota para evitar un salto brusco al reanudar
       el bucle tras el culling. */
    g.rotation.y += Math.min(delta, 0.05) * 0.18
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * floatAmp
  })

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} position={[0, 0.6, 0]} castShadow={shadows} receiveShadow={shadows}>
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

/* Mapa de entorno generado en GPU: sustituye al HDRI remoto.
   Tres focos rectangulares bastan para que el metal tenga
   reflejos creíbles. */
function StudioEnv({ quality }: { quality: Quality }) {
  return (
    <Environment resolution={quality === 'high' ? 256 : 128}>
      <Lightformer intensity={2.6} position={[0, 4, 3]} scale={[8, 3, 1]} color="#ffffff" />
      <Lightformer intensity={1.4} position={[-4, 1, 2]} scale={[4, 6, 1]} color="#9db8ff" />
      <Lightformer intensity={1.1} position={[4, -2, 2]} scale={[4, 4, 1]} color="#3b82f6" />
    </Environment>
  )
}

function Scene({ quality }: { quality: Quality }) {
  const shadows = quality === 'high'

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 6]} intensity={2.6} castShadow={shadows} />
      <directionalLight position={[-6, 3, -5]} intensity={1} color="#7aa2ff" />
      <pointLight position={[0, -2, 6]} intensity={0.9} color="#3b82f6" />

      <Clip quality={quality} />

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

      <StudioEnv quality={quality} />
    </>
  )
}

const Logo3D = memo(function Logo3D({
  quality,
  visible,
}: {
  quality: Quality
  visible: boolean
}) {
  const maxDpr = quality === 'high' ? 2 : 1.3

  return (
    <Canvas
      shadows={quality === 'high'}
      /* AdaptiveDpr ajusta la resolución real dentro de este rango */
      dpr={[1, maxDpr]}
      /* CULLING: pausa total del bucle WebGL fuera del viewport */
      frameloop={visible ? 'always' : 'never'}
      camera={{ position: [2.6, 1.4, 6.2], fov: 38 }}
      gl={{
        antialias: quality === 'high',
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      style={{ background: 'transparent' }}
    >
      <AdaptiveDpr pixelated />
      <Scene quality={quality} />
    </Canvas>
  )
})

export default Logo3D
