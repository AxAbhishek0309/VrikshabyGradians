"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

function PlantModel() {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={meshRef}>
        {/* Pot */}
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[1.2, 1, 1.5, 32]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        {/* Soil */}
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.2, 32]} />
          <meshStandardMaterial color="#4A4A4A" roughness={1} />
        </mesh>

        {/* Main Stem */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 3, 8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>

        {/* Leaves */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const height = 0.5 + i * 0.3
          const radius = 0.8 + Math.sin(i) * 0.3

          return (
            <group key={i} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
              <mesh rotation={[0, angle, Math.PI / 6]}>
                <planeGeometry args={[1.5, 0.8]} />
                <meshStandardMaterial color="#32CD32" side={THREE.DoubleSide} transparent opacity={0.9} />
              </mesh>
            </group>
          )
        })}

        {/* Flowers */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[Math.cos(i * 2) * 0.5, 2 + i * 0.3, Math.sin(i * 2) * 0.5]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export function Plant3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <PlantModel />

        <Environment preset="park" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
