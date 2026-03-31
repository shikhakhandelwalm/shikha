"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Section({ children }: { children: React.ReactNode }) {
  // A dedicated ref for this specific 100dvh block
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Since both the viewport and this section are EXACTLY 100dvh tall:
  // v = 0.5 occurs precisely when this section is 100% perfectly centered on screen.
  // v = 0 occurs when this section hasn't scrolled into the screen at all (approaching from top)
  // v = 1 occurs when this section has fully scrolled off the screen (swiped up past it)

  // Therefore, text should be fully opaque and scaled to 1 exactly at v = 0.5.
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.5, 1, 1.5]);
  const blurValue = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [20, 0, 20]);
  const blur = useTransform(blurValue, (v: number) => `blur(${v}px)`);

  return (
    <section 
      ref={ref} 
      className="h-[100dvh] w-full flex items-center justify-center snap-start shrink-0 relative pointer-events-none"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden pointer-events-none">
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
    // Total height is exactly 300dvh to contain exactly three 100dvh sections seamlessly
    <div className="relative w-full z-10 pointer-events-none -mt-[300dvh] h-[300dvh] flex flex-col">
      
      {/* Section 1: Visible upon initial 0px load! */}
      <Section>
         <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mix-blend-difference break-words text-center">
            Shikha Khandelwal
         </h1>
         <p className="mt-2 text-lg sm:text-xl md:text-2xl font-light text-neutral-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mix-blend-difference text-center">
            Sr. Product Manager <span className="text-neutral-400 font-normal border border-white/20 rounded-full px-3 py-1 ml-2 text-base align-middle inline-block bg-white/5 backdrop-blur-md">Startup Mindset</span>
         </p>
      </Section>

      {/* Section 2: Core Expertise */}
      <Section>
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-neutral-400 mb-8 tracking-[0.2em] uppercase mix-blend-difference text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Core Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-5xl mx-auto text-center w-full">
             {["Product Strategy & Roadmapping", "Agile Leadership (CSM/CSPO)", "AI & LLM Implementations", "Data-Driven Analytics", "Digital Transformation", "End-to-End Delivery"].map(skill => (
                <div key={skill} className="text-white text-lg sm:text-2xl md:text-3xl font-medium tracking-tight mix-blend-difference drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                  {skill}
                </div>
             ))}
          </div>
      </Section>

      {/* Section 3: Value Metrics Bullet Points */}
      <Section>
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-0">
            <ul className="space-y-6 sm:space-y-8 text-xl sm:text-3xl md:text-4xl font-bold text-neutral-100 leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mix-blend-difference text-left tracking-tight">
              <li className="flex items-start">
                <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0 mt-1 sm:mt-0">•</span>
                <span>Passionate about building from the <span className="text-white border-b-2 border-blue-500 pb-1">ground up</span>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0 mt-1 sm:mt-0">•</span>
                <span>Accelerating growth up to <span className="text-white border-b-2 border-blue-500 pb-1">10x</span> and resolving technical challenges to scale lasting impact.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0 mt-1 sm:mt-0">•</span>
                <span>Scaling GTM strategies for <span className="text-white">7M+ users</span> while dropping churn by <span className="text-white">57%</span>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0 mt-1 sm:mt-0">•</span>
                <span>Optimizing agile workflows to decrease cycle delivery times by <span className="text-white">50%</span>.</span>
              </li>
            </ul>
          </div>
      </Section>
    </div>
  );
}
