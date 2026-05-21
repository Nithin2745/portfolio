"use client";

import { useEffect, useState } from "react";

export function GlitchOverlay() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      if (isGlitching) return;
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);
    };

    window.addEventListener("system-glitch", triggerGlitch);
    return () => window.removeEventListener("system-glitch", triggerGlitch);
  }, [isGlitching]);

  if (!isGlitching) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none">
      {/* Dynamic Chromatic Flash Overlay */}
      <div className="absolute inset-0 bg-[#030303]/10 mix-blend-difference animate-glitch-flash" />
      
      {/* Glitch CRT Scanlines and horizontal shifts */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,255,255,0.06)_50%),linear-gradient(90deg,rgba(255,0,0,0.1),rgba(0,255,0,0.04),rgba(0,0,255,0.1))] bg-[size:100%_6px,12px_100%] animate-glitch-lines" />
      
      {/* Ambient Cyber Decals shifting */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 font-mono text-[9px] text-white/30 tracking-[0.25em] pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span>&gt;&gt; SYS.TELEMETRY: SIGNAL_INTERFERENCE_DETECTED</span>
            <span>&gt;&gt; MODULE_COORD: ATT_IN_05 // SYNC_BURST</span>
          </div>
          <span>PACKET_STREAMS: COMPILING...</span>
        </div>
        
        <div className="flex justify-between items-end">
          <span>&gt;&gt; VOLTAGE_SURGE // CORE_ENGINES_ACTIVE</span>
          <span>RE-CALIBRATING HUD CHIPSET // V2.1</span>
        </div>
      </div>
    </div>
  );
}
