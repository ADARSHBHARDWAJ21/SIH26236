import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, PlusCircle, History, Scale, Activity,
  Leaf, BookOpen, UserCheck, ShieldCheck, X, Sparkles,
  Zap, Box
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navSections = [
    {
      title: 'CORE INTELLIGENCE',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'New AI Analysis', path: '/new-analysis', icon: PlusCircle, highlight: true },
        { label: 'Analyses History', path: '/history', icon: History },
      ]
    },
    {
      title: 'SIMULATION & OPTIMIZATION',
      items: [
        { label: 'Shelf-Life Simulator', path: '/simulator', icon: Activity },
        { label: 'Compare Materials', path: '/compare', icon: Scale },
        { label: 'Circularity Engine', path: '/sustainability', icon: Leaf },
      ]
    },
    {
      title: 'LAB KNOWLEDGE & SYSTEM',
      items: [
        { label: 'Knowledge Base', path: '/knowledge-base', icon: BookOpen },
        { label: 'Profile & Settings', path: '/profile', icon: UserCheck },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-blue-500/20">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Box className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <div className="font-heading font-black text-xl tracking-tight text-slate-900 flex items-center gap-1">
                Pack<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Zen</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase font-semibold">
                Food Packaging AI
              </div>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links with Groupings */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                {sec.title}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose()}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm font-bold'
                          : item.highlight
                          ? 'text-blue-600 hover:bg-blue-50/70 border border-blue-200/80 hover:border-blue-400 font-bold'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50 font-semibold'
                      }`
                    }
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${item.highlight ? 'text-blue-600' : ''}`} />
                    <span className="truncate">{item.label}</span>
                    {item.highlight && (
                      <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-200">
                        AI
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* System Status Footer Card */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 text-xs relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-[11px] font-bold text-slate-900">PackZen AI Engine Active</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Smart packaging recommendation & freshness optimizer online.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
