import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere visible args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#007ea7"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#00d4ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#006a8a" />
        <pointLight position={[0, 5, 5]} intensity={1} color="#67e8f9" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
