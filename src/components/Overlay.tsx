"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Section 1 (Name): identical on mobile and desktop ──
  // Starts fully visible at 0%, fades out at 10-15%.
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], [1, 1, 0, 0]);
  const scale1   = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], [1, 1, 1.4, 1.4]);
  const blur1    = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], ["blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const display1 = useTransform(scrollYProgress, (v) => v > 0.16 ? "none" : "flex");

  // ── Section 2 (Core Expertise) ──
  // Widened mobile window to ensure visibility and prevent "snap-past" vanishing
  const opacity2D = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.45, 0.50, 1], [0, 0, 1, 1, 0, 0]);
  const scale2D   = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.45, 0.50, 1], [0.7, 0.7, 1, 1, 1.4, 1.4]);
  const blur2D    = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.45, 0.50, 1], ["blur(20px)", "blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const display2D = useTransform(scrollYProgress, (v) => (v < 0.14 || v > 0.51) ? "none" : "flex");

  const opacity2M = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.45, 0.50, 1], [0, 0, 1, 1, 0, 0]);
  const scale2M   = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.45, 0.50, 1], [0.7, 0.7, 1, 1, 1.4, 1.4]);
  const blur2M    = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.45, 0.50, 1], ["blur(20px)", "blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const display2M = useTransform(scrollYProgress, (v) => (v < 0.04 || v > 0.52) ? "none" : "flex");

  // ── Section 3 (Bullet Points) ──
  // Shifting entry significantly earlier for mobile to guarantee appearance
  const opacity3D = useTransform(scrollYProgress, [0, 0.45, 0.50, 0.85, 0.90, 1], [0, 0, 1, 1, 0, 0]);
  const scale3D   = useTransform(scrollYProgress, [0, 0.45, 0.50, 0.85, 0.90, 1], [0.7, 0.7, 1, 1, 1.4, 1.4]);
  const blur3D    = useTransform(scrollYProgress, [0, 0.45, 0.50, 0.85, 0.90, 1], ["blur(20px)", "blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const display3D = useTransform(scrollYProgress, (v) => (v < 0.44 || v > 0.91) ? "none" : "flex");

  const opacity3M = useTransform(scrollYProgress, [0, 0.30, 0.38, 0.85, 0.90, 1], [0, 0, 1, 1, 0, 0]);
  const scale3M   = useTransform(scrollYProgress, [0, 0.30, 0.38, 0.85, 0.90, 1], [0.7, 0.7, 1, 1, 1.4, 1.4]);
  const blur3M    = useTransform(scrollYProgress, [0, 0.30, 0.38, 0.85, 0.90, 1], ["blur(20px)", "blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const display3M = useTransform(scrollYProgress, (v) => (v < 0.28 || v > 0.92) ? "none" : "flex");

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] -mt-[500vh] z-10 pointer-events-none">
      {/* ── GHOST SNAP TARGETS ── */}
      {/* This ensures the browser has physical targets to snap TO, matching the text moments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-screen snap-start" /> {/* Moment 1: Landing (0%) */}
        <div style={{ top: "32.5%" }} className="absolute h-screen snap-start" /> {/* Moment 2: Expertise (Midpoint) */}
        <div style={{ top: "67.5%" }} className="absolute h-screen snap-start" /> {/* Moment 3: Metrics (Midpoint) */}
        <div style={{ top: "100%" }} className="absolute h-screen snap-start" />  {/* Moment 4: Transition out */}
      </div>

      <div className="sticky top-0 w-full h-screen p-4 sm:p-8 md:p-24 overflow-hidden">

        {/* Section 1: Name */}
        <motion.div
          style={{ opacity: opacity1, scale: scale1, filter: blur1, display: display1 }}
          className="absolute inset-0 flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl mix-blend-difference break-words">
            Shikha Khandelwal
          </h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl font-light text-neutral-300 drop-shadow-md lg:mix-blend-difference">
            Sr. Product Manager (Startup Mindset)
          </p>
        </motion.div>

        {/* Section 2: Core Expertise */}
        <motion.div
          style={{
            opacity:  isMobile ? opacity2M : opacity2D,
            scale:    isMobile ? scale2M   : scale2D,
            filter:   isMobile ? blur2M    : blur2D,
            display:  isMobile ? display2M : display2D,
          }}
          className="absolute inset-0 flex-col items-center justify-center p-4 sm:p-12 md:p-24 text-center"
        >
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-neutral-400 mb-8 tracking-[0.2em] uppercase lg:mix-blend-difference">
            Core Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            {["Product Strategy & Roadmapping", "Agile Leadership (CSM/CSPO)", "AI & LLM Implementations", "Data-Driven Analytics", "Digital Transformation", "End-to-End Delivery"].map(skill => (
              <div key={skill} className="text-white text-lg sm:text-2xl md:text-3xl font-medium tracking-tight lg:mix-blend-difference drop-shadow-xl">
                {skill}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 3: Bullet Points */}
        <motion.div
          style={{
            opacity:  isMobile ? opacity3M : opacity3D,
            scale:    isMobile ? scale3M   : scale3D,
            filter:   isMobile ? blur3M    : blur3D,
            display:  isMobile ? display3M : display3D,
          }}
          className="absolute inset-0 flex-col items-center justify-center p-4 sm:p-12 md:p-24 text-center"
        >
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-0">
            <ul className="space-y-6 md:space-y-8 text-xl sm:text-2xl md:text-4xl font-bold text-neutral-200 leading-tight drop-shadow-xl lg:mix-blend-difference text-left tracking-tight">
              <li className="flex items-start">
                <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0 mt-1 sm:mt-0">•</span>
                <span>Passionate about building from the <span className="text-white underline decoration-blue-500">ground up</span>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-4 md:mr-6 flex-shrink-0 mt-1 sm:mt-0">•</span>
                <span>Accelerating growth up to <span className="text-white underline decoration-blue-500">10x</span> and resolving technical challenges to scale lasting impact.</span>
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
        </motion.div>
      </div>
    </div>
  );
}
