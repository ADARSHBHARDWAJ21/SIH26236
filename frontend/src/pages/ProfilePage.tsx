import React, { useState } from 'react';
import {
  UserCheck, ShieldCheck, Mail, Building, Cpu, Check,
  Sparkles, Save, LogOut, Award, Box
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, mode, setMode, logout } = useAuth();
  const [name, setName] = useState(user?.name || 'PackZen Researcher');
  const [role, setRole] = useState<UserRole>(user?.role || 'Researcher');
  const [organization, setOrganization] = useState(user?.organization || 'Food Packaging Research');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Account & Laboratory Credentials
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 flex items-center gap-2.5">
            <UserCheck className="w-7 h-7 text-blue-600" />
            Scientist Profile & Preferences
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your researcher credentials, institutional affiliation, and platform experience mode.
          </p>
        </div>

        <button
          onClick={logout}
          className="btn-secondary text-xs py-2 px-4 text-rose-600 border-rose-200 hover:bg-rose-50 self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-600" />
          <span>Sign Out</span>
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2 shadow-sm font-medium">
          <Check className="w-4 h-4 text-blue-600" />
          <span>Profile configuration saved successfully.</span>
        </div>
      )}

      {/* Main Profile Form Card */}
      <div className="zen-card p-6 sm:p-8 border-slate-200 space-y-6">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Scientist Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full zen-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registered Email</label>
              <input
                type="email"
                disabled
                value={user?.email || 'scientist@packzen.ai'}
                className="w-full zen-input text-xs opacity-60 cursor-not-allowed font-mono bg-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Stakeholder Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full zen-input text-xs"
              >
                <option value="Farmer">Farmer / FPO Producer</option>
                <option value="Startup">Food Startup Innovator</option>
                <option value="Business">Food Processing Industry</option>
                <option value="Researcher">Packaging Scientist / Academic</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Institutional Unit / Affiliation</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full zen-input text-xs"
              />
            </div>
          </div>

          {/* Experience Mode Toggle */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-600" />
              Interface Decision Complexity Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setMode('Beginner')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  mode === 'Beginner'
                    ? 'bg-blue-50/80 border-blue-600 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/25'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/90 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-heading font-bold text-sm text-slate-900">Beginner Mode</div>
                  {mode === 'Beginner' && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Plain-language visual recommendations with actionable advice on rots, shelf life, and unit prices. Ideal for Farmers, FPOs & Startups.
                </p>
              </div>

              <div
                onClick={() => setMode('Expert')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  mode === 'Expert'
                    ? 'bg-blue-50/80 border-blue-600 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/25'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/90 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>Expert Scientist Mode</span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">PRO</span>
                  </div>
                  {mode === 'Expert' && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Full physical datasheets: raw OTR/WVTR figures, Arrhenius decay rates, MAP gas mix targets, sensitivity triggers, and risk matrices.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="btn-primary text-xs py-2.5 px-6 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
