"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitData {
  radiusX: number;
  radiusY: number;
  rotation: [number, number, number];
  speed: number;
  phase: number;
  color: string;
}

export function Atom3D() {
  const groupRef = useRef<THREE.Group>(null);
  const nucleusRef = useRef<THREE.Group>(null);
  
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setPositionX(2.8);
        setPositionY(0);
        setScale(1.0);
      } else if (window.innerWidth >= 768) {
        setPositionX(2.0);
        setPositionY(0);
        setScale(0.9);
      } else {
        setPositionX(0);
        setPositionY(-1.2);
        setScale(0.7);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Orbits configuration
  const orbits: OrbitData[] = useMemo(() => [
    {
      radiusX: 3.5,
      radiusY: 3.5,
      rotation: [Math.PI / 4, Math.PI / 6, 0],
      speed: 1.8,
      phase: 0,
      color: "#ffffff", // Pure white neon glow
    },
    {
      radiusX: 4.2,
      radiusY: 4.2,
      rotation: [-Math.PI / 4, Math.PI / 4, 0],
      speed: 1.4,
      phase: Math.PI / 3,
      color: "#d4d4d8", // Silver Slate (Zinc 300)
    },
    {
      radiusX: 4.8,
      radiusY: 4.8,
      rotation: [Math.PI / 2, Math.PI / 8, Math.PI / 4],
      speed: 1.1,
      phase: (Math.PI * 2) / 3,
      color: "#71717a", // Muted Charcoal (Zinc 500)
    },
  ], []);

  // Nucleus particle setup (protons and neutrons)
  const nucleusParticles = useMemo(() => {
    const temp = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.random() * 0.4; // Tight cluster
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      // Protons (primary) vs Neutrons (accent)
      const color = i % 2 === 0 ? "#ffffff" : "#a1a1aa";
      temp.push({ position: new THREE.Vector3(x, y, z), color, scale: Math.random() * 0.08 + 0.12 });
    }
    return temp;
  }, []);

  // Pre-generate orbit ring geometry points for maximum performance
  const ringGeometries = useMemo(() => {
    return orbits.map((orbit) => {
      const points = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * orbit.radiusX, Math.sin(theta) * orbit.radiusY, 0));
      }
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [orbits]);

  // Electrons references
  const electronRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Smooth cursor-follow tilting (Parallax effect)
    if (groupRef.current) {
      const targetRotationX = state.pointer.y * 0.4;
      const targetRotationY = state.pointer.x * 0.4;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }

    // Nucleus vibration & rotation (representing active quantum energy)
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y = t * 0.5;
      nucleusRef.current.rotation.z = t * 0.2;
      
      // Gentle breathing scale
      const pulse = Math.sin(t * 2) * 0.05 + 1;
      nucleusRef.current.scale.set(pulse, pulse, pulse);
    }

    // Update electron positions on their respective tilted orbital paths
    orbits.forEach((orbit, index) => {
      const mesh = electronRefs.current[index];
      if (mesh) {
        const angle = t * orbit.speed + orbit.phase;
        mesh.position.x = Math.cos(angle) * orbit.radiusX;
        mesh.position.y = Math.sin(angle) * orbit.radiusY;
        
        // Add a slight high-frequency jitter for quantum feel
        mesh.position.x += Math.sin(t * 30 + index) * 0.02;
        mesh.position.y += Math.cos(t * 30 + index) * 0.02;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Ambient Lighting in Hero Canvas */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#71717a" />

      {/* Responsive Offset Group to clear text overlay */}
      <group position={[positionX, positionY, 0]} scale={[scale, scale, scale]}>
        {/* Main Core Nucleus Group */}
        <group ref={nucleusRef}>
        {/* Core Quantum Energy Field (Translucent Outer Glow) */}
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.10}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial
            color="#cbd5e1"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Nucleus Protons and Neutrons particles */}
        {nucleusParticles.map((particle, idx) => (
          <mesh key={idx} position={particle.position}>
            <sphereGeometry args={[particle.scale, 16, 16]} />
            <meshBasicMaterial color={particle.color} />
          </mesh>
        ))}
      </group>

      {/* Orbit Rings & Orbiting Electrons */}
      {orbits.map((orbit, index) => (
        <group key={index} rotation={orbit.rotation}>
          {/* Glowing Vector Orbit Loop Line */}
          <lineLoop geometry={ringGeometries[index]}>
            <lineBasicMaterial
              color={orbit.color}
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
              linewidth={1}
            />
          </lineLoop>

          {/* Orbit outer shadow loop */}
          <lineLoop geometry={ringGeometries[index]}>
            <lineBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.06}
              linewidth={1}
            />
          </lineLoop>

          {/* Active Orbiting Electron Node */}
          <mesh
            ref={(el) => {
              if (el) electronRefs.current[index] = el;
            }}
          >
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshBasicMaterial
              color={orbit.color}
              transparent
              opacity={0.95}
            />
            {/* Tiny glow halo on electron */}
            <mesh scale={2}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial
                color={orbit.color}
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </mesh>
        </group>
      ))}
      </group>

      {/* Background Star Cloud dust tailored for the Hero Canvas */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(Array.from({ length: 450 }, () => (Math.random() - 0.5) * 15))}
            itemSize={3}
            count={150}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.035}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
