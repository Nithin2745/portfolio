"use client";

import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, User, Terminal, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { InteractiveCard } from "../InteractiveCard";
import { DecryptedText } from "@/components/DecryptedText";

// Web3Forms API Endpoint
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

interface LogMessage {
  text: string;
  type: "info" | "success" | "error" | "warning";
  timestamp: string;
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [logs, setLogs] = useState<LogMessage[]>([
    { text: "SYSTEM.READY // UPLINK GATEWAY STABLE", type: "info", timestamp: "00:00:00" },
    { text: "ENDPOINT DETECTED: api.web3forms.com", type: "info", timestamp: "00:00:01" },
  ]);

  const addLog = (text: string, type: "info" | "success" | "error" | "warning" = "info") => {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => [...prev, { text, type, timestamp: time }]);
  };

  // Safe manual updater for inputs to avoid TypeScript/React name binding typos
  const updateField = (field: "name" | "email" | "message", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addLog("TRANSMISSION ERROR: ALL FIELDS MUST BE CALIBRATED", "warning");
      return;
    }

    setStatus("sending");
    setLogs([]); // Clear logs for transmission sequences
    
    addLog("INITIATING DATA PACKAGING...", "info");
    
    // Simulate high-tech packaging delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    addLog("ESTABLISHING SECURE CONNECTION TO UPLINK...", "info");
    
    await new Promise((resolve) => setTimeout(resolve, 600));
    addLog("ENCRYPTING PACKET STREAM // RSA-4096...", "info");

    const accessKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || "eb45e3df-0e26-4a15-abcb-6c092b6935be";

    const payload = {
      access_key: accessKey,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: `New Transmission from ${formData.name} (${formData.email})`,
      from_name: "Portfolio Link UI",
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      addLog("TRANSMITTING DATA PACKETS TO WEB3FORMS SERVER...", "info");

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        addLog("RESPONSE RECEIVED // CODE 200 OK", "success");
        addLog("DECRYPTING SERVER ACKNOWLEDGMENT...", "success");
        await new Promise((resolve) => setTimeout(resolve, 500));
        addLog("TRANSMISSION COMPLETED SUCCESSFULLY // MAIL DISPATCHED", "success");
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Endpoint error during packet transit.");
      }
    } catch (error: any) {
      addLog(`TRANSMISSION FAILURE: ${error.message || "LOST LINK"}`, "error");
      addLog("TERMINATING CONNECTION STREAM...", "error");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-transparent relative z-10 border-t border-white/[0.04] select-none">
      
      {/* Cosmic background effects tailored specifically for this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(255,255,255,0.025)_0%,transparent_70%)] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header HUD System */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="mb-16 text-center"
        >
          <div className="text-[10px] font-mono text-white/40 tracking-[0.25em] mb-1 font-semibold">
            SYS.UPLINK_PORTAL // SECURE_TRANSMIT
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter">
            <DecryptedText text="ESTABLISH UPLINK" />
          </h2>
          <div className="w-12 h-0.5 bg-white mx-auto mb-6 opacity-30" />
          <p className="text-foreground/60 text-lg font-light max-w-lg mx-auto">
            Calibrate your parameters and transmit thoughts directly across the quantum ether.
          </p>
        </motion.div>

        {/* 3D Tilting HUD Interactive Card */}
        <div className="max-w-4xl mx-auto">
          <InteractiveCard glowColor="primary" className="p-[1px] bg-gradient-to-br from-white/10 to-transparent">
            {/* HUD Corner Decorators */}
            <div className="hud-corners-bottom" />

            <div className="grid md:grid-cols-5 gap-0 relative z-20">
              
              {/* Left Column: Telemetry Console Logs */}
              <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-white/[0.06] p-6 flex flex-col justify-between bg-black/30 backdrop-blur-md min-h-[220px] md:min-h-auto">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-xs font-mono text-primary/80 tracking-widest font-semibold pb-3 border-b border-white/[0.04]">
                    <Terminal className="w-4 h-4 text-glow-primary animate-pulse" />
                    <span>SYS.CONSOLE_FEED</span>
                  </div>

                  <div className="font-mono text-[10px] space-y-2.5 max-h-[260px] overflow-y-auto pr-2 scrollbar-thin">
                    <AnimatePresence initial={false}>
                      {logs.map((log, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex items-start gap-1.5 leading-relaxed ${
                            log.type === "success"
                              ? "text-green-400"
                              : log.type === "error"
                              ? "text-red-500 font-bold"
                              : log.type === "warning"
                              ? "text-yellow-500"
                              : "text-zinc-400"
                          }`}
                        >
                          <span className="text-zinc-600 select-none">[{log.timestamp}]</span>
                          <span>{log.text}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] text-[9px] font-mono text-zinc-500 space-y-1">
                  <div>ACCESS_KEY: eb45e3d...35be</div>
                  <div>SECURE_SHIELDS: ACTIVE (TLS 1.3)</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    <span>GATEWAY ORBITAL STRETCH</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Transmission Form Panel */}
              <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between bg-black/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Sender Identity */}
                  <div className="relative">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-500" />
                      SENDER_IDENTITY
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="ENTER YOUR NAME..."
                      data-cursor-label="INPUT.NAME"
                      disabled={status === "sending" || status === "success"}
                      className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/20 focus:border-white focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-sm font-mono tracking-wider transition-all duration-300 placeholder:text-zinc-600 disabled:opacity-40"
                    />
                  </div>

                  {/* Return Coordinates */}
                  <div className="relative">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      RETURN_COORDINATES
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="ENTER YOUR EMAIL..."
                      data-cursor-label="INPUT.EMAIL"
                      disabled={status === "sending" || status === "success"}
                      className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/20 focus:border-white focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-sm font-mono tracking-wider transition-all duration-300 placeholder:text-zinc-600 disabled:opacity-40"
                    />
                  </div>

                  {/* Transmission Payload */}
                  <div className="relative">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                      MESSAGE_PAYLOAD
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="DEPOSIT COGNITIVE WAVEFORMS HERE..."
                      data-cursor-label="INPUT.MESSAGE"
                      disabled={status === "sending" || status === "success"}
                      className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/20 focus:border-white focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-sm font-mono tracking-wider transition-all duration-300 placeholder:text-zinc-600 resize-none min-h-[100px] disabled:opacity-40"
                    />
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <AnimatePresence mode="wait">
                      {status === "idle" || status === "sending" ? (
                        <motion.button
                          type="submit"
                          disabled={status === "sending"}
                          data-cursor-label={status === "sending" ? "UPLINKING..." : "SYS.TRANSMIT"}
                          className="group relative w-full inline-flex items-center justify-center px-8 py-4 font-mono font-bold tracking-widest text-xs text-black bg-white rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all duration-300 cursor-none border border-white/20 disabled:opacity-50 overflow-hidden"
                        >
                          <span className="flex items-center gap-2">
                            {status === "sending" ? (
                              <>
                                <span>TRANSMITTING SPECTRUM</span>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              </>
                            ) : (
                              <>
                                <span>TRANSMIT UPLINK</span>
                                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </>
                            )}
                          </span>
                        </motion.button>
                      ) : status === "success" ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl font-mono text-xs text-center"
                        >
                          <CheckCircle2 className="w-4 h-4 shrink-0 animate-bounce" />
                          <span>TRANSMISSION RECEIVED. CORE CALIBRATION OPTIMAL.</span>
                        </motion.div>
                      ) : (
                        <motion.button
                          type="button"
                          onClick={() => setStatus("idle")}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          data-cursor-label="SYS.RETRY"
                          className="group relative w-full inline-flex items-center justify-center px-8 py-4 font-mono font-bold tracking-widest text-xs text-white bg-red-950/40 hover:bg-red-900/60 rounded-xl active:scale-[0.98] transition-all duration-300 cursor-none border border-red-500/20 text-center"
                        >
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                            <span>RESET STREAM & RETRY</span>
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>

            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
}
