"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

interface Section {
  id: string;
  label: string;
  sysCode: string;
}

const SECTIONS: Section[] = [
  { id: "hero", label: "INITIATE", sysCode: "SYS.LOC_00" },
  { id: "manifesto", label: "MANIFESTO", sysCode: "SYS.LOC_01" },
  { id: "stack", label: "CONSTELLATION", sysCode: "SYS.LOC_02" },
  { id: "experience", label: "TIMELINE", sysCode: "SYS.LOC_03" },
  { id: "projects", label: "REGISTRY", sysCode: "SYS.LOC_04" },
  { id: "achievements", label: "TRIUMPHS", sysCode: "SYS.LOC_05" },
  { id: "education", label: "ACADEMIA", sysCode: "SYS.LOC_06" },
  { id: "contact", label: "CONTACT", sysCode: "SYS.LOC_07" },
];

export function HudNavigation() {
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const midpoint = window.innerHeight / 2;
      let activeId = "hero";

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the midpoint of the screen falls inside this section's bounding rectangle
          if (rect.top <= midpoint && rect.bottom >= midpoint) {
            activeId = section.id;
            break;
          }
        }
      }
      setActiveSection(activeId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Initial check on mount
    handleScroll();

    // Trigger after a tiny delay to ensure layout settling after loading page gates
    const timer = setTimeout(handleScroll, 150);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleWarp = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 z-40 pointer-events-none hidden md:flex select-none">
      {/* Background Track Line */}
      <div className="absolute right-[9px] top-4 bottom-4 w-[1px] bg-white/[0.04] pointer-events-none" />

      {SECTIONS.map((section, idx) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => handleWarp(section.id)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            data-cursor-label={`WARP: ${section.label}`}
            className="group flex items-center justify-end pointer-events-auto cursor-none relative py-1 focus:outline-none"
          >
            {/* Holographic HUD Tag Popup on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="mr-6 font-mono text-[9px] tracking-[0.2em] text-white bg-black/85 border border-white/10 px-2.5 py-1 rounded shadow-[0_0_10px_rgba(255,255,255,0.05)] uppercase font-semibold flex items-center gap-1.5"
                >
                  <span className="text-white/40">{section.sysCode}</span>
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                  <span>{section.label}</span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* Indicator Node Wrapper */}
            <div className="w-5 h-5 flex items-center justify-center relative">
              {/* Outer Ring on Active */}
              {isActive && (
                <motion.div
                  layoutId="activeHudRing"
                  className="absolute inset-0 rounded-full border border-white/40 shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Central Core Node */}
              <motion.div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2.5 h-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/60 group-hover:scale-125"
                }`}
                animate={{
                  scale: isHovered && !isActive ? 1.3 : 1,
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
