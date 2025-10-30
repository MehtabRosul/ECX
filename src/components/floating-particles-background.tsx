'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

type FloatingParticlesProps = {
  count?: number;
};

function FloatingParticles({ count = 15000 }: FloatingParticlesProps) {
  const pointsRef: any = useRef();
  const [positions] = useState(() => {
    // Hybrid distribution: mostly torus with spherical outliers and jitter for randomness
    const majorRadius = 1.25; // distance from center
    const minorRadius = 0.5; // tube radius
    const total = Math.max(1000, Math.min(30000, count));
    const arr = new Float32Array(total * 3);
    for (let i = 0; i < total; i++) {
      const i3 = i * 3;
      const useTorus = Math.random() < 0.7; // 70% torus, 30% sphere samples
      if (useTorus) {
        const u = Math.random() * Math.PI * 2; // around the hole
        const v = Math.random() * Math.PI * 2; // around the tube
        // jitter the radii slightly for irregularity
        const jitter = (Math.random() - 0.5) * 0.08;
        const r = (majorRadius + jitter) + (minorRadius + jitter) * Math.cos(v);
        const x = r * Math.cos(u);
        const y = r * Math.sin(u);
        const z = (minorRadius + jitter) * Math.sin(v);
        // apply small positional noise
        arr[i3] = x + (Math.random() - 0.5) * 0.06;
        arr[i3 + 1] = y + (Math.random() - 0.5) * 0.06;
        arr[i3 + 2] = z + (Math.random() - 0.5) * 0.06;
      } else {
        // sphere sample with cubic radius distribution for denser center
        const radius = 1.6 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i3] = radius * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 0.05;
        arr[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 0.05;
        arr[i3 + 2] = radius * Math.cos(phi) + (Math.random() - 0.5) * 0.05;
      }
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x += delta * 0.04;
    pointsRef.current.rotation.y -= delta * 0.03;
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2B8DBE"
          size={0.0028}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function FloatingParticlesBackground({ className = "", count = 15000 }: { className?: string; count?: number }) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1] }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <FloatingParticles count={count} />
      </Canvas>
    </div>
  );
}