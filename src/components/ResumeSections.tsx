"use client";

import { motion } from "framer-motion";

export default function ResumeSections() {
  const certifications = [
    {
      id: "cert-1",
      name: "Certified Scrum Product Owner (CSPO)",
      category: "Certification",
      gradient: "from-blue-600 to-cyan-500",
      svg: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    },
    {
      id: "cert-2",
      name: "Certified ScrumMaster (CSM)",
      category: "Certification",
      gradient: "from-emerald-500 to-teal-400",
      svg: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      id: "cert-3",
      name: "Project Management Professional (PMP)",
      category: "Certification",
      gradient: "from-emerald-500 to-teal-400",
      svg: "M13 10V3L4 14h7v7l9-11h-7z"
    }
  ];

  const education = [
    {
      id: "edu-1",
      name: "Master in Technology",
      category: "Software Systems (Majors: Data Analytics)",
      gradient: "from-indigo-600 to-purple-600",
      svg: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    },
    {
      id: "edu-2",
      name: "Bachelors in Technology",
      category: "Computer Science and Engineering",
      gradient: "from-rose-500 to-orange-500",
      svg: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
    }
  ];

  return (
    <div className="w-full bg-[#121212] flex flex-col items-center">
      {/* Certifications Section */}
      <section className="relative w-full pb-24 px-4 md:px-12 z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tight">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col sm:flex-row"
              >
                <div className={`w-full sm:w-1/3 aspect-[4/3] sm:aspect-auto bg-gradient-to-br ${cert.gradient} relative overflow-hidden flex items-center justify-center`}>
                  <svg className="w-16 h-16 text-white/40 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={cert.svg} />
                  </svg>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-blue-400 mb-2 tracking-wide uppercase">{cert.category}</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{cert.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative w-full py-24 px-4 md:px-12 z-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tight">
            Education
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col"
              >
                <div className={`w-full aspect-[4/3] sm:aspect-[21/9] bg-gradient-to-r ${edu.gradient} relative overflow-hidden flex items-center justify-center`}>
                  <svg className="w-20 h-20 text-white/40 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={edu.svg} />
                  </svg>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white leading-tight mb-2">{edu.name}</h3>
                  <p className="text-sm font-light text-neutral-300 tracking-wide uppercase">{edu.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* spacing to allow scrolling past bottom cleanly because of contact widget */}
      <div className="h-32 w-full bg-[#121212]"></div>
    </div>
  );
}
