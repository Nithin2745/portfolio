"use client";

import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import { DecryptedText } from "@/components/DecryptedText";

export function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 bg-transparent relative z-10 border-t border-white/[0.04] select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header HUD Registry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="mb-20 text-center"
        >
          <div className="text-[10px] font-mono text-white/40 tracking-[0.25em] mb-1 font-semibold">
            SYS.ARENA_TELEMETRY // HACKATHON_GRID
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter">
            <DecryptedText text="THE ARENA" />
          </h2>
          <div className="w-12 h-0.5 bg-white mx-auto mb-6 opacity-30" />
          <p className="text-foreground/60 text-lg font-light">Ranked deployments under rapid sprint conditions.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Badge 1: Silver Platinum (Space Hackathon) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotateY: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            whileHover={{ y: -8, rotateY: 3 }}
            className="hud-corners relative aspect-[3/4] sm:aspect-auto sm:h-80 rounded-2xl p-[1px] bg-gradient-to-br from-zinc-400/35 to-transparent shadow-2xl overflow-hidden group cursor-none"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            {/* Bottom Cyber Brackets */}
            <div className="hud-corners-bottom" />

            {/* Cyber Dotted Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="absolute inset-0 bg-zinc-950/20 rounded-2xl backdrop-blur-md" />
            
            <div className="relative h-full w-full bg-gradient-to-b from-zinc-950/10 to-[#030303]/85 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-zinc-500/10 overflow-hidden">
              {/* Floating Nebula Sphere overlay */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-zinc-500/10 blur-3xl rounded-full transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-zinc-500/5 blur-3xl rounded-full" />
              
              <Trophy className="w-16 h-16 text-zinc-300 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              
              <h3 className="text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 mb-2 drop-shadow-sm uppercase tracking-tight font-sans">
                5th Place
              </h3>
              
              <p className="text-xs font-bold tracking-widest text-zinc-400/80 mb-6 uppercase font-mono">
                Project Space Hackathon 2026
              </p>
              
              <div className="flex flex-col gap-1.5 text-[10px] font-mono text-zinc-500 border-t border-zinc-500/10 pt-4 w-full max-w-[150px]">
                <span>TOP 5 / 160+ PROJ</span>
                <span>900+ DEPLOYERS</span>
              </div>
            </div>
          </motion.div>

          {/* Badge 2: Gold Chrome (Google Hack Sprint) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotateY: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.15 }}
            whileHover={{ y: -8, rotateY: -3 }}
            className="hud-corners relative aspect-[3/4] sm:aspect-auto sm:h-80 rounded-2xl p-[1px] bg-gradient-to-br from-white/30 to-transparent shadow-2xl overflow-hidden group cursor-none"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            {/* Bottom Cyber Brackets */}
            <div className="hud-corners-bottom" />

            {/* Cyber Dotted Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="absolute inset-0 bg-zinc-950/20 rounded-2xl backdrop-blur-md" />
            
            <div className="relative h-full w-full bg-gradient-to-b from-zinc-950/10 to-[#030303]/85 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-white/10 overflow-hidden">
              {/* Floating Nebula Sphere overlay */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 blur-3xl rounded-full transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
              
              <Medal className="w-16 h-16 text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
              
              <h3 className="text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-300 mb-2 drop-shadow-sm uppercase tracking-tight font-sans">
                2nd Place
              </h3>
              
              <p className="text-xs font-bold tracking-widest text-zinc-300/80 mb-6 uppercase font-mono">
                Google DCGC 2.0 Hack Sprint 2025
              </p>
              
              <div className="flex flex-col gap-1.5 text-[10px] font-mono text-zinc-500 border-t border-white/10 pt-4 w-full max-w-[150px]">
                <span>BUILT QLUE CORE</span>
                <span>100+ ENG TEAMS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
