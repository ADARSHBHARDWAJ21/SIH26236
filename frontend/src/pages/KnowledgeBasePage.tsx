import React, { useState, useEffect } from 'react';
import {
  BookOpen, Layers, Apple, ShieldCheck, Plus, Search,
  RefreshCw, Check, AlertCircle, Edit2, Trash2, X, Sparkles, Box
} from 'lucide-react';
import api from '../services/api';
import { PackagingMaterial, Commodity } from '../types';

export const KnowledgeBasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'materials' | 'commodities' | 'rules'>('materials');
  const [materials, setMaterials] = useState<PackagingMaterial[]>([]);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Add Material Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMat, setNewMat] = useState({
    name: '',
    structure: '',
    category: 'High Barrier Coex',
    thickness_microns: 50,
    otr_cc_m2_day_atm: 15.0,
    wvtr_g_m2_day: 2.0,
    gas_permeability_category: 'Low',
    sealability: 'Good',
    puncture_resistance: 'Good',
    map_suitability: true,
    recyclability_pct: 75.0,
    carbon_footprint_kg_co2_per_kg: 2.2,
    cost_per_sqm_inr: 8.50,
    key_features: '',
    ideal_for: ''
  });

  const fallbackMaterials: PackagingMaterial[] = [
    {
      id: 1,
      name: 'Laser Micro-perforated Polyolefin (PP/LDPE 30μm)',
      category: 'Breathable MAP',
      cost_per_sqm_inr: 4.50,
      structure: 'Biaxially Oriented Polypropylene + Laser Apertures (150μm)',
      thickness_microns: 30,
      otr_cc_m2_day_atm: 8500,
      wvtr_g_m2_day: 22.0,
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
      key_features: 'Total light & moisture block, hermetic vacuum',
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
    },
    {
      id: 5,
      name: 'EVOH Co-extruded High Gas Barrier (50μm)',
      category: 'High Barrier Coex',
      cost_per_sqm_inr: 8.60,
      structure: 'PP / Tie / EVOH 32 mol% Core / Tie / LLDPE',
      thickness_microns: 50,
      otr_cc_m2_day_atm: 2.5,
      wvtr_g_m2_day: 1.4,
      gas_permeability_category: 'Low',
      sealability: 'Excellent',
      puncture_resistance: 'High',
      map_suitability: true,
      recyclability_pct: 82,
      carbon_footprint_kg_co2_per_kg: 2.4,
      sustainability_score_base: 80,
      protection_score_base: 94,
      min_temp_c: -10,
      max_temp_c: 70,
      key_features: 'Gas flushing, MAP, aroma preservation',
      ideal_for: 'Chilled meats, artisan cheese, ready meals'
    }
  ];

  const fallbackCommodities: Commodity[] = [
    {
      id: 1,
      name: 'Fresh Harvest Tomato',
      category: 'Fruits',
      typical_shelf_life_days: 7,
      ideal_temp_c: 8.0,
      ideal_humidity_pct: 85.0,
      moisture_pct: 94.0,
      fat_pct: 0.2,
      ph: 4.3,
      respiration_rate: 'High',
      recommended_gas_ratio_o2: 3,
      recommended_gas_ratio_co2: 5,
      recommended_gas_ratio_n2: 92,
      sensitivity_notes: 'High transpiration rate; needs breathable film with anti-fog additive.',
      created_at: '2026-09-01'
    },
    {
      id: 2,
      name: 'Crispy Biscuits & Cookies',
      category: 'Bakery',
      typical_shelf_life_days: 180,
      ideal_temp_c: 22.0,
      ideal_humidity_pct: 50.0,
      moisture_pct: 3.0,
      fat_pct: 18.0,
      ph: 6.5,
      respiration_rate: 'None',
      recommended_gas_ratio_o2: 0,
      recommended_gas_ratio_co2: 0,
      recommended_gas_ratio_n2: 100,
      sensitivity_notes: 'Extreme crispness loss risk; requires WVTR < 1.0 g/m²·day and light shield.',
      created_at: '2026-09-01'
    },
    {
      id: 3,
      name: 'Organic Spinach Leaves',
      category: 'Vegetables',
      typical_shelf_life_days: 5,
      ideal_temp_c: 4.0,
      ideal_humidity_pct: 95.0,
      moisture_pct: 92.0,
      fat_pct: 0.4,
      ph: 6.2,
      respiration_rate: 'Very High',
      recommended_gas_ratio_o2: 2,
      recommended_gas_ratio_co2: 8,
      recommended_gas_ratio_n2: 90,
      sensitivity_notes: 'Consumes O2 aggressively; micro-perforations required to avoid yellowing fermentation.',
      created_at: '2026-09-01'
    },
    {
      id: 4,
      name: 'Chilled Paneer / Cottage Cheese',
      category: 'Dairy',
      typical_shelf_life_days: 14,
      ideal_temp_c: 4.0,
      ideal_humidity_pct: 90.0,
      moisture_pct: 55.0,
      fat_pct: 22.0,
      ph: 5.8,
      respiration_rate: 'None',
      recommended_gas_ratio_o2: 0,
      recommended_gas_ratio_co2: 30,
      recommended_gas_ratio_n2: 70,
      sensitivity_notes: 'Susceptible to mold and lipid rancidity; MAP with 70% N2 / 30% CO2 recommended.',
      created_at: '2026-09-01'
    }
  ];

  const packagingRules = [
    {
      id: 1,
      rule: 'High Moisture Matrix Rule (>70% Moisture)',
      condition: 'Moisture content > 70% in non-respiring food matrix (fresh meat, wet dairy)',
      action: 'Enforce high water vapour barrier (WVTR < 3.0 g/m²·day) to prevent product weight loss and syneresis dehydration.'
    },
    {
      id: 2,
      rule: 'Crisp Dry Food Barrier Rule (<10% Moisture)',
      condition: 'Moisture content < 10% (biscuits, wafers, dry crackers)',
      action: 'Prioritize metallized BOPP or aluminum foil laminate (WVTR < 1.0 g/m²·day) to stop ambient moisture absorption and sogginess.'
    },
    {
      id: 3,
      rule: 'Lipid Auto-Oxidation Rule (>15% Fat)',
      condition: 'Lipid/fat content > 15% (chips, roasted nuts, coffee, full-cream powders)',
      action: 'Require strict oxygen barrier (OTR < 20 cc/m²·day) and UV light block to prevent free-radical peroxide rancidity.'
    },
    {
      id: 4,
      rule: 'Produce Respiration Asphyxiation Rule',
      condition: 'Produce respiration rate = High or Very High (tomatoes, spinach, mushrooms)',
      action: 'Prohibit impermeable barrier films; enforce laser micro-perforations (100-200μm) or high gas transmission polymers to stop anaerobic off-odours.'
    },
    {
      id: 5,
      rule: 'Deep Cold Chain Flex-Crack Rule (<0°C Storage)',
      condition: 'Storage temperature < 0°C',
      action: 'Select frost-resistant nylon/metallocene LLDPE copolymer with glass transition temperature below -20°C.'
    },
    {
      id: 6,
      rule: 'Extended Supply Chain Mechanical Stress Rule (>5 Transit Days)',
      condition: 'Transport duration >= 5 days or Road/Rough logistics',
      action: 'Increase minimum film thickness by 20% and verify biaxial orientation for flex-crack and puncture resistance.'
    }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mats, comms] = await Promise.all([
        api.materials.getAll(),
        api.commodities.getAll()
      ]);
      setMaterials(mats && mats.length > 0 ? mats : fallbackMaterials);
      setCommodities(comms && comms.length > 0 ? comms : fallbackCommodities);
    } catch (err) {
      setMaterials(fallbackMaterials);
      setCommodities(fallbackCommodities);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.materials.create(newMat);
      setShowAddModal(false);
      fetchData();
    } catch (err) {
      // Local addition
      setMaterials(prev => [...prev, { ...newMat, id: Date.now() } as any]);
      setShowAddModal(false);
    }
  };

  const handleDeleteMaterial = async (id: number) => {
    if (window.confirm('Delete this packaging substrate from knowledge base?')) {
      try {
        await api.materials.delete(id);
      } catch (err) {
        // Continue local deletion
      }
      setMaterials(prev => prev.filter(m => m.id !== id));
    }
  };

  const filteredMaterials = materials.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              Scientific Polymer Repository & Knowledge Graph
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-brand-emerald" />
            PackZen Knowledge Base & Polymer Manager
          </h1>
          <p className="text-xs text-warm-300 mt-0.5">
            Curated packaging polymer datasheets, food chemistry baselines, and empirical biochemical decision rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'materials' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary text-xs py-2 px-3.5 shadow-zen-glow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Substrate</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab('materials')}
          className={`text-xs px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === 'materials'
              ? 'bg-gradient-to-r from-brand-emerald/25 to-brand-teal/15 text-white border border-brand-emerald shadow-sm font-semibold'
              : 'text-warm-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-brand-emerald" />
          <span>Packaging Polymers ({materials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('commodities')}
          className={`text-xs px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === 'commodities'
              ? 'bg-gradient-to-r from-brand-emerald/25 to-brand-teal/15 text-white border border-brand-emerald shadow-sm font-semibold'
              : 'text-warm-400 hover:text-white'
          }`}
        >
          <Apple className="w-4 h-4 text-brand-cyan" />
          <span>Food Commodities ({commodities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`text-xs px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === 'rules'
              ? 'bg-gradient-to-r from-brand-emerald/25 to-brand-teal/15 text-white border border-brand-emerald shadow-sm font-semibold'
              : 'text-warm-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-brand-amber" />
          <span>Biochemical Rules ({packagingRules.length})</span>
        </button>
      </div>

      {/* Search Input for Materials */}
      {activeTab === 'materials' && (
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
          <input
            type="text"
            placeholder="Search polymers by name or category (e.g. EVOH, BOPP, Bio)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full zen-input pl-10 text-xs"
          />
        </div>
      )}

      {/* TAB 1: MATERIALS */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMaterials.map((m) => (
              <div key={m.id} className="zen-card p-5 border-white/10 space-y-3 flex flex-col justify-between hover:border-brand-emerald/30 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zen-900 text-brand-mint border border-brand-emerald/30 font-semibold">
                      {m.category}
                    </span>
                    <span className="text-xs font-bold text-brand-amber font-mono">
                      ₹{m.cost_per_sqm_inr.toFixed(2)}/m²
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm text-white mb-1">{m.name}</h3>
                  <p className="text-[11px] text-warm-400 line-clamp-2 leading-relaxed">{m.structure}</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] mt-3 pt-2.5 border-t border-white/5 font-mono">
                    <div>
                      <span className="text-warm-400">OTR:</span>{' '}
                      <span className="font-bold text-white">{m.otr_cc_m2_day_atm.toLocaleString()} cc</span>
                    </div>
                    <div>
                      <span className="text-warm-400">WVTR:</span>{' '}
                      <span className="font-bold text-white">{m.wvtr_g_m2_day} g</span>
                    </div>
                    <div>
                      <span className="text-warm-400">Thickness:</span>{' '}
                      <span className="font-bold text-white">{m.thickness_microns} μm</span>
                    </div>
                    <div>
                      <span className="text-warm-400">Recycle:</span>{' '}
                      <span className="font-bold text-brand-mint">{m.recyclability_pct}%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-warm-400 font-mono">
                    Seal: {m.sealability} | MAP: {m.map_suitability ? 'Yes' : 'No'}
                  </span>
                  <button
                    onClick={() => handleDeleteMaterial(m.id)}
                    className="p-1 text-warm-500 hover:text-rose-400 transition-colors"
                    title="Delete Material"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COMMODITIES */}
      {activeTab === 'commodities' && (
        <div className="zen-card p-6 border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zen-900/90 text-warm-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-xl">Commodity Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-center">Moisture %</th>
                  <th className="p-3 text-center">Fat %</th>
                  <th className="p-3 text-center">pH</th>
                  <th className="p-3 text-center">Respiration</th>
                  <th className="p-3 rounded-r-xl">Ideal Conditions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {commodities.map((c) => (
                  <tr key={c.id} className="hover:bg-zen-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white">{c.name}</td>
                    <td className="p-3 text-warm-400 font-mono text-[11px]">{c.category}</td>
                    <td className="p-3 text-center font-mono text-brand-mint">{c.moisture_pct}%</td>
                    <td className="p-3 text-center font-mono text-brand-amber">{c.fat_pct}%</td>
                    <td className="p-3 text-center font-mono text-white">pH {c.ph}</td>
                    <td className="p-3 text-center">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        c.respiration_rate === 'High' || c.respiration_rate === 'Very High'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : 'bg-zen-850 text-warm-400 border border-white/10'
                      }`}>
                        {c.respiration_rate}
                      </span>
                    </td>
                    <td className="p-3 text-warm-300 font-mono text-[11px]">
                      {c.ideal_temp_c}°C / {c.ideal_humidity_pct}% RH
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RULES */}
      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packagingRules.map((rule) => (
            <div key={rule.id} className="zen-card p-5 border-white/10 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-heading font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                  {rule.rule}
                </span>
                <span className="text-[10px] font-mono text-brand-mint bg-zen-900 px-2 py-0.5 rounded border border-brand-emerald/30">
                  Rule #{rule.id}
                </span>
              </div>
              <div className="text-xs space-y-1">
                <span className="text-warm-400 text-[11px] uppercase font-mono block">Condition Trigger:</span>
                <p className="text-warm-200 font-medium">{rule.condition}</p>
              </div>
              <div className="text-xs space-y-1 pt-1 border-t border-white/5">
                <span className="text-brand-mint text-[11px] uppercase font-mono block font-semibold">Engineering Action:</span>
                <p className="text-warm-300 leading-relaxed">{rule.action}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD MATERIAL MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-zen-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="zen-card p-6 sm:p-7 max-w-lg w-full border-brand-emerald/40 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">Add New Packaging Substrate</h3>
              <button onClick={() => setShowAddModal(false)} className="text-warm-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMaterial} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-warm-200 mb-1">Substrate Name</label>
                <input
                  type="text"
                  required
                  value={newMat.name}
                  onChange={(e) => setNewMat({ ...newMat, name: e.target.value })}
                  placeholder="e.g. Nanocellulose Bio-Barrier Film (30μm)"
                  className="w-full zen-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-warm-200 mb-1">Category</label>
                  <input
                    type="text"
                    value={newMat.category}
                    onChange={(e) => setNewMat({ ...newMat, category: e.target.value })}
                    className="w-full zen-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-warm-200 mb-1">Raw Cost (₹/m²)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMat.cost_per_sqm_inr}
                    onChange={(e) => setNewMat({ ...newMat, cost_per_sqm_inr: parseFloat(e.target.value) || 0 })}
                    className="w-full zen-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-warm-200 mb-1">OTR (cc/m²·day)</label>
                  <input
                    type="number"
                    value={newMat.otr_cc_m2_day_atm}
                    onChange={(e) => setNewMat({ ...newMat, otr_cc_m2_day_atm: parseFloat(e.target.value) || 0 })}
                    className="w-full zen-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-warm-200 mb-1">WVTR (g/m²·day)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMat.wvtr_g_m2_day}
                    onChange={(e) => setNewMat({ ...newMat, wvtr_g_m2_day: parseFloat(e.target.value) || 0 })}
                    className="w-full zen-input text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-5 shadow-zen-glow"
                >
                  Save Substrate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBasePage;
