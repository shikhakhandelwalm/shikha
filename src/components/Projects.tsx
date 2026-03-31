"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const projects = [
    {
      id: 1,
      name: "Langara College",
      category: "Sr. Product Manager",
      date: "2023 - Present",
      description: "Implemented an AI-powered chatbot, reducing churn by 57% and boosting NPS.",
      details: [
        "Conducted market research and customer interviews leading to power apps implementation across 7 departments.",
        "Delivered an AI-powered chatbot with high empathy, increasing NPS score from 6 to 8.",
        "Led customer-facing teams reducing churn rate by 57% via closed feedback loops.",
        "Operationalized processes for a 30% reduction in development cycle times and 20% increase in on-time launches.",
        "Championed continuous process improvement initiatives, leading to a 15% team productivity spike."
      ],
      image: "/projects/langara-ai.png"
    },
    {
      id: 2,
      name: "Telus Digital",
      category: "Technical Product Manager",
      date: "2021 - 2023",
      description: "Engineered robust GTM strategies launching a 2FA ecosystem for 7M users.",
      details: [
        "Developed comprehensive Go-To-Market strategy for the 2FA Launch serving 7M Users.",
        "Boosted customer base penetration by 11% with Eversafe Branding among 100K+ users.",
        "Managed entire product lifecycle yielding a 15% revenue increase in the first year.",
        "Instituted Agile best practices decreasing overall development cycle time by 50%.",
        "Identified new target segments via deep market analysis resulting in 30% user base growth."
      ],
      image: "/projects/telus-pm.png"
    },
    {
      id: 3,
      name: "Tata Consultancy Services",
      category: "Sr. Product Manager",
      date: "2018 - 2021",
      description: "Delivered enterprise digital transformations and managed end-to-end mass production.",
      details: [
        "Spearheaded Pre-sales initiatives successfully acquiring 2 large-scale clients.",
        "Directed Delivery, Stakeholder, Risk, and Conflict Management paired with expansive budgeting.",
        "Conceptualized and successfully deployed enhanced product features optimizing marketing strategies.",
        "Boosted customer penetration by 11% through tailored creative promotional approaches.",
        "Led cross-functional SCRUM environments ensuring strict sprint deliveries and accurate estimations."
      ],
      image: "/projects/tcs-pm.png"
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section className="relative w-full bg-[#121212] py-32 px-4 md:px-12 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tight">
          Work Experience
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div 
              layoutId={`card-container-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-pointer flex flex-col"
            >
              <motion.div layoutId={`card-image-container-${project.id}`} className="relative w-full aspect-[4/3] overflow-hidden">
                 <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              <motion.div layoutId={`card-content-${project.id}`} className="p-6 flex-1 flex flex-col">
                <motion.div layoutId={`card-category-container-${project.id}`} className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-blue-400 tracking-wide">{project.category}</span>
                  <span className="text-xs text-neutral-500 font-medium">{project.date}</span>
                </motion.div>
                <motion.h3 layoutId={`card-title-${project.id}`} className="text-2xl font-bold text-white mb-3">{project.name}</motion.h3>
                <motion.p layoutId={`card-desc-${project.id}`} className="text-sm text-neutral-300 leading-relaxed font-light">{project.description}</motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 sm:p-8">
              <motion.div 
                layoutId={`card-container-${selectedProject.id}`}
                className="w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar bg-[#1a1a1a] rounded-3xl pointer-events-auto border border-white/10 shadow-2xl flex flex-col md:flex-row relative"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>

                <motion.div layoutId={`card-image-container-${selectedProject.id}`} className="w-full md:w-2/5 relative h-64 md:h-auto shrink-0">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    className="object-cover object-[center_20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent opacity-90 md:opacity-100" />
                </motion.div>

                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <motion.div layoutId={`card-content-${selectedProject.id}`}>
                    <motion.div layoutId={`card-category-container-${selectedProject.id}`} className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">{selectedProject.category}</span>
                      <span className="text-sm text-neutral-400 font-medium bg-white/10 px-3 py-1 rounded-full">{selectedProject.date}</span>
                    </motion.div>
                    <motion.h3 layoutId={`card-title-${selectedProject.id}`} className="text-3xl sm:text-4xl font-black text-white mb-6 mt-2">{selectedProject.name}</motion.h3>
                    <motion.p layoutId={`card-desc-${selectedProject.id}`} className="hidden">{selectedProject.description}</motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-medium text-white mb-4 border-b border-white/10 pb-2">Key Achievements</h4>
                      <ul className="space-y-3">
                        {selectedProject.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-neutral-300 text-sm sm:text-base">
                            <span className="mr-3 text-blue-400 mt-1 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
