import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const VIPRanks = () => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to ensure Tailwind picks up dynamic colors as static strings
  const getRankGradient = (colorStr) => {
    if (colorStr.includes('green')) return 'bg-gradient-to-br from-green-500 to-green-700';
    if (colorStr.includes('blue')) return 'bg-gradient-to-br from-blue-500 to-blue-700';
    if (colorStr.includes('red')) return 'bg-gradient-to-br from-red-500 to-red-700';
    if (colorStr.includes('amber') || colorStr.includes('orange')) return 'bg-gradient-to-br from-amber-500 to-orange-700';
    return 'bg-gradient-to-br from-gray-600 to-gray-800';
  };

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const response = await api.get('/ranks');
        if (response.data.status) {
          setRanks(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching ranks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRanks();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="store" className="py-24 bg-[#161616] relative overflow-hidden">
      {/* Brighter Background Decor */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-[0.15] pointer-events-none flex items-center justify-center p-20"
      >
        <img src="/rust3.svg" alt="" className="w-full h-full object-contain" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-white tracking-tight uppercase mb-4"
          >
            Support The Server
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-amber-500 mx-auto rounded"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-gray-400 max-w-2xl mx-auto"
          >
            Get exclusive perks and help us keep the servers running at peak performance.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {loading ? (
            <p className="text-gray-400 text-center col-span-4 italic">Loading ranks...</p>
          ) : ranks.length > 0 ? (
            ranks.map((rank, i) => (
              <motion.div 
                key={rank._id} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`bg-[#111] rounded-2xl border ${rank.isPopular ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-[#2a2a2a]'} p-6 transition-colors flex flex-col`}
              >
                {rank.isPopular && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.8 }}
                    className="bg-amber-500 text-[#111] text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full self-start mb-4"
                  >
                    Best Value
                  </motion.div>
                )}
                
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-20 h-20 rounded-full mx-auto mb-6 ${getRankGradient(rank.color)} flex items-center justify-center border-4 border-[#1a1a1a] shadow-inner`}
                >
                  <span className="text-xl font-bold text-white drop-shadow-md">{rank.name}</span>
                </motion.div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{rank.name} Rank</h3>
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">${parseFloat(rank.price).toFixed(2)}/mo</div>
                </div>

                <ul className="mb-8 space-y-3 flex-1 flex flex-col justify-start">
                  {rank.perks && rank.perks.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start text-sm text-gray-300"
                    >
                      <svg className="w-5 h-5 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#" 
                  className={`w-full py-3 rounded-lg font-bold text-center transition-all ${getRankGradient(rank.color)} text-white hover:brightness-110 shadow-lg`}
                >
                  Purchase
                </motion.a>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-4">No ranks available at this time.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VIPRanks;
