'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function InnerPoints() {
  const ref: any = useRef();
  const [positions] = useState(() => {
    const total = 2000;
    const arr = new Float32Array(total * 3);
    for (let i = 0; i < total; i++) {
      const i3 = i * 3;
      const radius = 1.2 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  });

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#2B8DBE" size={0.005} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

export default function ProductVisualizationClient() {
  return (
    <Canvas dpr={[1, 1.25]} gl={{ antialias: false, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 1] }}>
      <InnerPoints />
    </Canvas>
  );
}


