"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  sysCode: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "INITIATE", sysCode: "LOC_00" },
  { id: "manifesto", label: "MANIFESTO", sysCode: "LOC_01" },
  { id: "stack", label: "STACK", sysCode: "LOC_02" },
  { id: "experience", label: "EXPERIENCE", sysCode: "LOC_03" },
  { id: "projects", label: "PROJECTS", sysCode: "LOC_04" },
  { id: "achievements", label: "TRIUMPHS", sysCode: "LOC_05" },
  { id: "education", label: "ACADEMIA", sysCode: "LOC_06" },
  { id: "contact", label: "CONTACT", sysCode: "LOC_07" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Scroll background threshold changes
    const handleScrollBg = () => {
      setScrolled(window.scrollY > 40);
    };

    // Scroll-Spy detection for active state
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Strict middle band for highlighting
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScrollBg);

    return () => {
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener("scroll", handleScrollBg);
    };
  }, []);

  const handleWarp = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        scrolled 
          ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.6)]" 
          : "bg-black/40 backdrop-blur-sm border-b border-white/[0.04] py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        
        {/* Left Side: Cyber Logo (Hidden on mobile screens to maximize navigation space) */}
        <button
          onClick={() => handleWarp("hero")}
          data-cursor-label="TELEPORT TO ORBIT"
          className="hidden md:flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-white hover:text-primary transition-colors cursor-none pointer-events-auto bg-transparent border-none p-0 focus:outline-none shrink-0"
        >
          <Terminal className="w-3.5 h-3.5 text-white/60" />
          <span className="font-bold">
            NITHIN_DATTA_ATTILI <span className="text-white/20 font-light">//</span> PORT.SYS
          </span>
        </button>

        {/* Navigation Row Container */}
        {/* On mobile: Touch-swipeable horizontal track with edge fading */}
        {/* On desktop: standard horizontal row aligned to the right */}
        <div className="w-full md:w-auto overflow-x-auto md:overflow-x-visible scrollbar-none flex items-center relative py-1 mask-marquee md:mask-none">
          <nav className="flex items-center gap-1.5 md:gap-1 xl:gap-2 shrink-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleWarp(item.id)}
                  data-cursor-label={`WARP: ${item.label}`}
                  className={`relative px-3.5 md:px-4 py-1.5 font-mono text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.18em] transition-all duration-300 cursor-none pointer-events-auto focus:outline-none select-none rounded-lg font-semibold shrink-0 ${
                    isActive 
                      ? "text-white" 
                      : "text-white/45 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className={`text-[7.5px] md:text-[8px] font-bold ${isActive ? "text-white" : "text-white/20"}`}>
                      {item.sysCode}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  
                  {/* Floating active neon-border highlight background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.06)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>
    </motion.header>
  );
}
