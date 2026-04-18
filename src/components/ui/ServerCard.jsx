import React from 'react';
import { motion } from 'framer-motion';

const ServerCard = ({ name, type, mapSize, players, maxPlayers, wipeDate, ip }) => {
  const occupancyPercentage = Math.min(100, Math.round((players / maxPlayers) * 100));
  
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.15)" }}
      className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-amber-500/50 transition-colors shadow-lg flex flex-col h-full relative"
    >
      
      {/* Wipe Sash */}
      <div className="absolute top-0 right-0 z-10 w-32 h-32 overflow-hidden">
        <div className="bg-amber-500 text-[#111] font-bold text-xs uppercase py-1 shadow-md w-full text-center rotate-45 translate-x-[30%] translate-y-[50%] tracking-wider">
          Just Wiped
        </div>
      </div>

      <div className="h-40 overflow-hidden relative">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8 }}
          src="/server-banner.png" 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <h3 className="text-xl font-bold text-white drop-shadow-md">{name}</h3>
          <span className="bg-[#111]/80 backdrop-blur-sm border border-[#2a2a2a] px-2 py-1 rounded text-xs font-semibold text-gray-300">
            {type}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between text-sm text-gray-400 mb-4 pb-4 border-b border-[#2a2a2a]">
          <div>
            <span className="block text-gray-500 text-xs uppercase mb-1">Map Size</span>
            <span className="font-medium text-white">{mapSize}</span>
          </div>
          <div className="text-right">
            <span className="block text-gray-500 text-xs uppercase mb-1">Last Wipe</span>
            <span className="font-medium text-white">{wipeDate}</span>
          </div>
        </div>

        <div className="mb-6 flex-1">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400 font-medium pb-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Players Online
            </span>
            <span className="text-white font-bold">{players} / {maxPlayers}</span>
          </div>
          <div className="w-full bg-[#111] rounded-full h-2.5 outline outline-1 outline-[#2a2a2a]">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${occupancyPercentage}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-green-500 to-green-400 h-2.5 rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <motion.a 
            whileHover={{ scale: 1.02, backgroundColor: "#f59e0b" }}
            whileTap={{ scale: 0.98 }}
            href={`steam://connect/${ip}`} 
            className="col-span-2 bg-amber-500 text-[#111] font-bold text-center py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Connect to Server
          </motion.a>
          <motion.a 
            whileHover={{ backgroundColor: "#333", scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#store" 
            className="bg-[#2a2a2a] border border-[#3f3f46] text-white font-semibold text-center py-2 rounded-lg transition-colors text-sm"
          >
            Store
          </motion.a>
          <motion.a 
            whileHover={{ backgroundColor: "#333", scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#" 
            className="bg-[#2a2a2a] border border-[#3f3f46] text-white font-semibold text-center py-2 rounded-lg transition-colors text-sm"
          >
            Full Info
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ServerCard;
