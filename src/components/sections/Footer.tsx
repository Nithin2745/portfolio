"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer id="contact" className="py-24 px-6 md:px-12 bg-transparent relative z-10 border-t border-white/[0.04] overflow-hidden select-none">
      {/* Dynamic Cosmic Space Vortex Background Gradient (Primary & Accent color blends) */}
      <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(200,200,200,0.02)_40%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] rounded-full blur-[90px] pointer-events-none" />

      {/* Futuristic Cyber Dotted Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16 relative z-10">
        
        {/* Left Side: Call to action */}
        <div className="md:w-1/2 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 45, damping: 14 }}
          >
            <div className="text-[10px] font-mono text-primary/60 tracking-[0.25em] mb-2 font-semibold">
              SECURE_COMMUNICATION_LINK // INITIATE
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter text-balance text-white leading-none">
              Let&apos;s build something that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent1 to-accent2 text-glow-primary">scales.</span>
            </h2>
            
            <p className="text-foreground/60 text-lg max-w-sm mb-10 font-light">
              Ready to architect your next digital experience? The quantum infrastructure is calibrated.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a
                href="mailto:attilinithin@gmail.com"
                data-cursor-label="SYS.CONNECT"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold tracking-widest text-xs text-black bg-white rounded-xl hover:scale-105 hover:bg-zinc-200 transition-all duration-300 shadow-2xl cursor-none border border-white/20 text-center"
              >
                <span className="mr-3">INITIATE CONNECTION</span>
                {/* Telemetry Radar Ping Animation */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
              </a>

              <a
                href="/Resume.pdf"
                download="Nithin_Datta_Attili_Resume.pdf"
                data-cursor-label="DOWNLOAD PDF"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold tracking-widest text-xs text-white bg-white/5 rounded-xl hover:scale-105 hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-none border border-white/10 text-center"
              >
                <span className="mr-3">DOWNLOAD RESUME</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: High-tech Connection Grid */}
        <div className="md:w-1/2 flex flex-col md:items-end justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            
            <a
              href="mailto:attilinithin@gmail.com"
              data-cursor-label="ENGAGE EMAIL"
              className="hud-corners flex items-center justify-between gap-5 p-4 rounded-xl border border-white/[0.04] bg-black/40 hover:bg-white/[0.02] hover:border-primary/30 transition-all duration-300 group cursor-none"
            >
              <div className="hud-corners-bottom" />
              <div className="flex items-center gap-3 text-foreground/80 group-hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-primary text-glow-primary shrink-0" />
                <span className="font-mono text-xs tracking-wider">attilinithin@gmail.com</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-primary transition-all shrink-0" />
            </a>

            <a
              href="https://linkedin.com/in/nithin-attili-491a08292"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="LINKEDIN"
              className="hud-corners flex items-center justify-between gap-5 p-4 rounded-xl border border-white/[0.04] bg-black/40 hover:bg-white/[0.02] hover:border-primary/35 transition-all duration-300 group cursor-none"
            >
              <div className="hud-corners-bottom" />
              <div className="flex items-center gap-3 text-foreground/80 group-hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5 text-white shrink-0" />
                <span className="font-mono text-xs tracking-wider">LINKEDIN</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-primary transition-all shrink-0" />
            </a>

            <a
              href="https://github.com/Nithin2745"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="GITHUB"
              className="hud-corners flex items-center justify-between gap-5 p-4 rounded-xl border border-white/[0.04] bg-black/40 hover:bg-white/[0.02] hover:border-white/20 transition-all duration-300 group cursor-none"
            >
              <div className="hud-corners-bottom" />
              <div className="flex items-center gap-3 text-foreground/80 group-hover:text-white transition-colors">
                <FaGithub className="w-5 h-5 text-white/95 shrink-0" />
                <span className="font-mono text-xs tracking-wider">GITHUB</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-white transition-all shrink-0" />
            </a>

            <a
              href="https://www.instagram.com/_nithindatta_/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="INSTAGRAM"
              className="hud-corners flex items-center justify-between gap-5 p-4 rounded-xl border border-white/[0.04] bg-black/40 hover:bg-white/[0.02] hover:border-accent1/30 transition-all duration-300 group cursor-none"
            >
              <div className="hud-corners-bottom" />
              <div className="flex items-center gap-3 text-foreground/80 group-hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5 text-white/95 shrink-0" />
                <span className="font-mono text-xs tracking-wider">INSTAGRAM</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-accent1 transition-all shrink-0" />
            </a>
          </div>
          
          {/* Sub-footer system data */}
          <div className="mt-16 text-foreground/45 text-[10px] font-mono flex flex-col sm:flex-row items-center justify-between w-full md:w-auto gap-x-8 gap-y-4 border-t border-white/[0.04] md:border-t-0 pt-8 md:pt-0">
            <span>© {new Date().getFullYear()} NITHIN DATTA ATTILI</span>
            
            {/* Pulsing Space telemetry online status */}
            <div className="flex items-center gap-2">
              <span>SYSTEM.STATUS(</span>
              <motion.span 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="text-green-400 font-bold tracking-widest text-glow-primary"
              >
                ONLINE
              </motion.span>
              <span>)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
