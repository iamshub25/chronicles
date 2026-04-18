import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const StaffTeam = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get('/staff');
        if (response.data.status) {
          setStaff(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  return (
    <section id="staff" className="py-24 bg-[#161616] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-white tracking-tight uppercase mb-4">Our Team</h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-amber-500 mx-auto rounded"
          ></motion.div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Dedicated professionals ensuring the servers run smoothly and the community thrives.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {loading ? (
            <p className="text-gray-400 text-center col-span-4 italic">Loading staff...</p>
          ) : staff.length > 0 ? (
            staff.map((member, i) => (
              <motion.div 
                key={member._id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1 }
                }}
                whileHover={{ y: -5, borderColor: "rgba(245, 158, 11, 0.4)" }}
                className="bg-[#111] border border-[#2a2a2a] rounded-xl p-8 text-center transition-colors group"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#2a2a2a] group-hover:border-amber-500 transition-colors bg-white">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <span className={`text-sm font-semibold uppercase tracking-wider text-amber-500`}>
                  {member.role}
                </span>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-4">No staff team members to show.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default StaffTeam;
