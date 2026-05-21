"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden scanline">

      {/* Cyber HUD Framing elements */}
      <div className="absolute inset-x-6 top-8 bottom-8 border border-white/[0.03] pointer-events-none z-10 rounded-2xl">
        {/* HUD Corner Decorators */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40 rounded-tl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40 rounded-tr" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40 rounded-bl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40 rounded-br" />

        {/* HUD Side Crosshairs */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-[1px] bg-white/10" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-[1px] bg-white/10" />

        {/* Telemetry HUD Labels */}
        <div className="absolute top-6 left-6 hidden md:block text-[9px] font-mono text-primary/60 tracking-[0.2em]">
          SYS.TELEMETRY: ONLINE <br />
          CORE.STATUS: QUANTUM_OPTIMAL
        </div>
        <div className="absolute top-6 right-6 hidden md:block text-[9px] font-mono text-accent1/60 tracking-[0.2em] text-right">
          COORDINATES: ATT_IN_05 <br />
          LATENCY: SUB-10MS
        </div>
      </div>

      {/* Hero Content */}
      <div className="z-10 text-center px-4 md:px-8 mt-12 md:mt-0 flex flex-col items-center select-none max-w-4xl pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.4 }}
          className="mb-4 text-primary/90 uppercase tracking-[0.35em] text-xs md:text-sm font-bold font-mono text-glow-primary"
        >
          &lt; Experience Engineer &gt;
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 35, damping: 12, delay: 0.2 }}
          className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-balance mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-none"
        >
          Nithin Datta <br className="hidden md:block" /> Attili
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.6 }}
          className="text-lg md:text-2xl text-foreground/75 font-light max-w-2xl text-balance tracking-wide"
        >
          Flutter Developer <span className="mx-2 text-primary font-mono text-glow-primary">|</span> AWS Cloud Engineer <span className="mx-2 text-accent1 font-mono text-glow-accent1">|</span> Full Stack Developer
        </motion.p>

        {/* High-tech glow buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
        >
          <a
            href="#contact"
            data-cursor-label="SYS.PORTAL"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-300 bg-white rounded-full hover:bg-zinc-200 hover:scale-105 backdrop-blur-md cursor-none border border-white/20 text-center w-full sm:w-auto"
          >
            <span className="mr-3 tracking-wider font-mono text-sm">INITIATE CONNECTIONS</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
          </a>

          <a
            href="/Resume.pdf"
            download="Nithin_Datta_Attili_Resume.pdf"
            data-cursor-label="DOWNLOAD PDF"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/40 hover:scale-105 backdrop-blur-md cursor-none text-center w-full sm:w-auto"
          >
            <span className="mr-3 tracking-wider font-mono text-sm">DOWNLOAD RESUME</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-foreground/45 mb-2.5">SCROLL TO ORBIT</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-foreground/45" />
        </motion.div>
      </motion.div>
    </section>
  );
}
