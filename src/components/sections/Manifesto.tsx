"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statements = [
  "I build cross-platform experiences that scale.",
  "I engineer serverless backends that breathe.",
  "I deploy AI-powered tools in 24-hour sprints.",
];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((text) => {
        if (!text) return;
        
        gsap.fromTo(
          text,
          { opacity: 0, y: 40, rotationX: -15 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 md:py-48 px-6 md:px-12 bg-transparent relative z-10 flex flex-col items-center justify-center min-h-[70vh] select-none overflow-hidden"
    >
      {/* Decorative cosmic alignment axis */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 md:space-y-28 text-center relative z-10">
        
        {/* HUD Sub-label */}
        <div className="inline-flex flex-col items-center gap-1.5 font-mono text-[9px] text-white/30 tracking-[0.3em] uppercase">
          <span>SYS.CORE_PRINCIPLES // ARCHIVE_LOGS</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 animate-pulse" />
        </div>

        {statements.map((statement, index) => (
          <h2
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white/90 text-balance leading-tight drop-shadow-lg"
            style={{ perspective: "1000px" }}
          >
            {statement}
          </h2>
        ))}
      </div>
    </section>
  );
}
