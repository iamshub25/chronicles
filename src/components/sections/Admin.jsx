import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CmsModal from '../ui/CmsModal';
import api from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

const Admin = () => {
  const { refreshSettings } = useSettings();
  const [activeTab, setActiveTab] = useState('servers');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'servers', label: 'Servers', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' },
    { id: 'rules', label: 'Rules', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'ranks', label: 'VIP Ranks', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'staff', label: 'Staff Team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  const fetchData = async () => {
    setLoading(true);
    setData([]); // Clear old data to prevent cross-tab rendering issues
    try {
      const response = await api.get(`/${activeTab}`);
      if (response.data.status) {
        // Settings returns { list: [], map: {} }
        const result = activeTab === 'settings' ? response.data.data.list : response.data.data;
        setData(result);
      }
    } catch (err) {
      console.error(`Error fetching ${activeTab}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setFormData(item || getDefaultFormData());
    setModalOpen(true);
  };

  const getDefaultFormData = () => {
    if (activeTab === 'servers') return { name: '', type: 'Vanilla', mapSize: '3500', maxPlayers: 200, wipeDate: '', ip: '', battlemetricsId: '' };
    if (activeTab === 'rules') return { title: '', content: '', orderIndex: data.length + 1 };
    if (activeTab === 'ranks') return { name: '', price: '5.00', color: 'from-blue-500 to-blue-700', perks: '', isPopular: false };
    if (activeTab === 'staff') return { name: '', role: '', avatar: '' };
    if (activeTab === 'settings') return { key: '', value: '', label: '', description: '' };
    return {};
  };

  const handleSave = async () => {
    setSaveLoading(true);
    
    try {
      let response;
      if (activeTab === 'settings') {
        response = await api.put(`/settings/${formData.key}`, { value: formData.value });
      } else {
        const url = editingItem ? `/${activeTab}/${editingItem._id}` : `/${activeTab}`;
        let finalData = { ...formData };
        if (activeTab === 'ranks' && typeof formData.perks === 'string') {
          finalData.perks = formData.perks.split(',').map(p => p.trim());
        }
        response = editingItem ? await api.put(url, finalData) : await api.post(url, finalData);
      }
        
      if (response.data.status) {
        setModalOpen(false);
        fetchData();
        if (activeTab === 'settings') refreshSettings();
      }
    } catch (err) {
      console.error('Error saving:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await api.delete(`/${activeTab}/${id}`);
      if (response.data.status) fetchData();
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-[#222] hidden lg:block">
        <div className="p-6">
          <h2 className="text-xl font-black text-amber-500 tracking-tighter uppercase italic">CMS Dashboard</h2>
        </div>
        <nav className="mt-4 px-3 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                activeTab === tab.id ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={tab.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">{activeTab}</h1>
            <p className="text-gray-400">Manage your website's {activeTab} content.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl font-bold border border-[#333] text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all"
            >
              Logout
            </button>
            {activeTab !== 'settings' && (
              <button 
                onClick={() => handleOpenModal()}
                className="bg-amber-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add New
              </button>
            )}
          </div>
        </header>

        {/* Desktop Data Grid */}
        <div className="bg-[#161616] border border-[#222] rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1c1c1c] border-b border-[#222]">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {activeTab === 'settings' ? 'Global Variable' : 'Name/Title'}
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {activeTab === 'settings' ? 'Current Value' : 'Details'}
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {loading ? (
                <tr><td colSpan="3" className="p-12 text-center text-gray-500 animate-pulse">Fetching records...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="3" className="p-12 text-center text-gray-500 italic">No {activeTab} found.</td></tr>
              ) : data.map(item => (
                <tr key={item._id || item.key} className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-white text-lg">{item.label || item.name || item.title}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">
                      {activeTab === 'settings' ? `KEY: ${item.key}` : `ID: ${item._id}`}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-400">
                      {activeTab === 'servers' && `${item.type} | ${item.ip}`}
                      {activeTab === 'rules' && (item.content?.substring(0, 50) || '') + '...'}
                      {activeTab === 'ranks' && `$${item.price} | ${item.color}`}
                      {activeTab === 'staff' && item.role}
                      {activeTab === 'settings' && item.value}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2 rounded-lg bg-[#222] text-gray-400 hover:bg-amber-500 hover:text-black transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      {activeTab !== 'settings' && (
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="p-2 rounded-lg bg-[#222] text-gray-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Dynamic Modal Form */}
      <CmsModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editingItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}
        onSave={handleSave}
        loading={saveLoading}
      >
        <div className="space-y-4">
          {/* SETTINGS FORM */}
          {activeTab === 'settings' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Setting Name</label>
                <input type="text" className="w-full bg-[#333] border border-[#444] rounded-lg p-3 text-gray-400 outline-none cursor-not-allowed" value={formData.label} readOnly />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Value</label>
                <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} placeholder="https://..." autoFocus />
                <p className="text-[10px] text-gray-500 mt-2 italic">{formData.description}</p>
              </div>
            </>
          )}

          {/* SERVERS FORM */}
          {activeTab === 'servers' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                  <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Type</label>
                  <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">IP Addr</label>
                  <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.ip} onChange={e => setFormData({...formData, ip: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Battlemetrics ID (Opt)</label>
                  <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.battlemetricsId} onChange={e => setFormData({...formData, battlemetricsId: e.target.value})} />
                </div>
              </div>
            </>
          )}

          {/* RULES FORM */}
          {activeTab === 'rules' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Title</label>
                <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Rule Content</label>
                <textarea rows="4" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
              </div>
            </>
          )}

          {/* RANKS FORM */}
          {activeTab === 'ranks' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                  <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Price</label>
                  <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Perks (Comma separated)</label>
                <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.perks} onChange={e => setFormData({...formData, perks: e.target.value})} placeholder="Skip Queue, Discord Role, Kit" />
              </div>
            </>
          )}

          {/* STAFF FORM */}
          {activeTab === 'staff' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Display Name</label>
                <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Role</label>
                <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Avatar URL (Opt)</label>
                <input type="text" className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={formData.avatar} onChange={e => setFormData({...formData, avatar: e.target.value})} />
              </div>
            </>
          )}
        </div>
      </CmsModal>
    </div>
  );
};

export default Admin;
