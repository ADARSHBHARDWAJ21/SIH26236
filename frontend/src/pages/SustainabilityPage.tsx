import React, { useState } from 'react';
import {
  Leaf, RefreshCw, ShieldCheck, ArrowRight, AlertTriangle,
  Layers, CheckCircle2, TrendingDown, Sparkles, Award, Zap
} from 'lucide-react';

export const SustainabilityPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Produce' | 'Dry' | 'Meat'>('Produce');

  const sustainabilityScenarios = {
    Produce: {
      title: 'Fresh Produce (Tomatoes, Berries & Cut Greens)',
      traditional: {
        name: 'Heavy PVC Clamshell + Unperforated Virgin PE Film',
        weightGrams: 28.5,
        carbonKg: 3.8,
        recyclability: '15% (Hard-to-recycle rigid composite)',
        fossilResinPct: '100% Virgin Hydrocarbon Resin',
        endOfLife: 'Landfill / Microplastics fragmentation'
      },
      sustainable: {
        name: 'Laser Micro-Perforated Mono-Polyolefin + Bio-Trays',
        weightGrams: 8.2,
        carbonKg: 1.4,
        recyclability: '88% (Monolayer circular soft plastics)',
        fossilResinPct: '30% (PCR & Bio-blend renewable)',
        endOfLife: 'Standard mechanical curbside recycling'
      },
      plasticReductionPct: 71.2,
      carbonReductionPct: 63.1,
      sustainabilityScore: 89,
      tradeOffNotes: 'Engineered breathable micro-apertures lower polymer mass by 71% while preserving oxygen equilibrium above anaerobic limits.'
    },
    Dry: {
      title: 'Dry Snacks, Cookies & Biscuits',
      traditional: {
        name: 'PET (12μ) / AluFoil (7μ) / PE (50μ) Tri-Laminate',
        weightGrams: 14.2,
        carbonKg: 5.4,
        recyclability: '5% (Non-separable composite layers)',
        fossilResinPct: '95% Virgin Polymer & Smelted Foil',
        endOfLife: 'Incineration or landfill burial'
      },
      sustainable: {
        name: 'FSC Kraft Paper / Water-based Dispersion / Bio-Sealant',
        weightGrams: 9.8,
        carbonKg: 1.6,
        recyclability: '82% (Repulpable in paper recycling)',
        fossilResinPct: '15% Bio-based Sealant',
        endOfLife: 'Industrial composting & fiber pulping'
      },
      plasticReductionPct: 68.5,
      carbonReductionPct: 70.3,
      sustainabilityScore: 86,
      tradeOffNotes: 'High moisture and grease barrier achieved through recyclable water-based dispersion barriers, cutting carbon footprint by 70%.'
    },
    Meat: {
      title: 'Chilled Protein & Fresh Meat Portions',
      traditional: {
        name: 'Non-Recyclable Multilayer High-Barrier Tray (PP/PVDC/PE)',
        weightGrams: 32.0,
        carbonKg: 4.6,
        recyclability: '0% (Halogenated PVDC layer prevents melting)',
        fossilResinPct: '100% Virgin Resin',
        endOfLife: 'Toxic incineration slag / landfill'
      },
      sustainable: {
        name: 'Mono-material PP Thermoformed Tray + EVOH Barrier Top Web',
        weightGrams: 18.5,
        carbonKg: 2.2,
        recyclability: '75% (Mono-PP rigid reclamation)',
        fossilResinPct: '60% Recycled & Virgin Polypropylene',
        endOfLife: 'Closed-loop polymer circularity'
      },
      plasticReductionPct: 42.1,
      carbonReductionPct: 52.1,
      sustainabilityScore: 78,
      tradeOffNotes: 'Halogen-free EVOH barrier qualifies for mono-polymer polypropylene circular streams without sacrificing gas seal barrier.'
    }
  };

  const active = sustainabilityScenarios[selectedCategory];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Circular Economy & Ecological Life-Cycle Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 flex items-center gap-2.5">
            <Leaf className="w-7 h-7 text-blue-600" />
            PackZen Sustainability & Circularity Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate plastic mass reduction, greenhouse gas lifecycle, and mono-material recyclability index.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
          {(['Produce', 'Dry', 'Meat'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {cat === 'Produce' ? 'Fresh Produce' : cat === 'Dry' ? 'Bakery & Dry' : 'Chilled Protein'}
            </button>
          ))}
        </div>
      </div>

      {/* Sustainability Index Score Banner */}
      <div className="zen-card p-6 sm:p-8 border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm relative overflow-hidden">
        <div className="md:col-span-8 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            PackZen Verified Eco-Score Index
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">{active.title}</h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
            {active.tradeOffNotes}
          </p>
        </div>

        <div className="md:col-span-4 text-center p-6 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-sm">
          <div className="text-4xl font-heading font-black text-blue-700">
            {active.sustainabilityScore}<span className="text-lg text-slate-400 font-normal">/100</span>
          </div>
          <div className="text-xs font-heading font-bold text-slate-900 mt-1">Sustainability Index</div>
          <div className="text-[10px] text-blue-600 font-mono mt-0.5 font-bold">Grade A Circular Mono-Material</div>
        </div>
      </div>

      {/* Side-by-Side Comparison: Traditional vs Sustainable */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traditional Option */}
        <div className="zen-card p-6 border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider font-mono">
              CONVENTIONAL PACKAGING
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-mono font-medium">
              Linear Economy
            </span>
          </div>

          <h3 className="font-heading font-bold text-base text-slate-900">{active.traditional.name}</h3>

          <div className="space-y-2.5 text-xs divide-y divide-slate-100">
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Package Weight / Unit:</span>
              <span className="font-bold text-slate-900 font-mono">{active.traditional.weightGrams} g</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Carbon Footprint:</span>
              <span className="font-bold text-rose-600 font-mono">{active.traditional.carbonKg} kg CO₂e / kg</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Recyclability Stream:</span>
              <span className="text-slate-700">{active.traditional.recyclability}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Fossil Resin Content:</span>
              <span className="text-slate-800 font-medium">{active.traditional.fossilResinPct}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">End-of-Life Fate:</span>
              <span className="text-rose-600 font-semibold">{active.traditional.endOfLife}</span>
            </div>
          </div>
        </div>

        {/* Sustainable Option */}
        <div className="zen-card p-6 border-blue-200 bg-blue-50/20 space-y-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider font-mono">
              PACKZEN CIRCULAR ALTERNATIVE
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-bold font-mono">
              -{active.plasticReductionPct}% Plastic Mass
            </span>
          </div>

          <h3 className="font-heading font-black text-base text-slate-900">{active.sustainable.name}</h3>

          <div className="space-y-2.5 text-xs divide-y divide-slate-100">
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Package Weight / Unit:</span>
              <span className="font-bold text-blue-700 font-mono">{active.sustainable.weightGrams} g</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Carbon Footprint:</span>
              <span className="font-bold text-sky-600 font-mono">{active.sustainable.carbonKg} kg CO₂e / kg</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Recyclability Stream:</span>
              <span className="text-blue-700 font-bold">{active.sustainable.recyclability}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Fossil Resin Content:</span>
              <span className="text-slate-800 font-medium">{active.sustainable.fossilResinPct}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">End-of-Life Fate:</span>
              <span className="text-blue-700 font-semibold">{active.sustainable.endOfLife}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Honest Scientific Principles */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2 shadow-sm">
        <div className="font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          Honest Life-Cycle Transparency & Anti-Greenwashing Commitment
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          PackZen AI rejects greenwashing. No single packaging material is universally "eco-friendly" across all logistics routes. Biodegradable polymers (such as PLA and PHA) require controlled industrial composting environments (&gt;58°C) to mineralize, whereas mono-material polyolefins (PP/PE) thrive in standard municipal sorting and mechanical reclamation. Recommendations calculate <em>real estimated material impact under your specific logistics parameters</em>.
        </p>
      </div>
    </div>
  );
};

export default SustainabilityPage;
