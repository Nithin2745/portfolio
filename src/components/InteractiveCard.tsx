import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "primary" | "accent1" | "accent2";
}

export function InteractiveCard({ children, className = "", glowColor = "primary" }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Set rotation mappings for a subtle, high-end 3D parallax feel (max 10 degrees tilt)
  const rotateX = useTransform(y, [-200, 200], [8, -8]);
  const rotateY = useTransform(x, [-200, 200], [-8, 8]);

  // Map mouse coordinates to holographic lighting gradient percentages
  const glowX = useTransform(x, [-200, 200], [10, 90]);
  const glowY = useTransform(y, [-200, 200], [10, 90]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates relative to the card's midpoint
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Border & Glow style maps based on active branding colors
  const activeColorStyles = {
    primary: {
      border: "group-hover:border-primary/40",
      glow: "rgba(255, 255, 255, 0.08)",
      hologram: "rgba(255, 255, 255, 0.12)",
      shadow: "hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]",
    },
    accent1: {
      border: "group-hover:border-accent1/40",
      glow: "rgba(203, 213, 225, 0.08)",
      hologram: "rgba(203, 213, 225, 0.12)",
      shadow: "hover:shadow-[0_0_30px_rgba(203,213,225,0.12)]",
    },
    accent2: {
      border: "group-hover:border-accent2/40",
      glow: "rgba(113, 113, 122, 0.08)",
      hologram: "rgba(113, 113, 122, 0.12)",
      shadow: "hover:shadow-[0_0_30px_rgba(113,113,122,0.12)]",
    },
  }[glowColor];

  // Holographic sheen inline styles
  const hologramBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, ${activeColorStyles.hologram} 0%, rgba(255, 255, 255, 0.01) 45%, transparent 75%)`
  );

  return (
    <div className="perspective-1000 group w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.8 }}
        className={`relative w-full h-full rounded-2xl border border-white/[0.04] bg-zinc-950/60 backdrop-blur-md overflow-hidden transition-colors duration-500 ${activeColorStyles.border} ${activeColorStyles.shadow} ${className}`}
      >
        {/* Holographic Dynamic Ambient Light Follower */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{ background: hologramBackground }}
        />

        {/* Ambient Subtle Static Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
        
        {/* Render child elements */}
        <div className="relative z-20 w-full h-full" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
