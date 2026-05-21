import { SmoothScrolling } from "@/components/SmoothScrolling";
import { LoadingGate } from "@/components/LoadingGate";
import { CustomCursor } from "@/components/CustomCursor";
import { QuantumConsole } from "@/components/QuantumConsole";
import { GlitchOverlay } from "@/components/GlitchOverlay";
import { SpaceBackground } from "@/components/SpaceBackground";
import { HudNavigation } from "@/components/HudNavigation";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* 3D Celestial Background */}
      <SpaceBackground />
      
      {/* Cinematic Load Gate & Smooth Scrolling Wrapper */}
      <SmoothScrolling>
        <LoadingGate>
          <CustomCursor />
          <HudNavigation />
          <QuantumConsole />
          <GlitchOverlay />
          <main className="flex min-h-screen flex-col w-full bg-transparent relative z-10">
            <Hero />
            <Manifesto />
            <Stack />
            <Experience />
            <Projects />
            <Achievements />
            <Education />
            <Contact />
            <Footer />
          </main>
        </LoadingGate>
      </SmoothScrolling>
    </div>
  );
}
