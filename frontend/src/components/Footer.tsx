import React from 'react';
import { Box, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 flex items-center justify-center shadow-sm">
            <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
              <Box className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <span className="font-heading font-black text-sm tracking-tight text-slate-900">
            Pack<span className="text-blue-600">Zen</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500 font-medium">Food Packaging Decision Support</span>
        </div>

        <div className="text-center md:text-right text-[11px] text-slate-500">
          <p className="font-semibold text-slate-800">
            "Smart Food Packaging. Zero Food Waste. Better for the Planet."
          </p>
          <p className="text-slate-500 mt-1">
            Easy AI platform helping farmers, food businesses, and packaging teams choose the right material every time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
