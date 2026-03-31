"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1 (0% to 20%) - Starts fully visible
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], [1, 1, 0, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], [1, 1, 1.4, 1.4]);
  const blur1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], ["blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const display1 = useTransform(scrollYProgress, (v) => v > 0.16 ? "none" : "flex");

  // Section 2 (20% to 50%) - Comes from behind
  const opacity2 = useTransform(scrollYProgress, [0, 0.15, 0.2, 0.45, 0.5, 1], [0, 0, 1, 1, 0, 0]);
  const scale2 = useTransform(scrollYProgress, [0, 0.15, 0.2, 0.45, 0.5, 1], [0.7, 0.7, 1, 1, 1.4, 1.4]);
  const blur2 = useTransform(scrollYProgress, [0, 0.15, 0.2, 0.45, 0.5, 1], ["blur(20px)", "blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const display2 = useTransform(scrollYProgress, (v) => (v < 0.14 || v > 0.51) ? "none" : "flex");

  // Section 3 (50% to 90%)
  const opacity3 = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.85, 0.9, 1], [0, 0, 1, 1, 0, 0]);
  const scale3 = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.85, 0.9, 1], [0.7, 0.7, 1, 1, 1.4, 1.4]);
  const blur3 = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.85, 0.9, 1], ["blur(20px)", "blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const display3 = useTransform(scrollYProgress, (v) => (v < 0.44 || v > 0.91) ? "none" : "flex");

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] -mt-[500vh] z-10 pointer-events-none">
      <div className="sticky top-0 w-full h-screen p-4 sm:p-8 md:p-24 overflow-hidden">

        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, scale: scale1, filter: blur1, display: display1 }}
          className="absolute inset-0 flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl mix-blend-difference break-words">
            Shikha Khandelwal
          </h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl font-light text-neutral-300 drop-shadow-md">
            Sr. Product Manager (Startup Mindset)
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, scale: scale2, filter: blur2, display: display2 }}
          className="absolute inset-0 flex-col items-center justify-center p-4 sm:p-12 md:p-24 text-center"
        >
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-neutral-400 mb-8 tracking-[0.2em] uppercase mix-blend-difference">
            Core Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            {["Product Strategy & Roadmapping", "Agile Leadership (CSM/CSPO)", "AI & LLM Implementations", "Data-Driven Analytics", "Digital Transformation", "End-to-End Delivery"].map(skill => (
              <div key={skill} className="text-white text-lg sm:text-2xl md:text-3xl font-medium tracking-tight mix-blend-difference drop-shadow-xl">
                {skill}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, scale: scale3, filter: blur3, display: display3 }}
          className="absolute inset-0 flex-col items-center justify-center p-4 sm:p-12 md:p-24 text-center"
        >
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-0">
            <ul className="space-y-6 md:space-y-8 text-xl sm:text-2xl md:text-4xl font-bold text-neutral-200 leading-tight drop-shadow-xl mix-blend-difference text-left tracking-tight">
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
