import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const services = [
  { position: [2.8, 0, 0] as [number, number, number], text: 'Software\na medida', color: '#1e3a8a' },
  { position: [-2.8, 0, 0] as [number, number, number], text: 'Redes\nProfesionales', color: '#334155' },
  { position: [0, 2.5, 0] as [number, number, number], text: 'Automatización\nInteligente', color: '#1e3a8a' },
  { position: [0, -2.5, 0] as [number, number, number], text: 'Datos\nOrganizados', color: '#334155' },
  { position: [0, 0, 2.8] as [number, number, number], text: 'Diseño\n& Multimedia', color: '#1e3a8a' },
  { position: [0, 0, -2.8] as [number, number, number], text: 'Consultoría\nEstratégica', color: '#334155' },
]

function LinkGeometry({ color, metalness, roughness, position, rotation }: {
  color: string
  metalness: number
  roughness: number
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Creamos la geometría del eslabón: un toro estirado
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.2, 0, 0),
      new THREE.Vector3(-1, 0.8, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(1, 0.8, 0),
      new THREE.Vector3(1.2, 0, 0),
      new THREE.Vector3(1, -0.8, 0),
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(-1, -0.8, 0),
      new THREE.Vector3(-1.2, 0, 0),
    ], true)
    return new THREE.TubeGeometry(curve, 64, 0.35, 16, true)
  }, [])

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} rotation={rotation} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.15
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-3, -2, -5]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#1e3a8a" />

      <group ref={groupRef}>
        {/* Eslabón azul - inclinado */}
        <LinkGeometry
          color="#1e3a8a"
          metalness={0.9}
          roughness={0.15}
          position={[0, -0.3, 0]}
          rotation={[0, 0, Math.PI / 4]}
        />

        {/* Eslabón negro - perpendicular */}
        <LinkGeometry
          color="#1e293b"
          metalness={0.85}
          roughness={0.25}
          position={[0, 0.3, 0]}
          rotation={[Math.PI / 2, Math.PI / 4, 0]}
        />

        {/* Textos flotantes alrededor */}
        {services.map((service, i) => (
          <Html
            key={i}
            position={service.position}
            center
            distanceFactor={8}
            style={{
              transition: 'all 0.5s ease',
              opacity: 0.9,
              pointerEvents: 'none',
            }}
          >
            <div className="text-center whitespace-pre-line">
              <div
                className="text-xs font-bold tracking-[0.25em] uppercase mb-1"
                style={{ color: service.color }}
              >
                Servicio
              </div>
              <div className="text-lg font-display font-bold text-ink leading-tight">
                {service.text.split('\n').map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </div>
            </div>
          </Html>
        ))}
      </group>

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      <Environment preset="city" />
    </>
  )
}

const Logo3D: React.FC = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default Logo3D
