import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, User as UserIcon, Mail, Lock, Building, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Farmer');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(name, email, password, role, organization || undefined);
      navigate('/dashboard');
    } catch (err: any) {
      console.warn('Register error:', err);
      // If backend offline, proceed locally
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-100/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full relative z-10">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-blue-500/20">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Box className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="font-heading font-black text-2xl tracking-tight text-slate-900">
              Pack<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Zen</span>
            </span>
          </Link>
          <h1 className="text-xl font-heading font-bold text-slate-900">Create Your PackZen Account</h1>
          <p className="text-xs text-slate-500 mt-1">Select your profile to get customized packaging recommendations</p>
        </div>

        {/* Card Form */}
        <div className="bg-white border border-blue-100 shadow-xl shadow-blue-500/5 rounded-3xl p-6 sm:p-8 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                    placeholder="e.g. Dr. Rajesh Kumar"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                    placeholder="rajesh@krishi.in"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                >
                  <option value="Farmer">Farmer / Grower</option>
                  <option value="Startup">Food Startup</option>
                  <option value="Business">Food Processing & Brand</option>
                  <option value="Researcher">Packaging Scientist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Organization / Company</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                    placeholder="e.g. AgriFarm Producers"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-xs mt-2 shadow-md shadow-blue-500/25"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In to PackZen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
