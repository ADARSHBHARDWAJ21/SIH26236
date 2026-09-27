import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell, Search, User as UserIcon, LogOut, Sparkles, ChevronDown,
  Layers, ShieldAlert, Cpu, Check, HelpCircle, Box, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout, mode, setMode } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Respiration Alert (Tomato)', text: 'Micro-perforation O2 balance stabilized at 3.5% equilibrium.', time: '10m ago' },
    { id: 2, title: 'Cost Optimization Found', text: 'BOPP barrier transition yielded 18.5% unit expenditure reduction.', time: '1h ago' },
    { id: 3, title: 'Report AN-1042 Ready', text: 'Full technical PDF packaging datasheet synthesized.', time: '2h ago' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 sm:px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Global Search */}
        <div className="flex items-center gap-4 flex-1 max-w-lg">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-blue-600 border border-slate-200 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Layers className="w-5 h-5" />
          </button>

          {/* Quick Search */}
          <div className="relative w-full hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search food matrices, polymers (e.g. EVOH, Tomato, OTR, PLA)..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-10 pr-12 py-2 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-sans placeholder:text-slate-400"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-slate-400 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 pointer-events-none">
              <span>⌘</span>K
            </div>
          </div>
        </div>

        {/* Right Side: Mode Switcher, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Beginner / Expert Mode Switcher */}
          <div className="hidden md:flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
            <button
              onClick={() => setMode('Beginner')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                mode === 'Beginner'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Beginner Mode
            </button>
            <button
              onClick={() => setMode('Expert')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                mode === 'Expert'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-600" />
              <span>Expert Mode</span>
            </button>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm transition-all"
              aria-label="View Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                    PackZen Intelligence Alerts
                  </h4>
                  <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-mono font-bold">
                    3 New
                  </span>
                </div>

                <div className="divide-y divide-slate-100 mt-2 space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="pt-2 text-xs">
                      <div className="font-bold text-slate-900">{n.title}</div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{n.text}</p>
                      <span className="text-[10px] text-blue-600 mt-1 block font-mono font-semibold">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {user?.name ? user.name.charAt(0) : 'Z'}
              </div>
              <div className="hidden sm:block text-left pr-1">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {user?.name || 'Researcher'}
                </div>
                <div className="text-[10px] text-blue-600 font-semibold leading-tight">
                  {user?.role || 'Food Packaging Specialist'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{user?.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono truncate">{user?.email}</div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {user?.role || 'Researcher'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">PackZen v2.4</span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-blue-600" />
                    Profile & Lab Preferences
                  </Link>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-600" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
