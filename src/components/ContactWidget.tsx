"use client";

import { motion } from "framer-motion";

export default function ContactWidget() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="flex items-center justify-center gap-4 sm:gap-6 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-black/40 border border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <a href="mailto:shikhakhandelwalm@gmail.com" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          <span className="hidden sm:inline">Email</span>
        </a>
        <div className="w-px h-5 bg-white/20" />
        <a href="tel:+12365146004" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <span className="hidden lg:inline">+1 236-514-6004</span>
        </a>
        <div className="w-px h-5 bg-white/20" />
        <a href="https://linkedin.com/in/shikhakhandelwal" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
      </div>
    </motion.div>
  );
}
