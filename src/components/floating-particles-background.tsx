'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

function FloatingParticles(props: any) {
  const ref: any = useRef();
  const [sphere] = useState(() => {
    // Create a smaller sphere with valid positions
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const i3 = i * 3;
      // Generate random positions in a sphere with radius 1.5
      const radius = 1.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#2B8DBE"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function FloatingParticlesBackground({ className = "", ...props }: { className?: string }) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FloatingParticles />
      </Canvas>
    </div>
  );
}