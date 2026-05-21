"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { InteractiveCard } from "@/components/InteractiveCard";

type Skill = {
  name: string;
  stat: string;
};

type SkillCategory = {
  category: string;
  signature: string; // High-tech tier name
  colorClass: "primary" | "accent1" | "accent2";
  skills: Skill[];
};

const skillData: SkillCategory[] = [
  {
    category: "Languages",
    signature: "CORE SYSTEM INJECTIONS",
    colorClass: "primary",
    skills: [
      { name: "Dart", stat: "10k+ lines written" },
      { name: "Java", stat: "Spring Boot orchestration" },
      { name: "Python", stat: "AI & backend scripting" },
      { name: "C", stat: "Memory & hardware systems" },
    ],
  },
  {
    category: "Mobile & Cloud",
    signature: "QUANTUM ORBITS & SCALERS",
    colorClass: "accent1",
    skills: [
      { name: "Flutter", stat: "30% UI responsiveness gain" },
      { name: "AWS Lambda", stat: "20% latency reduction" },
      { name: "AWS Bedrock", stat: "Bedrock & LLM orchestration" },
      { name: "AWS Cognito", stat: "Seamless identity scaling" },
      { name: "AWS API Gateway", stat: "Stateless REST pipelines" },
      { name: "Firebase", stat: "Real-time Auth & Firestore sync" },
    ],
  },
  {
    category: "DevOps & DB",
    signature: "PERSISTENCE & PIPELINES",
    colorClass: "accent2",
    skills: [
      { name: "Docker", stat: "Containerized microservices" },
      { name: "Kubernetes", stat: "Zero-downtime rolling restarts" },
      { name: "Jenkins", stat: "40% deployment time cut" },
      { name: "OpenShift", stat: "Enterprise hybrid orchestration" },
      { name: "GitHub Actions", stat: "CI/CD pipeline automation" },
      { name: "DynamoDB", stat: "Sub-10ms query times" },
      { name: "MongoDB", stat: "Flexible document schemas" },
      { name: "Firestore", stat: "NoSQL cloud persistence" },
    ],
  },
  {
    category: "Core & Testing",
    signature: "INTEGRITY & ARCHITECTURE",
    colorClass: "primary",
    skills: [
      { name: "REST APIs", stat: "Robust stateless payloads" },
      { name: "Microservices", stat: "Decoupled cloud nodes" },
      { name: "Serverless", stat: "40% maintenance cut" },
      { name: "Agile/Scrum", stat: "Active sprint execution" },
      { name: "Unit Testing", stat: "JUnit, Mockito & coverage" },
      { name: "Postman", stat: "API endpoint validation" },
      { name: "Git/GitHub", stat: "Advanced branch management" },
    ],
  },
];

export function Stack() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent relative z-10 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header HUD Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="mb-20 border-l-2 border-primary pl-6"
        >
          <div className="text-[10px] font-mono text-primary/60 tracking-[0.25em] mb-1">TECH_CONSTELLATION.MAP</div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter">THE STACK</h2>
          <p className="text-foreground/60 text-lg max-w-xl font-light">
            A mapped constellation of technologies arranged in high-performance orbital tiers.
          </p>
        </motion.div>

        {/* Tier Shells */}
        <div className="flex flex-col gap-12">
          {skillData.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 40, damping: 14, delay: groupIndex * 0.15 }}
              className="w-full"
            >
              <InteractiveCard
                className="p-6 md:p-8 w-full group relative overflow-hidden"
                glowColor={group.colorClass}
              >
                {/* Futuristic Cyber Dotted Background */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                {/* Glowing Corner Accents */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-bl-full pointer-events-none transition-colors duration-500 group-hover:bg-primary/5" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-white/[0.04] pb-6">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white/90 mb-1">
                      {group.category}
                    </h3>
                    <div className="text-[9px] font-mono tracking-widest text-foreground/40 uppercase">
                      {group.signature}
                    </div>
                  </div>
                  
                  {/* Orbital Status Indicator */}
                  <div className="flex items-center gap-2 font-mono text-[9px] text-white/30 tracking-wider">
                    <span>ORBITAL_PLANE_{groupIndex + 1}</span>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      group.colorClass === "primary" ? "bg-primary" : "bg-accent1"
                    )} />
                  </div>
                </div>

                {/* Skills Tags Grid */}
                <div className="relative z-10 flex flex-wrap gap-4">
                  {group.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    return (
                      <div
                        key={skill.name}
                        className="relative"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                          data-interactive
                          data-cursor-label={skill.name}
                          className={cn(
                            "px-6 py-3 rounded-xl border border-white/5 bg-black/40 backdrop-blur-sm cursor-none transition-all duration-300 relative overflow-hidden",
                            isHovered 
                              ? group.colorClass === "primary"
                                ? "border-primary/50 text-white shadow-[0_0_12px_rgba(255,255,255,0.25)] bg-primary/10"
                                : group.colorClass === "accent1"
                                ? "border-accent1/50 text-white shadow-[0_0_12px_rgba(203,213,225,0.25)] bg-accent1/10"
                                : "border-accent2/50 text-white shadow-[0_0_12px_rgba(113,113,122,0.25)] bg-accent2/10"
                              : "text-foreground/70 hover:border-white/20"
                          )}
                        >
                          {/* Background Slide Glow */}
                          <span className="relative z-10 font-mono text-sm tracking-wide font-medium">{skill.name}</span>
                        </motion.div>
                        
                        {/* Premium Technical HUD Floating Tooltip */}
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ 
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? -52 : 10,
                            scale: isHovered ? 1 : 0.95,
                            pointerEvents: isHovered ? "auto" : "none"
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 20 }}
                          className="absolute left-1/2 -translate-x-1/2 top-0 whitespace-nowrap bg-black border border-white/10 text-white text-[10px] font-mono px-3.5 py-2 rounded-lg pointer-events-none z-20 shadow-2xl flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent1 shrink-0 animate-ping" />
                          <span className="text-white/40">SYS.STAT:</span>
                          <span>{skill.stat}</span>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-black" />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
