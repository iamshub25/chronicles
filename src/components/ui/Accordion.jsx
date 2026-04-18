import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border border-[#2a2a2a] rounded-lg overflow-hidden bg-[#1a1a1a] transition-all duration-300 ${isOpen ? 'border-amber-500/30' : 'hover:border-[#3a3a3a]'}`}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleItem(index)}
            >
              <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-amber-500' : 'text-white'}`}>
                {item.title}
              </span>
              <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? 'text-amber-500' : 'text-gray-400'}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </span>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 pb-5 pt-0 text-gray-400 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
