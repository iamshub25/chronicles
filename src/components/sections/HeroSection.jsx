import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black pt-16">
      {/* Full-Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/papa.svg"
          alt="Rust Background"
          className="w-full h-full object-cover object-center selection:bg-transparent"
          draggable="false"
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="bg-amber-500/20 text-amber-200 border border-amber-500/50 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            Premium Rust Experience
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl"
        >
          CHRONICLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">RUST</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl font-regular text-white mb-10 max-w-2xl drop-shadow-lg"
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

      {/* Mouse Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center"
      >
        <div className="w-[30px] h-[50px] border-2 border-gray-400/50 rounded-full flex justify-center p-2">
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [1, 0.4, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 bg-amber-500 rounded-full"
          />
        </div>
      </motion.div>

    </div>
  );
};

export default HeroSection;
