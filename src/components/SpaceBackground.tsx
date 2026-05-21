"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CelestialField() {
  const pointsRef1 = useRef<THREE.Points>(null);
  const pointsRef2 = useRef<THREE.Points>(null);
  const scrollYRef = useRef(0);
  const warpRef = useRef(1);
  const isWarpingRef = useRef(false);

  // Synchronize with page scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to visual warp-speed event from terminal easter egg
  useEffect(() => {
    const handleWarp = () => {
      if (isWarpingRef.current) return;
      isWarpingRef.current = true;
      
      let start = performance.now();
      const duration = 1200; // time to reach peak warp
      const peakWarp = 40; // warp speed factor multiplier
      
      const animateUp = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out quad for smooth acceleration
        warpRef.current = 1 + (peakWarp - 1) * (1 - (1 - progress) * (1 - progress));
        
        if (progress < 1) {
          requestAnimationFrame(animateUp);
        } else {
          // Stay at hyperwarp speed for 1.8 seconds, then safely decelerate
          setTimeout(() => {
            let startDown = performance.now();
            const durationDown = 2500;
            const animateDown = (nowDown: number) => {
              const elapsedDown = nowDown - startDown;
              const progressDown = Math.min(elapsedDown / durationDown, 1);
              // Easing in-out sine for smooth deceleration
              const ease = 1 - (Math.cos(Math.PI * progressDown) + 1) / 2;
              warpRef.current = peakWarp - (peakWarp - 1) * ease;
              
              if (progressDown < 1) {
                requestAnimationFrame(animateDown);
              } else {
                warpRef.current = 1;
                isWarpingRef.current = false;
              }
            };
            requestAnimationFrame(animateDown);
          }, 1800);
        }
      };
      requestAnimationFrame(animateUp);
    };

    window.addEventListener("warp-speed", handleWarp);
    return () => window.removeEventListener("warp-speed", handleWarp);
  }, []);

  // Generate distant sharp stars
  const distantStars = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distant spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 25 + Math.random() * 25; // Far out

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  // Generate closer drifting space dust particles (colored white, silver slate, deep charcoal)
  const [cosmicDustPositions, cosmicDustColors] = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const palette = [
      new THREE.Color("#ffffff"), // Pure White
      new THREE.Color("#cbd5e1"), // Silver Slate
      new THREE.Color("#71717a"), // Muted Charcoal
      new THREE.Color("#3f3f46"), // Deep Charcoal
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical/galaxy-like spread
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15;
      const height = (Math.random() - 0.5) * 12;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Assign matching color
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollPercent = scrollYRef.current / (typeof document !== "undefined" ? (document.documentElement.scrollHeight - window.innerHeight || 1) : 1);
    const warp = warpRef.current;

    // Drifting animation for distant stars
    if (pointsRef1.current) {
      // Base slow rotation scaled by warp factor
      pointsRef1.current.rotation.y = t * 0.005 * warp;
      // Scroll-linked rotation tilt + subtle mouse tilt
      pointsRef1.current.rotation.x = scrollPercent * 0.3 + (state.pointer.y * 0.05);
      pointsRef1.current.rotation.y += state.pointer.x * 0.001 * warp;
    }

    // Drifting animation for drifting space dust + interactive 3D camera sway
    if (pointsRef2.current) {
      pointsRef2.current.rotation.y = -t * 0.012 * warp;
      pointsRef2.current.rotation.z = Math.sin(t * 0.1) * 0.05 * warp;
      
      // Calculate responsive target coordinates based on scroll AND cursor positions
      const targetX = state.pointer.x * 2.2;
      const targetY = -(scrollPercent * 8) + (state.pointer.y * 1.5);
      
      // Smoothly sway the camera in 3D space to produce a luxurious responsive parallax experience
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    }

    // Dynamic lens distortion camera stretching on hyperwarp speeds
    if (warp > 1) {
      const targetFov = 60 + (warp - 1) * 0.75;
      const persCam = state.camera as THREE.PerspectiveCamera;
      persCam.fov = THREE.MathUtils.lerp(persCam.fov, Math.min(targetFov, 90), 0.1);
      persCam.updateProjectionMatrix();
    } else {
      const persCam = state.camera as THREE.PerspectiveCamera;
      persCam.fov = THREE.MathUtils.lerp(persCam.fov, 60, 0.05);
      persCam.updateProjectionMatrix();
    }
  });

  return (
    <group>
      {/* Sharp Distant Stars */}
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={distantStars}
            itemSize={3}
            count={distantStars.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.65}
        />
      </points>

      {/* Cosmic Nebula Stack Dust */}
      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={cosmicDustPositions}
            itemSize={3}
            count={cosmicDustPositions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={cosmicDustColors}
            itemSize={3}
            count={cosmicDustColors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none bg-background">
      {/* 3D Cosmic Space Particles */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <CelestialField />
        </Canvas>
      </div>

      {/* Cybernetic Grid Overlay (Thin futuristic background lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] z-1 pointer-events-none opacity-40" />

      {/* Glowing Universal Space Nebula Gradients */}
      <div className="absolute top-1/4 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-1/4 right-[-10%] w-[60vw] h-[60vw] rounded-full bg-zinc-300/3 blur-[140px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: "18s" }} />
      <div className="absolute top-3/4 left-[20%] w-[45vw] h-[45vw] rounded-full bg-zinc-500/3 blur-[130px] mix-blend-screen pointer-events-none" />
      
      {/* Vignette mask to darken edges and make content incredibly readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030303_90%)] z-2" />
    </div>
  );
}
