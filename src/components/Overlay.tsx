"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Section({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Always call hooks unconditionally — use isMobile only for output values
  const scrollPoints = [0.25, 0.5, 0.75];

  const opacity = useTransform(scrollYProgress, scrollPoints, [0, 1, 0]);

  // Lighter scale on mobile (less GPU work), bigger zoom on desktop
  const scaleDesktop = useTransform(scrollYProgress, scrollPoints, [0.6, 1, 1.4]);
  const scaleMobile  = useTransform(scrollYProgress, scrollPoints, [0.92, 1, 1.08]);

  // Blur is completely skipped on mobile — most expensive GPU op on phones
  const blurDesktop = useTransform(
    scrollYProgress,
    scrollPoints,
    ["blur(16px)", "blur(0px)", "blur(16px)"]
  );

  return (
    <section
      ref={ref}
      className="h-screen w-full flex items-center justify-center relative pointer-events-none"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          style={{
            opacity,
            scale:  isMobile ? scaleMobile : scaleDesktop,
            filter: isMobile ? undefined : blurDesktop,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-8"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default function Overlay() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative w-full z-10 pointer-events-none -mt-[300vh] h-[300vh] flex flex-col">

      {/* Section 1: Name + Title */}
      <Section isMobile={isMobile}>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mix-blend-difference break-words text-center">
          Shikha Khandelwal
        </h1>
        <p className="mt-2 text-lg sm:text-xl md:text-2xl font-light text-neutral-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mix-blend-difference text-center">
          Sr. Product Manager{" "}
          <span className="text-neutral-400 font-normal border border-white/20 rounded-full px-3 py-1 ml-2 text-base align-middle inline-block bg-white/5">
            Startup Mindset
          </span>
        </p>
      </Section>

      {/* Section 2: Core Expertise */}
      <Section isMobile={isMobile}>
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-neutral-400 mb-6 tracking-[0.2em] uppercase mix-blend-difference text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Core Expertise
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-6 max-w-5xl mx-auto text-center w-full">
          {[
            "Product Strategy & Roadmapping",
            "Agile Leadership (CSM/CSPO)",
            "AI & LLM Implementations",
            "Data-Driven Analytics",
            "Digital Transformation",
            "End-to-End Delivery",
          ].map((skill) => (
            <div
              key={skill}
              className="text-white text-base sm:text-2xl md:text-3xl font-medium tracking-tight mix-blend-difference drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            >
              {skill}
            </div>
          ))}
        </div>
      </Section>

      {/* Section 3: Metrics Bullet Points */}
      <Section isMobile={isMobile}>
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-0">
          <ul className="space-y-4 sm:space-y-8 text-lg sm:text-3xl md:text-4xl font-bold text-neutral-100 leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mix-blend-difference text-left tracking-tight">
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 md:mr-6 flex-shrink-0">•</span>
              <span>
                Passionate about building from the{" "}
                <span className="border-b-2 border-blue-400 pb-0.5">ground up</span>.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 md:mr-6 flex-shrink-0">•</span>
              <span>
                Accelerating growth up to{" "}
                <span className="border-b-2 border-blue-400 pb-0.5">10x</span> and resolving
                technical challenges to scale lasting impact.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 md:mr-6 flex-shrink-0">•</span>
              <span>
                Scaling GTM for <span className="font-black">7M+ users</span> while dropping
                churn by <span className="font-black">57%</span>.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 md:mr-6 flex-shrink-0">•</span>
              <span>
                Optimizing delivery cycles by{" "}
                <span className="font-black">50%</span> across agile teams.
              </span>
            </li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
