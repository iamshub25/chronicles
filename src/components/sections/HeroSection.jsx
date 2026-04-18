import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-8 md:p-16">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/chronicles.png"
          alt="Rust Background"
          className="max-w-full max-h-full object-contain selection:bg-transparent drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          draggable="false"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="bg-amber-500/20 text-amber-500 border border-amber-500/50 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            Premium Rust Experience
          </span>
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl"
        >
          CHRONICLES <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">RUST</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl font-light drop-shadow-lg"
        >
          Providing players with high-quality, lag-free, and perfectly balanced Rust servers. Join our community today.
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="#servers" 
            className="px-8 py-4 bg-amber-500 text-[#111] font-bold text-lg rounded-lg transition-colors"
          >
            View Servers
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05, backgroundColor: "#333" }}
            whileTap={{ scale: 0.95 }}
            href="#store" 
            className="px-8 py-4 bg-[#2a2a2a] border border-[#3f3f46] text-white font-bold text-lg rounded-lg transition-colors"
          >
            VIP Store
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>

    </div>
  );
};

export default HeroSection;
