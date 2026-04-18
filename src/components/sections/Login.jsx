import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isSignup ? '/auth/signup' : '/auth/login';

    try {
      const response = await api.post(endpoint, { username, password });

      if (response.data.status) {
        if (isSignup) {
          setIsSignup(false);
          setError('Account created! You can now log in.');
        } else {
          localStorage.setItem('admin_token', response.data.data.token);
          navigate('/admin');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#161616] border border-[#222] rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-2xl mb-4 rotate-3 shadow-lg shadow-amber-500/20">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">{isSignup ? 'Create Admin' : 'Admin Access'}</h1>
          <p className="text-gray-400 mt-2 italic">{isSignup ? 'Register your master credentials.' : 'Enter your credentials to continue.'}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#222] border border-[#333] rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all placeholder:text-gray-600 focus:ring-4 focus:ring-amber-500/10"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#222] border border-[#333] rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all placeholder:text-gray-600 focus:ring-4 focus:ring-amber-500/10"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className={`border text-sm p-4 rounded-xl text-center ${error.includes('created') ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-amber-500/20"
          >
            {loading ? 'Verifying...' : (isSignup ? 'Create Account' : 'Login')}
          </button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-[#222] flex flex-col gap-4">
          {/* <button 
            onClick={() => setIsSignup(!isSignup)}
            className="text-amber-500 hover:text-amber-400 text-sm font-bold uppercase tracking-wider"
          >
            {isSignup ? 'Already have an account? Login' : 'Need an admin account? Signup'}
          </button> */}

          <a href="/" className="text-gray-500 hover:text-white transition-colors text-sm font-semibold">
            ← Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
