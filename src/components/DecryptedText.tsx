"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number; // Time in ms between ticks
  maxIterations?: number; // Ticks a character scrambles before resolving
  delay?: number; // Delay in ms before starting the animation
  useHover?: boolean; // Should hovering trigger re-decryption
  className?: string;
}

const SCRAMBLE_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&?*+=-_[]{}<>/\\";

export function DecryptedText({
  text,
  speed = 30,
  maxIterations = 3,
  delay = 0,
  useHover = true,
  className = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // Trigger animation when the element scrolls into view
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });
  
  const hasTriggeredOnView = useRef(false);

  const startDecryption = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let currentIteration = 0;
    const textLength = text.length;

    const interval = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          
          // Calculate when this specific character should resolve
          // Characters resolve progressively from left to right
          const resolveIndex = index * 1.5;
          
          if (currentIteration >= resolveIndex + maxIterations) {
            return char;
          }
          
          // Show a random cyber character
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (currentIteration >= textLength * 1.5 + maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
      
      currentIteration++;
    }, speed);

    return () => clearInterval(interval);
  };

  // Trigger when in view
  useEffect(() => {
    if (isInView && !hasTriggeredOnView.current) {
      hasTriggeredOnView.current = true;
      const timeout = setTimeout(() => {
        startDecryption();
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, delay, text]);

  // Handle Hover Trigger
  const handleMouseEnter = () => {
    if (useHover && !isAnimating) {
      startDecryption();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono tracking-tighter cursor-none select-none transition-all duration-300 ${className}`}
      data-interactive
    >
      {displayText}
    </span>
  );
}
