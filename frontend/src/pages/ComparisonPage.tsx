import React, { useState, useEffect } from 'react';
import {
  Scale, Check, RefreshCw, BarChart3, ShieldCheck, DollarSign,
  Leaf, Layers, ArrowRight, Activity, Sparkles, Box
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Legend
} from 'recharts';
import api from '../services/api';
import { PackagingMaterial } from '../types';

export const ComparisonPage: React.FC = () => {
  const [allMaterials, setAllMaterials] = useState<PackagingMaterial[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 3]);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const defaultMaterials: PackagingMaterial[] = [
    {
      id: 1,
      name: 'Laser Micro-perforated Polyolefin (PP/LDPE 30μm)',
      category: 'Breathable MAP',
      cost_per_sqm_inr: 4.50,
      structure: 'Biaxially Oriented Polypropylene + Controlled Laser Perforation',
      thickness_microns: 30,
      otr_cc_m2_day_atm: 8500,
      wvtr_g_m2_day: 22,
      gas_permeability_category: 'High',
      sealability: 'Excellent',
      puncture_resistance: 'High',
      map_suitability: true,
      recyclability_pct: 88,
      carbon_footprint_kg_co2_per_kg: 1.8,
      sustainability_score_base: 85,
      protection_score_base: 88,
      min_temp_c: 2,
      max_temp_c: 40,
      key_features: 'Breathable, anti-fog, moisture release',
      ideal_for: 'Fresh produce, tomatoes, mushrooms'
    },
    {
      id: 2,
      name: 'PET (12μ) / AluFoil (7μ) / PE (50μ) Tri-Laminate',
      category: 'Ultra-High Barrier',
      cost_per_sqm_inr: 9.80,
      structure: 'PET / Pure Aluminum Foil Barrier / Sealant PE',
      thickness_microns: 69,
      otr_cc_m2_day_atm: 0.5,
      wvtr_g_m2_day: 0.1,
      gas_permeability_category: 'Very Low',
      sealability: 'Good',
      puncture_resistance: 'Moderate',
      map_suitability: true,
      recyclability_pct: 12,
      carbon_footprint_kg_co2_per_kg: 4.8,
      sustainability_score_base: 45,
      protection_score_base: 98,
      min_temp_c: -20,
      max_temp_c: 85,
      key_features: 'Total light & moisture block, non-recyclable',
      ideal_for: 'Pharma, premium coffee, milk powder'
    },
    {
      id: 3,
      name: 'BOPP Metallized Ultra-High Barrier (60μm)',
      category: 'Metallized Laminate',
      cost_per_sqm_inr: 7.20,
      structure: 'BOPP / Vacuum Metallized Layer / Polyethylene',
      thickness_microns: 60,
      otr_cc_m2_day_atm: 18,
      wvtr_g_m2_day: 0.8,
      gas_permeability_category: 'Low',
      sealability: 'Excellent',
      puncture_resistance: 'Good',
      map_suitability: true,
      recyclability_pct: 75,
      carbon_footprint_kg_co2_per_kg: 2.1,
      sustainability_score_base: 72,
      protection_score_base: 92,
      min_temp_c: 0,
      max_temp_c: 60,
      key_features: 'Crispness preservation, lipid protection',
      ideal_for: 'Biscuits, chips, roasted nuts'
    },
    {
      id: 4,
      name: 'Certified Compostable Bio-Polymer (PLA / PBAT Blown)',
      category: 'Bio-Based Polymer',
      cost_per_sqm_inr: 5.90,
      structure: 'Renewable Corn Starch Derived PLA Co-polymer (ASTM D6400)',
      thickness_microns: 35,
      otr_cc_m2_day_atm: 6200,
      wvtr_g_m2_day: 26,
      gas_permeability_category: 'High',
      sealability: 'Good',
      puncture_resistance: 'Good',
      map_suitability: true,
      recyclability_pct: 98,
      carbon_footprint_kg_co2_per_kg: 0.9,
      sustainability_score_base: 96,
      protection_score_base: 75,
      min_temp_c: 4,
      max_temp_c: 35,
      key_features: '100% industrial compostable, breathable',
      ideal_for: 'Organic produce, berries, leafy greens'
    }
  ];

  const buildLocalComparison = (ids: number[], mats: PackagingMaterial[]) => {
    const selected = mats.filter(m => ids.includes(m.id));

    const metrics = ['Barrier', 'Economy', 'Circularity', 'Seal Strength', 'Puncture', 'MAP Fit'];
    const radarData = metrics.map(metric => {
      const row: any = { metric };
      selected.forEach(m => {
        const key = m.name.slice(0, 16);
        if (metric === 'Barrier') row[key] = m.otr_cc_m2_day_atm < 100 ? 95 : 75;
        else if (metric === 'Economy') row[key] = Math.max(30, Math.round(100 - m.cost_per_sqm_inr * 6));
        else if (metric === 'Circularity') row[key] = m.recyclability_pct;
        else if (metric === 'Seal Strength') row[key] = m.sealability === 'Excellent' ? 95 : 80;
        else if (metric === 'Puncture') row[key] = m.puncture_resistance === 'High' ? 90 : 75;
        else if (metric === 'MAP Fit') row[key] = m.map_suitability ? 95 : 50;
      });
      return row;
    });

    const barData = selected.map(m => ({
      name: m.name.split(' ')[0],
      cost_sqm: m.cost_per_sqm_inr,
      recyclability: m.recyclability_pct
    }));

    return {
      radar_metrics: radarData,
      bar_chart_data: barData,
      materials: selected.map(m => ({
        material: m,
        sustainability_rating: m.recyclability_pct > 80 ? 'Grade A' : m.recyclability_pct > 50 ? 'Grade B' : 'Grade D'
      }))
    };
  };

  useEffect(() => {
    const loadInit = async () => {
      try {
        const mats = await api.materials.getAll();
        if (mats && mats.length >= 3) {
          setAllMaterials(mats);
          const defaultIds = [mats[0].id, mats[1].id, mats[2].id];
          setSelectedIds(defaultIds);
          try {
            const comp = await api.compare.runComparison(defaultIds);
            setComparisonData(comp);
          } catch (e) {
            setComparisonData(buildLocalComparison(defaultIds, mats));
          }
        } else {
          setAllMaterials(defaultMaterials);
          setComparisonData(buildLocalComparison([1, 2, 3], defaultMaterials));
        }
      } catch (err) {
        setAllMaterials(defaultMaterials);
        setComparisonData(buildLocalComparison([1, 2, 3], defaultMaterials));
      }
    };
    loadInit();
  }, []);

  const toggleMaterial = async (id: number) => {
    let newIds = [...selectedIds];
    if (newIds.includes(id)) {
      if (newIds.length <= 1) return;
      newIds = newIds.filter(x => x !== id);
    } else {
      if (newIds.length >= 4) newIds.shift();
      newIds.push(id);
    }
    setSelectedIds(newIds);
    setLoading(true);

    const mats = allMaterials.length > 0 ? allMaterials : defaultMaterials;
    const local = buildLocalComparison(newIds, mats);
    setComparisonData(local);

    try {
      const comp = await api.compare.runComparison(newIds);
      if (comp) setComparisonData(comp);
    } catch (err) {
      // Local comparison is active
    } finally {
      setLoading(false);
    }
  };

  const RADAR_COLORS = ['#2563EB', '#0EA5E9', '#F59E0B', '#10B981'];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Benchmark & Sensitivity Analysis Matrix
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 flex items-center gap-2.5">
            <Scale className="w-7 h-7 text-blue-600" />
            PackZen Packaging Material Comparison
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Multi-vector benchmarking across gas transmission, barrier protection, converting economics, and circularity.
          </p>
        </div>

        <div className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
          Benchmarking {selectedIds.length} Substrates
        </div>
      </div>

      {/* Material Selector Chips */}
      <div className="zen-card p-5 border-slate-200">
        <div className="text-xs font-heading font-bold text-slate-900 mb-3 flex items-center justify-between">
          <span>Select Materials to Compare (Choose 2 to 4 Substrates):</span>
          <span className="text-[11px] text-blue-600 font-mono font-semibold">Click chips to toggle</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {allMaterials.map((m) => {
            const isSelected = selectedIds.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleMaterial(m.id)}
                className={`text-xs px-4 py-2.5 rounded-xl font-medium border transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 border-blue-600 shadow-sm font-semibold'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] border ${
                  isSelected ? 'bg-blue-600 text-white border-blue-600 font-black' : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-mono">Recalculating comparison vectors...</p>
        </div>
      ) : (
        <>
          {/* Visual Charts: Radar & Bar Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Multi-material Radar Chart */}
            <div className="lg:col-span-6 zen-card p-6 border-slate-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-heading font-bold text-slate-900">Multi-Vector Radar Comparison</h3>
                  <p className="text-[11px] text-slate-500">Barrier vs Unit Cost vs Circularity vs Puncture</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-600">Polygon</span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={comparisonData?.radar_metrics || []}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" tick={{ fill: '#2563EB', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 600 }} />
                    {comparisonData?.materials?.map((m: any, idx: number) => {
                      const key = m.material.name.slice(0, 16);
                      const color = RADAR_COLORS[idx % RADAR_COLORS.length];
                      return (
                        <Radar
                          key={m.material.id}
                          name={m.material.name}
                          dataKey={key}
                          stroke={color}
                          fill={color}
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      );
                    })}
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#BFDBFE',
                        borderRadius: '12px',
                        color: '#0F172A',
                        fontSize: '11px',
                        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.15)'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cost & Barrier Bar Chart */}
            <div className="lg:col-span-6 zen-card p-6 border-slate-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-heading font-bold text-slate-900">Cost & Circularity Index</h3>
                  <p className="text-[11px] text-slate-500">Square meter raw cost (INR) vs Recyclability percentage</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-600">Economics</span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData?.bar_chart_data || []}>
                    <XAxis dataKey="name" stroke="#CBD5E1" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                    <YAxis stroke="#CBD5E1" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#BFDBFE',
                        borderRadius: '10px',
                        color: '#0F172A',
                        fontSize: '11px',
                        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.15)'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="cost_sqm" name="Cost (₹/m²)" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="recyclability" name="Recyclability (%)" fill="#2563EB" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Specification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonData?.materials?.map((c: any) => {
              const m = c.material;
              return (
                <div key={m.id} className="zen-card p-6 border-slate-200 space-y-4 flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                        {m.category}
                      </span>
                      <span className="text-xs font-bold text-amber-600 font-mono">₹{m.cost_per_sqm_inr.toFixed(2)}/m²</span>
                    </div>

                    <h3 className="font-heading font-black text-base text-slate-900 mb-1">{m.name}</h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">{m.structure}</p>

                    <div className="space-y-2.5 text-xs divide-y divide-slate-100">
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-slate-500">Gauge Thickness:</span>
                        <span className="font-bold text-slate-900 font-mono">{m.thickness_microns} μm</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-slate-500">OTR (Oxygen Perm.):</span>
                        <span className="font-bold text-slate-900 font-mono">{m.otr_cc_m2_day_atm.toLocaleString()} cc/m²·d</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-slate-500">WVTR (Moisture Flux):</span>
                        <span className="font-bold text-slate-900 font-mono">{m.wvtr_g_m2_day} g/m²·d</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-slate-500">Seal Integrity:</span>
                        <span className="font-bold text-blue-600">{m.sealability}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-slate-500">MAP Qualification:</span>
                        <span className="font-bold text-sky-600">{m.map_suitability ? 'Yes (Flush Verified)' : 'Standard Only'}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-slate-500">Circularity Rating:</span>
                        <span className="font-bold text-emerald-600 font-mono">{c.sustainability_rating} ({m.recyclability_pct}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    <span className="font-bold text-slate-900">Ideal Matrix:</span> {m.ideal_for || m.key_features}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ComparisonPage;
