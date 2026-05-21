"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

type Mission = {
  id: string;
  title: string;
  role: string;
  date: string;
  status: "ACTIVE" | "COMPLETED";
  highlights: string[];
};

const missions: Mission[] = [
  {
    id: "MISSION 01",
    title: "TechnicalHub",
    role: "Flutter Developer Trainee",
    date: "May 2025 – Present",
    status: "ACTIVE",
    highlights: [
      "Developed 3+ cross-platform mobile apps using Flutter and Dart, improving UI responsiveness by 30% through widget-level optimizations and Provider-based state management.",
      "Integrated Firebase Authentication and real-time Firestore databases, streamlining user onboarding across 3 application prototypes.",
      "Collaborated in a 6-member Agile team via Git/GitHub across 2-week sprint cycles, delivering features consistently on schedule with code reviews and retrospectives.",
    ],
  },
  {
    id: "MISSION 02",
    title: "APSSDC",
    role: "Cloud Computing Intern",
    date: "May 2025 – July 2025",
    status: "COMPLETED",
    highlights: [
      "Deployed a serverless full-stack app using AWS Lambda, API Gateway, DynamoDB, and Cognito, reducing API response latency by 20%.",
      "Configured IAM roles and least-privilege policies across 6+ AWS services, achieving zero security misconfigurations throughout the deployment lifecycle.",
      "Integrated Flutter frontend with a Python AWS serverless backend, reducing maintenance overhead by 40% through stateless microservices design.",
    ],
  },
];

export function Experience() {
  return (
    <section className="py-24 px-6 md:px-12 bg-transparent relative z-10 select-none">
      <div className="max-w-4xl mx-auto">
        {/* Section Header HUD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="mb-20 border-l-2 border-accent1 pl-6"
        >
          <div className="text-[10px] font-mono text-accent1/60 tracking-[0.25em] mb-1 font-semibold">
            SYS.MISSION_REGISTRY // ARCHIVE
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter">THE FIELD</h2>
          <p className="text-foreground/60 text-lg font-light">Professional deployments and high-scale cloud infrastructure missions.</p>
        </motion.div>

        {/* Missions Timeline */}
        <div className="space-y-12">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 45, damping: 14, delay: index * 0.2 }}
              className="hud-corners relative rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-md hover:border-primary/30 transition-colors duration-500 overflow-hidden"
            >
              {/* Bottom Cyber Brackets Wrapper */}
              <div className="hud-corners-bottom" />

              {/* Cyber Dotted Grid Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Glowing active indicator back-overlay */}
              {mission.status === "ACTIVE" && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
              )}

              <div className="p-8 md:p-10 relative z-10 h-full w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/[0.04] pb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[9px] font-bold tracking-widest text-primary font-mono bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                        {mission.id}
                      </span>
                      
                      {/* Interactive Telemetry Pulse for active roles */}
                      <span
                        className={`text-[9px] font-mono font-bold tracking-widest flex items-center gap-1.5 px-2.5 py-0.5 rounded border ${
                          mission.status === "ACTIVE"
                            ? "bg-accent1/10 border-accent1/20 text-accent1 glow-accent1"
                            : "bg-white/5 border-white/10 text-white/50"
                        }`}
                      >
                        {mission.status === "ACTIVE" && (
                          <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent1 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent1"></span>
                          </span>
                        )}
                        {mission.status}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight text-white/95">
                      {mission.role}
                    </h3>
                    
                    <div className="text-sm md:text-base text-foreground/70 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono">
                      <Briefcase className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="font-semibold text-white/80">{mission.title}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-xs text-white/40 tracking-wider">{mission.date}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-4 font-sans">
                  {mission.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-3 mt-1.5 text-[10px] font-mono select-none">
                        &gt;
                      </span>
                      <span className="text-foreground/80 leading-relaxed text-sm md:text-base">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
