import React from 'react';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();
  return (
    <footer className="bg-#0a0a0a border-t border-[#2a2a2a] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
            <img src="/chronicles.png" alt="Logo" className="h-10 w-auto" />
            <span className="text-white text-2xl font-bold tracking-wider uppercase">{settings.site_name || 'CHRONICLES'}</span>
          </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Providing premium, high-performance set of Rust servers. We strive to offer the best, lag-free experience for our community. Join our Discord to get involved!
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#servers" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Servers</a></li>
              <li><a href="#store" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">VIP Store</a></li>
              <li><a href="#rules" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Rules & Info</a></li>
              <li><a href="#staff" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">Staff Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href={settings.discord_link} target="_blank" rel="noreferrer" className="flex items-center text-gray-400 hover:text-indigo-400 text-sm transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" /></svg>
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-blue-400 text-sm transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-red-500 text-sm transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  YouTube
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#2a2a2a] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Chronicles Rust. All rights reserved. Not affiliated with Facepunch Studios.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
