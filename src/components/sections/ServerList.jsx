import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ServerCard from '../ui/ServerCard';

const ServerList = () => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await api.get('/servers');
        if (response.data.status) {
          setServers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching servers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServers();
  }, []);
  return (
    <section id="servers" className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white tracking-tight uppercase mb-4 pt-10">Our Servers</h2>
          <div className="h-1 w-24 bg-amber-500 mx-auto rounded"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Choose your battlefield. We offer servers ranging from slightly modified vanilla to fully modded high-rate experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-gray-400 text-center col-span-3">Loading servers...</p>
          ) : servers.length > 0 ? (
            servers.map(server => (
              <ServerCard key={server._id} {...server} />
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">No servers available at this time.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServerList;
