"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { InteractiveCard } from "@/components/InteractiveCard";

const WaveformVisualizer = () => {
  return (
    <div className="flex items-end gap-1.5 h-16 w-full justify-center">
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-primary rounded-full shadow-[0_0_8px_#0553B1]"
          animate={{
            height: ["15%", "100%", "25%", "85%", "35%"],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const PipelineVisualizer = () => {
  return (
    <div className="flex items-center w-full max-w-sm gap-2">
      {["BUILD", "TEST", "DEPLOY"].map((step, i) => (
        <div key={step} className="flex items-center flex-1">
          <div className="relative flex flex-col items-center">
            <motion.div
              className="w-9 h-9 rounded-full border-2 border-accent1 flex items-center justify-center bg-[#0a0a0f] z-10 shadow-[0_0_10px_rgba(255,153,0,0.25)]"
              initial={{ scale: 0.85, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.4,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-accent1 shadow-[0_0_6px_#FF9900]" />
            </motion.div>
            <span className="text-[9px] font-mono tracking-widest mt-2.5 text-foreground/50">{step}</span>
          </div>
          {i < 2 && (
            <div className="flex-1 h-[1px] bg-white/10 mx-2 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 w-8 bg-accent1 shadow-[0_0_8px_#FF9900]"
                initial={{ x: "-100%" }}
                animate={{ x: "400%" }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "linear",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="py-24 bg-transparent relative z-10 overflow-hidden select-none border-t border-white/[0.04]">
      {/* HUD Telemetry styling header */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="border-l-2 border-white pl-6"
        >
          <div className="text-[10px] font-mono text-white/40 tracking-[0.25em] mb-1">
            SYS.DEPLOYMENT_GRID // LAB_RECORDS
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter text-white">THE LAB</h2>
          <p className="text-foreground/60 text-lg max-w-xl font-light">
            Where architecture meets application. Case studies of systems engineered for scalable orbits.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col w-full border-t border-white/[0.04]">
        {/* Project 01: QLUE */}
        <div
          className="group relative w-full min-h-[70vh] border-b border-white/[0.04] flex items-center overflow-hidden"
          onMouseEnter={() => setHoveredProject("qlue")}
          onMouseLeave={() => setHoveredProject(null)}
        >
          {/* Neon gradient glowing backdrops */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#06060c] via-transparent to-transparent opacity-95" />
          
          <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16 py-24">
            <div className="lg:w-1/2 flex flex-col justify-center w-full">
              <div className="text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                &lt; ORBITAL_OBJECT_01 &gt;
              </div>
              
              <h3 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-glow-primary">
                QLUE
              </h3>
              
              <p className="text-xl md:text-2xl font-light text-foreground/80 mb-8 max-w-lg text-balance animate-pulse" style={{ animationDuration: "8s" }}>
                An AI that listens, speaks, and coaches. Real-time NLP with sub-second synthesis.
              </p>
              
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["Flutter", "AWS Lambda", "Textract", "Bedrock", "Polly"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs font-mono text-foreground/60 tracking-wide hover:border-primary/40 hover:text-white transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Telemetry data tags */}
              <div className="flex flex-col gap-2 mb-10 max-w-md bg-white/[0.01] border border-white/[0.03] p-4 rounded-xl font-mono text-xs">
                <div className="flex justify-between border-b border-white/[0.04] py-2.5">
                  <span className="text-foreground/45">&gt; BACKEND_OWNERSHIP</span>
                  <span className="font-bold text-primary text-glow-primary">60%</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.04] py-2.5">
                  <span className="text-foreground/45">&gt; QUERY_RESOLUTION</span>
                  <span className="font-bold text-primary text-glow-primary">&lt; 3s</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-foreground/45">&gt; UPTIME_SENSING</span>
                  <span className="font-bold text-primary text-glow-primary">99.9%</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <a
                  href="https://github.com/MouliSaiDeep/Qlue"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="SOURCE CODE"
                  className="flex items-center gap-2 text-xs font-mono tracking-widest font-bold border border-white/20 px-6 py-3.5 rounded-xl hover:bg-primary hover:text-white hover:border-primary/50 transition-all duration-300 z-20 cursor-none"
                >
                  <FaGithub className="w-4 h-4" />
                  VIEW REPOSITORY
                </a>
              </div>
            </div>

            {/* Visualizer Card */}
            <div className="lg:w-1/2 flex items-center justify-center relative w-full">
              <InteractiveCard
                className="w-full aspect-[4/3] flex flex-col items-center justify-center p-8 hud-corners"
                glowColor="primary"
              >
                {/* Bottom Cyber Brackets */}
                <div className="hud-corners-bottom" />

                {/* Holographic Cyber Dot Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <div className="absolute inset-0 bg-primary/5 z-0" />
                
                <div className="relative z-10 w-full max-w-sm flex flex-col justify-center h-full">
                  <div className="text-[9px] text-foreground/40 font-mono mb-6 uppercase tracking-widest">&gt;&gt; sys.audio.stream.active</div>
                  <WaveformVisualizer />
                  <div className="mt-8 p-4 bg-black/50 rounded-xl border border-white/5 font-mono text-xs text-primary leading-relaxed shadow-inner">
                    <span className="text-white/20">&gt;&gt;</span> Sentiment analyzing... <br />
                    <span className="text-white/20">&gt;&gt;</span> Intent: Technical Interview [CONF_94%]<br />
                    <span className="text-white/20">&gt;&gt;</span> Synthesizing response...
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </div>
        </div>

        {/* Project 02: SKILL HIRE */}
        <div
          className="group relative w-full min-h-[70vh] border-b border-white/[0.04] flex items-center overflow-hidden"
          onMouseEnter={() => setHoveredProject("skillhire")}
          onMouseLeave={() => setHoveredProject(null)}
        >
          {/* Neon gradient glowing backdrops */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-transparent to-[#06060c] opacity-95" />
          
          <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-16 py-24">
            {/* Visualizer Card */}
            <div className="lg:w-1/2 flex items-center justify-center relative w-full">
              <InteractiveCard
                className="w-full aspect-[4/3] flex flex-col items-center justify-center p-8 hud-corners"
                glowColor="accent1"
              >
                {/* Bottom Cyber Brackets */}
                <div className="hud-corners-bottom" />

                {/* Holographic Cyber Dot Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <div className="absolute inset-0 bg-accent1/5 z-0" />
                
                <div className="relative z-10 w-full flex flex-col items-center h-full justify-center">
                  <div className="text-[9px] text-foreground/40 font-mono mb-10 w-full text-left uppercase tracking-widest">&gt;&gt; sys.pipeline.status.telemetry</div>
                  <PipelineVisualizer />
                  <div className="mt-10 p-4 bg-black/50 rounded-xl border border-white/5 font-mono text-xs text-accent1 w-full max-w-sm flex flex-col gap-2 shadow-inner">
                    <div className="flex justify-between"><span>[NODE_A]:</span> <span className="text-white/80">Healthy [OK]</span></div>
                    <div className="flex justify-between"><span>[NODE_B]:</span> <span className="text-white/80">Healthy [OK]</span></div>
                    <div className="flex justify-between text-white/40"><span>[RESTART]:</span> <span>0% downtime rollout</span></div>
                  </div>
                </div>
              </InteractiveCard>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-center lg:items-end lg:text-right w-full">
              <div className="text-accent1 font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                &lt; ORBITAL_OBJECT_02 &gt;
              </div>
              
              <h3 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-glow-accent1">
                SKILL HIRE
              </h3>
              
              <p className="text-xl md:text-2xl font-light text-foreground/80 mb-8 max-w-lg text-balance animate-pulse" style={{ animationDuration: "10s" }}>
                Where freelancers meet infrastructure. A modular microservices platform scaled on container registries.
              </p>
              
              <div className="flex flex-wrap gap-2.5 mb-8 lg:justify-end">
                {["Flutter", "Java Spring Boot", "Docker", "Kubernetes", "Jenkins"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs font-mono text-foreground/60 tracking-wide hover:border-accent1/40 hover:text-white transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Telemetry data tags */}
              <div className="flex flex-col gap-2 mb-10 max-w-md w-full bg-white/[0.01] border border-white/[0.03] p-4 rounded-xl font-mono text-xs text-left lg:text-right">
                <div className="flex justify-between border-b border-white/[0.04] py-2.5">
                  <span className="text-foreground/45">&gt; PIPELINE_LATENCY_CUT</span>
                  <span className="font-bold text-accent1 text-glow-accent1">-40%</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.04] py-2.5">
                  <span className="text-foreground/45">&gt; COLD_START_DEPLOY</span>
                  <span className="font-bold text-accent1 text-glow-accent1">Zero-Downtime</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-foreground/45">&gt; CONTAINER_CLUSTERS</span>
                  <span className="font-bold text-accent1 text-glow-accent1">5+ Microservices</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <a
                  href="https://github.com/MouliSaiDeep/skill-hire"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="SOURCE CODE"
                  className="flex items-center gap-2 text-xs font-mono tracking-widest font-bold border border-white/20 px-6 py-3.5 rounded-xl hover:bg-accent1 hover:text-black hover:border-accent1/50 transition-all duration-300 z-20 cursor-none"
                >
                  <FaGithub className="w-4 h-4" />
                  VIEW REPOSITORY
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
