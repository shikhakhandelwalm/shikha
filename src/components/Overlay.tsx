"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // At progress = 0.5, this section is perfectly centered in the viewport.
  // Text starts from scaled down/blurred and zooms in to full, then zooms past on exit.
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.6, 1, 1.4]);
  const blurValue = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [16, 0, 16]);
  const blur = useTransform(blurValue, (v: number) => `blur(${v}px)`);

  return (
    <section 
      ref={ref} 
      className="h-screen w-full flex items-center justify-center relative pointer-events-none"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div 
          style={{ opacity, scale, filter: blur }}
          className="absolute inset-0 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-8"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default function Overlay() {
  return (
    // Overlaps exactly on top of the 300vh canvas with z-index stacking
    <div className="relative w-full z-10 pointer-events-none -mt-[300vh] h-[300vh] flex flex-col">
      
      {/* Section 1: Name + Title - visible immediately on load */}
      <Section>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mix-blend-difference break-words text-center">
          Shikha Khandelwal
        </h1>
        <p className="mt-2 text-lg sm:text-xl md:text-2xl font-light text-neutral-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mix-blend-difference text-center">
          Sr. Product Manager{" "}
          <span className="text-neutral-400 font-normal border border-white/20 rounded-full px-3 py-1 ml-2 text-base align-middle inline-block bg-white/5 backdrop-blur-md">
            Startup Mindset
          </span>
        </p>
      </Section>

      {/* Section 2: Core Expertise */}
      <Section>
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-neutral-400 mb-8 tracking-[0.2em] uppercase mix-blend-difference text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Core Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-5xl mx-auto text-center w-full">
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
              className="text-white text-lg sm:text-2xl md:text-3xl font-medium tracking-tight mix-blend-difference drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            >
              {skill}
            </div>
          ))}
        </div>
      </Section>

      {/* Section 3: Metrics Bullet Points */}
      <Section>
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-0">
          <ul className="space-y-5 sm:space-y-8 text-xl sm:text-3xl md:text-4xl font-bold text-neutral-100 leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mix-blend-difference text-left tracking-tight">
            <li className="flex items-start">
              <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0">•</span>
              <span>
                Passionate about building from the{" "}
                <span className="text-white border-b-2 border-blue-500 pb-1">ground up</span>.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0">•</span>
              <span>
                Accelerating growth up to{" "}
                <span className="text-white border-b-2 border-blue-500 pb-1">10x</span> and
                resolving technical challenges to scale lasting impact.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0">•</span>
              <span>
                Scaling GTM strategies for{" "}
                <span className="text-white">7M+ users</span> while dropping churn by{" "}
                <span className="text-white">57%</span>.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0">•</span>
              <span>
                Optimizing agile workflows to decrease cycle delivery times by{" "}
                <span className="text-white">50%</span>.
              </span>
            </li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
