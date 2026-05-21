"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { DecryptedText } from "@/components/DecryptedText";

const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    school: "Aditya College of Engineering and Technology, Surampalem",
    date: "2023 – 2027",
    score: "CGPA: 8.08/10",
  },
  {
    degree: "BIEAP (MPC)",
    school: "Aditya Junior College, Mandapeta",
    date: "2021 – 2023",
    score: "87.6%",
  },
];

const certifications = [
  "Oracle Cloud Infrastructure 2025 Certified DevOps Professional (Oracle, 2025)",
  "GitHub Foundations (Microsoft, 2026)",
  "Postman API Fundamentals Student Expert (Postman, 2024)",
  "Programming Essentials in C (Cisco Networking Academy, 2024)",
];

export function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 bg-transparent relative z-10 border-t border-white/[0.04] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Timeline academic roots - Constellation Transit Map */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            className="mb-12 border-l-2 border-primary pl-6"
          >
            <div className="text-[10px] font-mono text-primary/60 tracking-[0.25em] mb-1 font-semibold">
              SYS.ACADEMIC_GRID // PATHWAY_NODES
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter">
              <DecryptedText text="THE FOUNDATION" />
            </h2>
            <p className="text-foreground/60 text-lg font-light">Academic orbits and continuous vector calibration.</p>
          </motion.div>

          <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-3.5 before:top-2.5 before:bottom-0 before:w-[1px] before:bg-white/[0.08] before:shadow-[0_0_8px_rgba(255,255,255,0.05)]">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 45, damping: 14, delay: index * 0.2 }}
                className="relative"
              >
                {/* Constellation Transit Core Node */}
                <div className="absolute -left-[41px] top-1.5 w-7 h-7 rounded-full bg-[#030303] border-2 border-accent1 flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.2)] group">
                  <motion.div 
                    className="w-2.5 h-2.5 rounded-full bg-accent1"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                  />
                </div>
                
                <div className="flex items-center gap-3 mb-2 text-primary font-mono text-[10px] uppercase tracking-widest font-bold">
                  <GraduationCap className="w-4 h-4 text-glow-primary shrink-0" />
                  <span>{edu.date}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-extrabold mb-1.5 tracking-tight text-white/95">{edu.degree}</h3>
                <div className="text-foreground/60 text-sm md:text-base font-light mb-3">{edu.school}</div>
                
                <div className="inline-block px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded font-mono text-xs text-foreground/80 tracking-wide">
                  SCORE: <span className="text-primary font-bold text-glow-primary">{edu.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Holographic Card Block */}
        <div className="lg:w-1/2 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            className="hud-corners bg-black/45 border border-white/[0.04] rounded-2xl p-8 backdrop-blur-md relative overflow-hidden"
          >
            {/* Bottom Cyber Brackets */}
            <div className="hud-corners-bottom" />

            {/* Dotted Grid Layout */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="flex items-center gap-3.5 mb-8 border-b border-white/[0.04] pb-5 relative z-10">
              <Award className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              <h3 className="text-2xl font-extrabold tracking-tight">SYS.CREDENTIAL_REGISTRY</h3>
            </div>
            
            <div className="flex flex-col gap-4 relative z-10 font-mono">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255, 255, 255, 0.25)" }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] transition-all duration-300"
                >
                  {/* Registry Index Identifier */}
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-white font-bold text-xs border border-white/10 shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                    [0{index + 1}]
                  </div>
                  <span className="font-sans font-medium text-foreground/90 text-sm md:text-base leading-snug">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
