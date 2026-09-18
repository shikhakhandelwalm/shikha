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
      category: "Senior Product Manager · People Systems, Workday HCM & AI Automation",
      date: "2023 - 2025",
      description: "Owned People Systems, Workday HCM and AI/automation initiatives with P&C, reducing manual effort by 40% and improving engagement by 30%.",
      details: [
        "Owned product direction, roadmap, backlog and delivery for People Systems and HR technology initiatives across payroll, onboarding/offboarding, talent and skills, and employee self-service.",
        "Led recurring discovery and office-hours sessions across P&C, Workday, EdTech, IT and administrative teams to identify high-volume manual work, knowledge gaps and approval bottlenecks and turn them into prioritized AI/automation opportunities.",
        "Led Microsoft 365 Copilot enablement from an IT super-user pilot to broader administrative adoption, partnering with Microsoft consultants on architecture, governance, licensing, security review, training and prompt guidance.",
        "Delivered Power Apps, Power Automate, Power Virtual Agents and SharePoint knowledge-agent solutions for onboarding, self-service, HR requests, payroll exceptions and multi-level approvals while keeping Workday as the system of record.",
        "Established Power Platform and AI governance covering DLP, privacy/security assessment, data classification, access controls, ownership boundaries, RACI, data governance and human oversight.",
        "Reduced manual effort by 40% and improved engagement by 30% through workflow redesign, automation and structured adoption measurement."
      ],
      image: "/projects/langara-ai.png"
    },
    {
      id: 2,
      name: "TELUS Digital",
      category: "Senior Product Manager · Digital Transformation & Adoption",
      date: "2022 - 2023",
      description: "Led digital identity and customer-experience products serving 7M users, increasing adoption from 12% to 45%.",
      details: [
        "Owned product direction for identity, authentication and digital-experience capabilities serving 7M users.",
        "Used journey analytics, support themes, experimentation and operational signals to identify friction and prioritize roadmap improvements.",
        "Partnered across Engineering, Analytics, Design, Marketing, Operations and Security on requirements, rollout, adoption and post-launch measurement.",
        "Balanced usability, privacy, security, scalability and operational reliability in a trust-sensitive product environment.",
        "Increased adoption from 12% to 45% through evidence-led product changes and structured rollout and adoption planning."
      ],
      image: "/projects/telus-pm.png"
    },
    {
      id: 3,
      name: "Tata Consultancy Services",
      category: "Product Manager · Enterprise Platforms & Transformation",
      date: "2021 - 2022",
      description: "Led enterprise platform and workflow transformation in regulated financial services, connecting business needs to roadmaps, delivery and automation.",
      details: [
        "Translated business needs into roadmaps, requirements, user stories, acceptance criteria, testing and release plans across enterprise platform initiatives.",
        "Used operational data and Power BI to identify manual work, process gaps and automation opportunities.",
        "Coordinated dependencies across business, technology and operations teams in complex regulated environments.",
        "Built on earlier TCS experience across retail, healthcare, life sciences and SaaS, including master-data work for Macy's and Marks & Spencer."
      ],
      image: "/projects/tcs-pm.png"
    },
    {
      id: 4,
      name: "Aon Hewitt",
      category: "Test Lead · HRIS / Canadian Defined Benefits",
      date: "2010 - 2011",
      description: "Led end-to-end QA for Flex Systems, building early domain depth in HRIS, employee benefits and sensitive people data.",
      details: [
        "Led end-to-end QA for Flex Systems supporting Canadian Defined Benefits programs for enterprise clients.",
        "Worked closely with Business Analysts to translate client-specific plan provisions into test scenarios and expected outcomes.",
        "Validated benefit calculations, employee eligibility, demographic/pay inputs and plan rules through system, integration and regression testing.",
        "Led defect triage and QA execution, strengthening experience in the accuracy, control and privacy expectations of HR technology."
      ],
      image: "/projects/project1.png"
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section className="relative w-full bg-[#121212] py-32 px-4 md:px-12 z-20 overflow-hidden snap-start">
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
