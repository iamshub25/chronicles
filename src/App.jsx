import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ServerList from './components/sections/ServerList';
import VIPRanks from './components/sections/VIPRanks';
import Rules from './components/sections/Rules';
import StaffTeam from './components/sections/StaffTeam';
import Footer from './components/layout/Footer';
import Admin from './components/sections/Admin';
import Login from './components/sections/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { SettingsProvider } from './context/SettingsContext';

const HomePage = () => (
  <div className="min-h-screen bg-[#111] text-gray-100 flex flex-col font-sans selection:bg-amber-500 selection:text-[#111]">
    <Navbar />
    <main className="flex-1">
      <HeroSection />
      <ServerList />
      <VIPRanks />
      <Rules />
      <StaffTeam />
    </main>
    <Footer />
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-[#111] text-gray-100 flex flex-col font-sans selection:bg-amber-500 selection:text-[#111]">
    <Navbar />
    <main className="flex-1 mt-20">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          {/* Redirect any other #admin hashes to the new route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
