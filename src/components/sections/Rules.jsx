import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import Accordion from '../ui/Accordion';

const Rules = () => {
  const [rulesList, setRulesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await api.get('/rules');
        if (response.data.status) {
          setRulesList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching rules:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  return (
    <section id="rules" className="py-24 bg-[#111] relative overflow-hidden">
      {/* Brighter Section Background */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.35 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          src="/rust2.svg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Softened Gradient for a Brighter Feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-[#111] opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black text-white tracking-tight uppercase mb-4"
          >
            Server Rules
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-amber-500 mx-auto rounded"
          ></motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-gray-400"
          >
            By playing on our servers, you agree to follow these rules. Ignorance is not an excuse.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {loading ? (
            <p className="text-gray-400 text-center">Loading rules...</p>
          ) : (
            <Accordion items={rulesList} />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Rules;
