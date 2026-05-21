"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [data-interactive]");
      
      if (interactiveEl) {
        setIsHovered(true);
        const label = interactiveEl.getAttribute("data-cursor-label");
        if (label) {
          setCursorLabel(label);
        } else {
          // Fallbacks based on tag and class contents
          if (interactiveEl.tagName.toLowerCase() === "a") {
            const href = interactiveEl.getAttribute("href") || "";
            if (href.startsWith("mailto:")) setCursorLabel("SEND EMAIL");
            else if (href.startsWith("tel:")) setCursorLabel("PLACE CALL");
            else if (href.includes("github.com")) setCursorLabel("VIEW REPO");
            else if (href.includes("linkedin.com")) setCursorLabel("CONNECT");
            else if (href.includes("instagram.com")) setCursorLabel("FOLLOW");
            else setCursorLabel("TELEPORT LINK");
          } else {
            setCursorLabel("EXECUTE");
          }
        }
      } else {
        setIsHovered(false);
        setCursorLabel("");
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer Halo with Orbiting Electron */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/40 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovered ? 1.4 : 1,
          borderColor: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25, mass: 0.4 }}
      >
        {/* Core Center Pulse Dot */}
        <motion.div 
          className="w-1.5 h-1.5 bg-white rounded-full"
          animate={{ 
            scale: isHovered ? 0.6 : 1,
            backgroundColor: isHovered ? "#cbd5e1" : "#ffffff"
          }}
        />

        {/* Orbit Ring Wrapper */}
        <motion.div
          className="absolute w-12 h-12 pointer-events-none flex items-center justify-center"
          animate={{ 
            rotate: 360,
            scale: isHovered ? 1.3 : 1
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: isHovered ? 1.2 : 2.5, ease: "linear" },
            scale: { type: "spring", stiffness: 300, damping: 20 }
          }}
        >
          {/* Satellite Electron Dot */}
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            style={{ left: -1, top: "50%", translateY: "-50%" }}
            animate={{ 
              scale: isClicked ? 1.8 : 1,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Futuristic Telemetry HUD Cursor Label */}
      <AnimatePresence>
        {isHovered && cursorLabel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: mousePosition.x + 22, y: mousePosition.y - 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x + 22,
              y: mousePosition.y - 10
            }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed top-0 left-0 pointer-events-none z-[100] bg-black/85 border border-white/30 px-2 py-1 rounded text-[9px] font-mono tracking-widest text-white shadow-[0_0_12px_rgba(255,255,255,0.25)] select-none hidden md:block uppercase font-bold"
          >
            &lt; {cursorLabel} &gt;
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


