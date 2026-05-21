"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLogs = [
  "INITIALIZING QUANTUM ORBITAL PATHS...",
  "HARNESSING NEBULA ENERGY & COSMIC PLASMA...",
  "BOOTING EXPERIENTIAL FUSION ENGINE...",
  "ESTABLISHING PORTAL VECTOR. WELCOME ENGINEER.",
];

export function LoadingGate({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Step through the cinematic terminal boot log lines
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < bootLogs.length - 1) {
          return prev + 1;
        }
        clearInterval(logInterval);
        return prev;
      });
    }, 600);

    // End loading screen after logs complete
    const endTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(logInterval);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-foreground select-none"
          >
            {/* Holographic HUD Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />

            {/* Glowing Space Nebulae */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
              {/* Futuristic SVG Orbiting Atom Spinner */}
              <div className="relative mb-12 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white/80 animate-spin"
                  viewBox="0 0 100 100"
                  style={{ animationDuration: "12s" }}
                >
                  {/* Orbit 1 */}
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="38"
                    ry="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="6 4"
                    className="opacity-40"
                    style={{ transform: "rotate(30deg)", transformOrigin: "center" }}
                  />
                  {/* Orbit 2 */}
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="38"
                    ry="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="6 4"
                    className="opacity-40"
                    style={{ transform: "rotate(150deg)", transformOrigin: "center" }}
                  />
                  {/* Orbit 3 */}
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="38"
                    ry="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="6 4"
                    className="opacity-40"
                    style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
                  />
                </svg>

                {/* Nucleus Power Core */}
                <div className="absolute w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_15px_#ffffff]" />

                {/* Outer Ring Accent */}
                <div className="absolute w-28 h-28 border border-white/5 rounded-full" />
              </div>

              {/* Console Boot Logs Output */}
              <div className="w-full bg-[#050505]/80 border border-white/5 rounded-lg p-5 font-mono text-[10px] md:text-xs text-foreground/80 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                
                {/* HUD Corner Decor */}
                <div className="absolute top-1 left-1 text-[8px] text-white/10 font-sans">SYS.BOOT_TELEMETRY</div>
                <div className="absolute bottom-1 right-2 text-[8px] text-white/40 font-mono tracking-widest">ACTIVE</div>
                
                <div className="space-y-2 mt-2">
                  {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${i === bootLogs.length - 1 ? "text-white font-bold" : "text-white/60"}`}
                    >
                      <span className="text-white/20 mr-1.5">&gt;&gt;</span> {log}
                    </motion.div>
                  ))}
                  
                  {logIndex < bootLogs.length - 1 && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-1.5 h-3.5 bg-white ml-1"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
}

