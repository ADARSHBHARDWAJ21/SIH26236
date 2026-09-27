import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, ArrowRight, Sparkles, Cpu, Layers, Leaf, TrendingUp,
  Activity, AlertTriangle, CheckCircle2, ChevronRight, BarChart3,
  Box, Droplets, Flame, RefreshCw, Zap, Wind, Check, Award, ArrowUpRight,
  LayoutDashboard, DollarSign, Clock, ShieldAlert, CheckCircle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeDemoTab, setActiveDemoTab] = useState(0);
  const [simulatedFood, setSimulatedFood] = useState<'tomatoes' | 'spinach' | 'berries' | 'biscuits'>('tomatoes');

  const illustrativeDemos = [
    {
      commodity: 'Fresh Tomatoes (Vine Ripe)',
      category: 'Fresh Produce',
      moisture: '94%',
      respiration: 'High Breathing Rate',
      temp: '8°C',
      humidity: '85% RH',
      shelfLife: '14 Days (2x Longer)',
      recommended: 'Breathable Laser Micro-Perforated Pouch (PP/LDPE 30μm)',
      otr: '8,500 cc/m²·day',
      wvtr: '22 g/m²·day',
      cost: '₹4.50 / m²',
      sustainability: 'Grade A (88% Circularity)',
      xai: 'Tiny laser pinholes let the tomatoes breathe freely while releasing excess moisture, preventing sour rotting and white mold growth.'
    },
    {
      commodity: 'Crispy Biscuits & Wafers',
      category: 'Bakery & Snacks',
      moisture: '3%',
      respiration: 'Non-Breathing Food',
      temp: '22°C',
      humidity: '50% RH',
      shelfLife: '180 Days (6 Months)',
      recommended: 'High-Barrier Metallized Pouch (BOPP 60μm)',
      otr: '18 cc/m²·day',
      wvtr: '0.8 g/m²·day',
      cost: '₹8.20 / m²',
      sustainability: 'Grade B+ (Recyclable)',
      xai: 'A shiny metallic moisture shield completely blocks air and humidity so crispy wafers stay crunchy and never turn soft or stale.'
    },
    {
      commodity: 'Organic Leafy Greens (Spinach)',
      category: 'Fresh Vegetables',
      moisture: '92%',
      respiration: 'Very High Breathing Rate',
      temp: '4°C',
      humidity: '95% RH',
      shelfLife: '10 Days (2x Longer)',
      recommended: 'Anti-Fog Micro-Perforated Bio-Bag (35μm)',
      otr: '9,200 cc/m²·day',
      wvtr: '24 g/m²·day',
      cost: '₹5.80 / m²',
      sustainability: 'Grade A+ (Compostable)',
      xai: 'Anti-fog film stops water droplets from forming on leaves while allowing fresh air in, keeping spinach crisp and green without rotting.'
    }
  ];

  const simulationData = {
    tomatoes: {
      name: 'Fresh Vine Tomatoes',
      icon: '🍅',
      standardLife: '4 Days',
      packzenLife: '14 Days',
      standardRisk: 'Suffocation & Botrytis Rot',
      packzenSolution: 'Laser Micro-Perforated Polyolefin',
      costSaved: '₹3,200 / 100kg batch',
      freshnessGain: '+250%'
    },
    spinach: {
      name: 'Baby Spinach Leaves',
      icon: '🥬',
      standardLife: '3 Days',
      packzenLife: '10 Days',
      standardRisk: 'Yellowing & Slimy Rot',
      packzenSolution: 'Anti-Fog Equilibrium Bio-Polymer',
      costSaved: '₹4,500 / 100kg batch',
      freshnessGain: '+230%'
    },
    berries: {
      name: 'Farm Fresh Strawberries',
      icon: '🍓',
      standardLife: '2 Days',
      packzenLife: '8 Days',
      standardRisk: 'Condensation & Grey Mold',
      packzenSolution: 'Ventilated High-Permeability Clamshell',
      costSaved: '₹6,800 / 100kg batch',
      freshnessGain: '+300%'
    },
    biscuits: {
      name: 'Crispy Butter Wafers',
      icon: '🍪',
      standardLife: '20 Days',
      packzenLife: '180 Days',
      standardRisk: 'Sogginess & Oil Rancidity',
      packzenSolution: 'Ultra-Barrier Metallized BOPP',
      costSaved: '₹2,100 / 100kg batch',
      freshnessGain: '+800%'
    }
  };

  const currentSim = simulationData[simulatedFood];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Dynamic ambient background blue glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-blue-200/50 via-indigo-100/30 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-96 right-0 w-[550px] h-[550px] bg-sky-200/40 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* TOP FLOATING BOLD NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 px-4 sm:px-8 py-3.5 shadow-sm shadow-blue-500/5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo with Glowing Badge */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-blue-500/25 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Box className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-2xl tracking-tight text-slate-900">
                Pack<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Zen</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hidden sm:inline-block font-bold tracking-wider">
                PACKAGING AI
              </span>
            </div>
          </Link>

          {/* Bold Nav Menu with Pill Design & Never-Wrap */}
          <nav className="hidden lg:flex items-center bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
            <a
              href="#how-it-works"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all whitespace-nowrap"
            >
              How It Works
            </a>
            <a
              href="#problem"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all whitespace-nowrap"
            >
              The Problem
            </a>
            <a
              href="#demo"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all whitespace-nowrap"
            >
              Live Demo
            </a>
            <a
              href="#users"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all whitespace-nowrap"
            >
              Who It's For
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/dashboard"
              className="text-xs font-bold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/70 transition-all hidden sm:inline-flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
              <span>Command Center</span>
            </Link>
            <Link
              to="/new-analysis"
              className="btn-primary text-xs font-bold py-2.5 px-4.5 rounded-xl shadow-lg shadow-blue-500/30 hover:scale-105 transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run AI Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-xs text-blue-700 mb-8 shadow-sm backdrop-blur-xl animate-float font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Smart AI for Food Packaging & Freshness</span>
          </div>

          {/* Main Headline - Replaced with requested high-impact headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.08] mb-6">
            Choose the Right Packaging.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">
              Extend Shelf Life.
            </span>{' '}
            <span className="relative inline-block">
              Reduce Food Waste.
              <span className="absolute -bottom-1.5 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full opacity-60"></span>
            </span>
          </h1>

          {/* Subtitle - Simple Words, High Clarity */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            PackZen uses smart AI to find the perfect packaging for your food in seconds. Prevent rotting, keep food fresh up to 2x longer, and cut packaging costs with ease.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Link
              to="/new-analysis"
              className="btn-primary text-sm font-bold px-8 py-4 shadow-xl shadow-blue-500/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Find My Packaging</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#demo"
              className="btn-secondary text-sm font-bold px-7 py-4 hover:scale-105 transition-all"
            >
              <span>See Live Examples</span>
            </a>
          </div>

          {/* EYE-CATCHING INTERACTIVE FRESHNESS SIMULATOR CARD */}
          <div className="max-w-4xl mx-auto mb-16 bg-white border border-blue-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/10 text-left relative overflow-hidden">
            {/* Top glowing ambient accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{currentSim.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-base text-slate-900">
                      Live Freshness & Spoilage Simulator
                    </h3>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                      Interactive Preview
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click a food below to see how the right packaging stops food rot:
                  </p>
                </div>
              </div>

              {/* Food Quick Switcher Pills */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
                {(['tomatoes', 'spinach', 'berries', 'biscuits'] as const).map((foodKey) => (
                  <button
                    key={foodKey}
                    onClick={() => setSimulatedFood(foodKey)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                      simulatedFood === foodKey
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    {simulationData[foodKey].icon} {simulationData[foodKey].name.split(' ')[1] || simulationData[foodKey].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ordinary Plastic (Bad) */}
              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200/70 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    Standard Generic Wrap
                  </span>
                  <span className="text-[11px] font-mono font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded">
                    Only {currentSim.standardLife}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">
                  High Risk of Spoilage
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Wrong moisture and gas transmission leads to {currentSim.standardRisk}.
                </p>
                <div className="w-full bg-red-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-500 h-full w-[25%]" />
                </div>
                <span className="text-[10px] text-red-600 font-semibold mt-1.5 block">
                  ⚠️ Severe crop & retail loss
                </span>
              </div>

              {/* PackZen AI Bio-Barrier (Good) */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 relative shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    PackZen AI Solution
                  </span>
                  <span className="text-[11px] font-mono font-bold bg-blue-600 text-white px-2 py-0.5 rounded shadow-sm">
                    {currentSim.packzenLife} Freshness
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">
                  {currentSim.packzenSolution}
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Engineered breathing balance extends shelf life by {currentSim.freshnessGain}.
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-sky-500 h-full w-[95%]" />
                </div>
                <span className="text-[10px] text-blue-700 font-bold mt-1.5 flex items-center justify-between">
                  <span>✅ Estimated Savings: {currentSim.costSaved}</span>
                  <span className="text-sky-600">Zero Rot Guarantee</span>
                </span>
              </div>
            </div>
          </div>

          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            <div className="bg-white border border-blue-100 rounded-2xl p-5 text-center shadow-lg shadow-blue-500/5 hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-100 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-blue-600">+140%</div>
              <div className="text-xs text-slate-600 mt-1 font-bold">Longer Shelf Life</div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-5 text-center shadow-lg shadow-blue-500/5 hover:border-sky-400 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3 border border-sky-100 group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-sky-600">28.4%</div>
              <div className="text-xs text-slate-600 mt-1 font-bold">Lower Packaging Costs</div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-5 text-center shadow-lg shadow-blue-500/5 hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 border border-indigo-100 group-hover:scale-110 transition-transform">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-indigo-600">89%</div>
              <div className="text-xs text-slate-600 mt-1 font-bold">Eco-Friendly Materials</div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-5 text-center shadow-lg shadow-blue-500/5 hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3 border border-blue-100 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-blue-700">100%</div>
              <div className="text-xs text-slate-600 mt-1 font-bold">Clear, Simple Advice</div>
            </div>
          </div>

          {/* Interactive How It Works Architecture Card */}
          <div id="how-it-works" className="bg-white border border-blue-100/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 max-w-5xl mx-auto text-left relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    How PackZen Works in 6 Simple Steps
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    From farm harvest to grocery shelves, we match your food to the safest, lowest-cost packaging.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                Engine Status: Active & Ready
              </span>
            </div>

            {/* Stepped Process Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-2xl hover:border-blue-300 transition-all">
                <div className="text-[10px] font-mono text-blue-600 mb-1 font-bold">01. YOUR FOOD</div>
                <div className="font-bold text-xs text-slate-900">Select Food</div>
                <div className="text-[11px] text-slate-500 mt-1">Produce, snacks, bakery, or dairy</div>
              </div>

              <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-2xl hover:border-blue-300 transition-all">
                <div className="text-[10px] font-mono text-blue-600 mb-1 font-bold">02. DETAILS</div>
                <div className="font-bold text-xs text-slate-900">Food Needs</div>
                <div className="text-[11px] text-slate-500 mt-1">Moisture, breathing, & shelf goals</div>
              </div>

              <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-2xl hover:border-blue-300 transition-all">
                <div className="text-[10px] font-mono text-blue-600 mb-1 font-bold">03. JOURNEY</div>
                <div className="font-bold text-xs text-slate-900">Travel & Weather</div>
                <div className="text-[11px] text-slate-500 mt-1">Temperature, humidity, transit days</div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 border border-blue-500 p-3.5 rounded-2xl shadow-lg shadow-blue-500/25 text-white scale-[1.02]">
                <div className="text-[10px] font-mono text-blue-100 mb-1 font-bold flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> 04. SMART AI
                </div>
                <div className="font-bold text-xs text-white">Instant Matching</div>
                <div className="text-[11px] text-blue-100 mt-1">Tests thousands of material choices</div>
              </div>

              <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-2xl hover:border-blue-300 transition-all">
                <div className="text-[10px] font-mono text-blue-600 mb-1 font-bold">05. BALANCE</div>
                <div className="font-bold text-xs text-slate-900">Cost & Freshness</div>
                <div className="text-[11px] text-slate-500 mt-1">Highest shelf life for lowest price</div>
              </div>

              <div className="bg-slate-50/80 border border-sky-200 p-3.5 rounded-2xl hover:border-sky-300 transition-all">
                <div className="text-[10px] font-mono text-sky-600 mb-1 font-bold">06. RESULTS</div>
                <div className="font-bold text-xs text-slate-900">Top Choices</div>
                <div className="text-[11px] text-slate-500 mt-1">Clear advice, costs, & PDF report</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE FOOD PACKAGING CRISIS */}
      <section id="problem" className="py-20 px-6 bg-slate-50/80 border-y border-blue-100/60 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
              The Real Problem
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900">
              Why Most Food Packaging Fails
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Most food producers guess which bag or pouch to use. A small mismatch in air or moisture protection causes food to spoil quickly before ever reaching customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-base font-heading font-bold text-slate-900 mb-2">Soggy Snacks & Dried-Up Produce</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The wrong plastic lets moisture leak in or out. Crispy cookies become soggy in days, and fresh vegetables dry out and lose sellable weight.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-amber-300 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 border border-amber-100">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-base font-heading font-bold text-slate-900 mb-2">Food Goes Bad & Turns Sour</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Oxygen leaks through cheap plastic, making cooking oils, roasted nuts, and bakery items turn sour, stale, and bad-smelling.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-sky-300 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 border border-sky-100">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-base font-heading font-bold text-slate-900 mb-2">Fresh Fruits & Veggies Suffocate</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fresh produce is alive and breathes after harvest. Trapping them in airtight bags causes fast decay, bad odors, and rot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE INTERACTIVE BENCHMARK PLAYGROUND */}
      <section id="demo" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                Live Packaging Test
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900">
                See How PackZen Protects Different Foods
              </h2>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {illustrativeDemos.map((demo, idx) => (
                <button
                  key={demo.commodity}
                  onClick={() => setActiveDemoTab(idx)}
                  className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
                    activeDemoTab === idx
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {demo.commodity.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Interactive Demo Card */}
          {(() => {
            const currentDemo = illustrativeDemos[activeDemoTab];
            return (
              <div className="bg-white border border-blue-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Food Specs */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-blue-700">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                      Food Profile
                    </span>
                    <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {currentDemo.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-slate-900">{currentDemo.commodity}</h3>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <div className="text-slate-500 text-[10px] font-bold uppercase">Moisture Level</div>
                      <div className="font-bold text-slate-900 text-base mt-0.5">{currentDemo.moisture}</div>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <div className="text-slate-500 text-[10px] font-bold uppercase">Breathing Rate</div>
                      <div className="font-bold text-blue-600 text-xs mt-0.5">{currentDemo.respiration}</div>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <div className="text-slate-500 text-[10px] font-bold uppercase">Storage Weather</div>
                      <div className="font-bold text-slate-900 text-xs mt-0.5">{currentDemo.temp} | {currentDemo.humidity}</div>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <div className="text-slate-500 text-[10px] font-bold uppercase">Target Shelf Life</div>
                      <div className="font-bold text-amber-600 text-xs mt-0.5">{currentDemo.shelfLife}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700">
                    <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Why This Works (In Simple Words):
                    </div>
                    <p className="leading-relaxed text-[11px] text-slate-600 font-medium">{currentDemo.xai}</p>
                  </div>
                </div>

                {/* Right: AI Output Recommendation */}
                <div className="lg:col-span-7 bg-blue-50/50 p-6 sm:p-7 rounded-2xl border border-blue-200 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3.5 border-b border-blue-100 mb-4">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Best Balanced Packaging Choice
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                      Best Match
                    </span>
                  </div>

                  <h4 className="text-lg font-heading font-bold text-slate-900 mb-4">{currentDemo.recommended}</h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-6">
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                      <div className="text-slate-500 text-[10px] font-bold">Air Protection</div>
                      <div className="font-bold text-slate-900 text-xs mt-1">{currentDemo.otr}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                      <div className="text-slate-500 text-[10px] font-bold">Water Protection</div>
                      <div className="font-bold text-slate-900 text-xs mt-1">{currentDemo.wvtr}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                      <div className="text-slate-500 text-[10px] font-bold">Estimated Cost</div>
                      <div className="font-bold text-amber-600 text-xs mt-1">{currentDemo.cost}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                      <div className="text-slate-500 text-[10px] font-bold">Eco Score</div>
                      <div className="font-bold text-blue-600 text-xs mt-1">{currentDemo.sustainability}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                    <span className="text-xs text-slate-600 font-medium">Want to test your exact food?</span>
                    <Link
                      to="/new-analysis"
                      className="btn-primary text-xs font-bold py-2.5 px-4 shadow-md shadow-blue-500/20 hover:scale-105 transition-all"
                    >
                      <span>Analyze My Food</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* SECTION 3: TARGET AUDIENCE & PERSONAS */}
      <section id="users" className="py-20 px-6 bg-slate-50/60 border-t border-blue-100/60 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
              Who Uses PackZen
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900">
              Built for Farmers, Startups & Food Brands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
              <div className="font-heading font-bold text-base text-slate-900 mb-1">1. Farmers & Growers</div>
              <div className="text-blue-600 font-bold text-[10px] mb-3">Beginner Mode</div>
              <p className="text-slate-600 leading-relaxed font-medium">
                Simple visual questions about harvest date and transport distance. Recommends low-cost breathable bags so your harvest doesn't rot before market.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-sky-400 hover:-translate-y-1 transition-all duration-300">
              <div className="font-heading font-bold text-base text-slate-900 mb-1">2. Food Startups</div>
              <div className="text-sky-600 font-bold text-[10px] mb-3">Commercial Scale</div>
              <p className="text-slate-600 leading-relaxed font-medium">
                Calculate pouch costs, estimate shelf life, and budget your packaging before launching products in retail stores.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300">
              <div className="font-heading font-bold text-base text-slate-900 mb-1">3. Processors & Brands</div>
              <div className="text-indigo-600 font-bold text-[10px] mb-3">Industrial Grade</div>
              <p className="text-slate-600 leading-relaxed font-medium">
                Choose the exact gas mix and film strength to prevent leaks, maintain freshness, and eliminate customer returns.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
              <div className="font-heading font-bold text-base text-slate-900 mb-1">4. Packaging Specialists</div>
              <div className="text-blue-700 font-bold text-[10px] mb-3">Expert Mode</div>
              <p className="text-slate-600 leading-relaxed font-medium">
                Full barrier numbers (OTR, WVTR), sensitivity charts, and instant technical PDF datasheets for quality teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-20 px-6 relative z-10 border-t border-blue-100">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-3xl p-10 sm:p-14 text-center text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden">
          {/* Ambient lighting inside CTA */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-3xl bg-white/15 backdrop-blur-md p-0.5 mx-auto mb-6 flex items-center justify-center border border-white/20 shadow-lg">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mb-4">
            Keep Your Food Fresh with Smart Packaging
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed font-medium">
            No more guesswork. Find the perfect packaging for your food in under 60 seconds with PackZen AI.
          </p>

          <Link
            to="/new-analysis"
            className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 text-sm font-black px-9 py-4 rounded-xl shadow-xl hover:scale-105 transition-all"
          >
            <span>Launch Free AI Wizard</span>
            <ArrowRight className="w-4 h-4 text-blue-700" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
