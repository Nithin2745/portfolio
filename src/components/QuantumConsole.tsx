"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ShieldAlert, Cpu } from "lucide-react";

interface LogItem {
  text: string;
  type: "system" | "input" | "success" | "error" | "telemetry";
}

export function QuantumConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState<LogItem[]>([
    { text: "ESTABLISHING QUANTUM ORBITAL INTERFACE...", type: "system" },
    { text: "PORTAL STATUS: ONLINE // SECURE_HANDSHAKE_STABLE", type: "success" },
    { text: "SYSTEM TELEMETRY LINKED: COORD_ATT_IN_05", type: "telemetry" },
    { text: "TYPE '/help' FOR COMMAND DECK LIST OR '/exit' TO TERMINATE LINK.", type: "system" },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Toggle console on custom event
  useEffect(() => {
    const handleToggle = () => {
      window.dispatchEvent(new CustomEvent("system-glitch"));
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("toggle-console", handleToggle);
    return () => window.removeEventListener("toggle-console", handleToggle);
  }, []);

  // Keyboard shortcut listener (` key or Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("system-glitch"));
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        window.dispatchEvent(new CustomEvent("system-glitch"));
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Autoscroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Matrix Rain Animation canvas loop
  useEffect(() => {
    if (!matrixActive || !isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = containerRef.current?.clientWidth || 800;
      canvas.height = containerRef.current?.clientHeight || 500;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const columns = Math.floor(canvas.width / 18);
    const yPositions = Array(columns).fill(0).map(() => Math.random() * -100);

    let animationId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(3, 3, 3, 0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.18)"; // matrix particles blend with light neon
      ctx.font = "11px monospace";

      for (let i = 0; i < yPositions.length; i++) {
        const char = String.fromCharCode(33 + Math.floor(Math.random() * 93));
        const x = i * 18;
        const y = yPositions[i];

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.985) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 12;
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [matrixActive, isOpen]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputValue.trim().toLowerCase();
    if (!cleanCmd) return;

    const newLogs = [...logs, { text: `attili@quantum_node_05:~$ ${inputValue}`, type: "input" as const }];
    setInputValue("");

    // Command Parser
    switch (cleanCmd) {
      case "/help":
        newLogs.push(
          { text: "--- AVAILABLE ORBITAL LINK PROTOCOLS ---", type: "system" },
          { text: "  /about    : Transmit cognitive status & summary", type: "system" },
          { text: "  /skills   : Telemetry report on core stack parameters", type: "system" },
          { text: "  /warp     : Calibrate fusion engines & launch hyperdrive hyperwarp speed", type: "success" },
          { text: "  /matrix   : Toggle matrix telemetry falling data stream", type: "telemetry" },
          { text: "  /clear    : Wipe active console logs buffer", type: "system" },
          { text: "  /exit     : Shut down orbital uplink overlay", type: "system" }
        );
        break;
      case "/about":
        newLogs.push(
          { text: "COGNITIVE MODULE: NITHIN DATTA ATTILI", type: "success" },
          { text: "DESIGNATION: EXPERIENCE ENGINEER // FULL-STACK FLUTTER & CLOUD DEVELOPER", type: "telemetry" },
          { text: "CORE MOTIVE: Engineering responsive applications aligned with cosmic stability, blending Flutter, NestJS, and AWS architectures to build state-of-the-art experiences.", type: "system" }
        );
        break;
      case "/skills":
        newLogs.push(
          { text: "--- INSTALLED TELEMETRY CHIPSET MODULES ---", type: "telemetry" },
          { text: "  [FLUTTER]     ████████████████ 100% // HIGH PERFORMANCE CORE", type: "success" },
          { text: "  [AWS CLOUD]   ██████████████░░ 88%  // ARCHITECTURE STABLE", type: "success" },
          { text: "  [NESTJS/NODE] ██████████████░░ 85%  // ENGINE CALIBRATED", type: "success" },
          { text: "  [THREEJS/R3F] ██████████░░░░░░ 65%  // 3D PARALLAX FLUID", type: "success" }
        );
        break;
      case "/warp":
        newLogs.push(
          { text: "INITIATING COSMIC WARP SPEED SEQUENCE...", type: "system" },
          { text: "ENGAGING STAR-DRIVE ENGINE // CODES GENERATED...", type: "success" },
          { text: "HYPERSPACE PATH ESTABLISHED. WARPING...", type: "telemetry" }
        );
        // Trigger system glitch overlay
        window.dispatchEvent(new CustomEvent("system-glitch"));
        // Dispatch star warp speed visual event to SpaceBackground
        window.dispatchEvent(new CustomEvent("warp-speed"));
        break;
      case "/matrix":
        setMatrixActive(!matrixActive);
        newLogs.push({
          text: `MATRIX STREAM: ${!matrixActive ? "ENGAGED" : "DISENGAGED"}`,
          type: "telemetry",
        });
        break;
      case "/clear":
        setLogs([]);
        return;
      case "/exit":
        window.dispatchEvent(new CustomEvent("system-glitch"));
        setIsOpen(false);
        break;
      default:
        newLogs.push({
          text: `COMMAND ERROR: '${inputValue}' IS UNRECOGNIZED. TYPE '/help' FOR SYSTEM DIRECTORIES.`,
          type: "error",
        });
    }

    setLogs(newLogs);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md select-none"
        >
          {/* Cyber Terminal Window Panel */}
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-2xl h-[450px] bg-[#030305]/95 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.06)]"
          >
            {/* Custom Interactive Canvas for Matrix Rain Easter Egg */}
            {matrixActive && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0"
                style={{ mixBlendMode: "screen" }}
              />
            )}

            {/* Futuristic Terminal Header Titlebar */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-5 h-5 rounded bg-white/5 border border-white/10 animate-pulse">
                  <Terminal className="w-3 h-3 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold tracking-widest text-white">SYS.QUANTUM_TERMINAL</span>
                  <span className="text-[7.5px] font-mono text-white/30 tracking-widest">GATEWAY ACTIVE // SHIELD_V2.1</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("system-glitch"));
                  setIsOpen(false);
                }}
                className="flex items-center justify-center w-6 h-6 rounded-lg border border-white/5 hover:bg-white/5 transition-all text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scrollable logs area */}
            <div
              ref={scrollRef}
              className="relative z-10 flex-1 overflow-y-auto p-6 font-mono text-[10.5px] tracking-wider space-y-3.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/5"
            >
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 leading-relaxed ${
                    log.type === "input"
                      ? "text-zinc-200"
                      : log.type === "success"
                      ? "text-white font-bold"
                      : log.type === "error"
                      ? "text-red-500 font-bold"
                      : log.type === "telemetry"
                      ? "text-zinc-400 font-medium"
                      : "text-zinc-500"
                  }`}
                >
                  {log.type !== "input" && (
                    <span className="text-white/10 select-none">&gt;&gt;</span>
                  )}
                  <span>{log.text}</span>
                </div>
              ))}
            </div>

            {/* Terminal Shell Input Form */}
            <form
              onSubmit={handleCommandSubmit}
              className="relative z-10 flex items-center gap-2.5 px-6 py-4 bg-white/[0.01] border-t border-white/5"
            >
              <span className="font-mono text-xs text-white/40 select-none">
                attili@quantum_node_05:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="INPUT COMMAND OR PATHWAY..."
                className="flex-1 bg-transparent border-none outline-none ring-0 p-0 text-xs font-mono tracking-wider text-white placeholder:text-zinc-700"
              />
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-zinc-600">
                <Cpu className="w-3 h-3 text-zinc-700" />
                <span>UPLINKED</span>
              </div>
            </form>

            {/* Holographic Cyber Corner Overlays */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 rounded-br-lg" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
