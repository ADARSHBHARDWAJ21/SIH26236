import React, { useState, useEffect } from 'react';
import {
  Calculator, DollarSign, TrendingDown, Layers, Box,
  ArrowRight, ShieldCheck, RefreshCw, Sparkles, CheckCircle2,
  TrendingUp, Award, Zap
} from 'lucide-react';
import api from '../services/api';
import { PackagingMaterial } from '../types';

export const CostCalculatorPage: React.FC = () => {
  const [quantity, setQuantity] = useState(25000);
  const [widthCm, setWidthCm] = useState(15.0);
  const [lengthCm, setLengthCm] = useState(22.0);
  const [heightCm, setHeightCm] = useState(4.0);
  
  const [materials, setMaterials] = useState<PackagingMaterial[]>([]);
  const [currentMatId, setCurrentMatId] = useState<number | undefined>(2);
  const [recMatId, setRecMatId] = useState<number | undefined>(1);

  const [costResult, setCostResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Default packaging materials if backend is booting
  const defaultMaterials: PackagingMaterial[] = [
    {
      id: 1,
      name: 'Laser Micro-perforated Polyolefin (PP/LDPE 30μm)',
      category: 'Breathable Barrier',
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
      name: 'Mono-material High-Density Polyethylene (HDPE 45μm)',
      category: 'Recyclable Mono-polymer',
      cost_per_sqm_inr: 3.20,
      structure: '100% Recyclable Pure HDPE Web',
      thickness_microns: 45,
      otr_cc_m2_day_atm: 800,
      wvtr_g_m2_day: 4.2,
      gas_permeability_category: 'Moderate',
      sealability: 'Good',
      puncture_resistance: 'High',
      map_suitability: false,
      recyclability_pct: 95,
      carbon_footprint_kg_co2_per_kg: 1.4,
      sustainability_score_base: 92,
      protection_score_base: 80,
      min_temp_c: -10,
      max_temp_c: 50,
      key_features: 'Universal curbside recyclability, economical',
      ideal_for: 'Dry grains, pulses, frozen goods'
    }
  ];

  // Local calculation engine for instant zero-latency feedback
  const computeLocalCost = (mats: PackagingMaterial[]) => {
    // Pouch surface area: 2 * (Width * Length + Width * Gusset + Length * Gusset) in m2 with 15% converting trim
    const areaSqmPerUnit = Math.round(2 * ((widthCm * lengthCm) + (widthCm * heightCm * 0.5) + (lengthCm * heightCm * 0.5)) / 10000 * 1.15 * 10000) / 10000;

    const currentMat = mats.find(m => m.id === currentMatId) || mats[1] || defaultMaterials[1];
    const recMat = mats.find(m => m.id === recMatId) || mats[0] || defaultMaterials[0];

    const currentUnitCost = Math.round(areaSqmPerUnit * currentMat.cost_per_sqm_inr * 100) / 100;
    const recUnitCost = Math.round(areaSqmPerUnit * recMat.cost_per_sqm_inr * 100) / 100;

    const currentTotalCost = Math.round(currentUnitCost * quantity);
    const recTotalCost = Math.round(recUnitCost * quantity);

    const diff = currentTotalCost - recTotalCost;
    const savingsPct = currentTotalCost > 0 ? Math.round((diff / currentTotalCost) * 1000) / 10 : 0;

    return {
      package_dimensions: {
        surface_area_sqm_unit: areaSqmPerUnit,
        width_cm: widthCm,
        length_cm: lengthCm,
        height_cm: heightCm
      },
      current_packaging: {
        id: currentMat.id,
        name: currentMat.name,
        cost_per_sqm_inr: currentMat.cost_per_sqm_inr,
        unit_cost_inr: currentUnitCost,
        total_cost_inr: currentTotalCost
      },
      recommended_packaging: {
        id: recMat.id,
        name: recMat.name,
        cost_per_sqm_inr: recMat.cost_per_sqm_inr,
        unit_cost_inr: recUnitCost,
        total_cost_inr: recTotalCost
      },
      savings_analysis: {
        cost_savings_inr: Math.max(0, diff),
        savings_percentage: Math.abs(savingsPct),
        is_saving: diff > 0,
        unit_cost_diff_inr: Math.abs(currentUnitCost - recUnitCost)
      }
    };
  };

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const data = await api.materials.getAll();
        if (data && data.length > 0) {
          setMaterials(data);
          setCurrentMatId(data[1]?.id || data[0].id);
          setRecMatId(data[0].id);
          setCostResult(computeLocalCost(data));
        } else {
          setMaterials(defaultMaterials);
          setCostResult(computeLocalCost(defaultMaterials));
        }
      } catch (err) {
        setMaterials(defaultMaterials);
        setCostResult(computeLocalCost(defaultMaterials));
      }
    };
    loadMaterials();
  }, []);

  const calculateCost = async () => {
    const activeMats = materials.length > 0 ? materials : defaultMaterials;
    const local = computeLocalCost(activeMats);
    setCostResult(local);

    try {
      const res = await api.cost.calculate({
        quantity,
        package_width_cm: widthCm,
        package_length_cm: lengthCm,
        package_height_cm: heightCm,
        current_material_id: currentMatId,
        recommended_material_id: recMatId
      });
      if (res) {
        setCostResult(res);
      }
    } catch (err) {
      // Local calculation already set
    }
  };

  useEffect(() => {
    if (materials.length > 0) {
      calculateCost();
    }
  }, [quantity, widthCm, lengthCm, heightCm, currentMatId, recMatId]);

  const activeMaterials = materials.length > 0 ? materials : defaultMaterials;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Commercial & Batch Expenditure Optimization
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 flex items-center gap-2.5">
            <Calculator className="w-7 h-7 text-blue-600" />
            PackZen Packaging Cost & ROI Calculator
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Calculate precise pouch film surface area, unit cost comparisons, and bulk annual production savings.
          </p>
        </div>

        <div className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
          Batch: {quantity.toLocaleString()} Pouches
        </div>
      </div>

      {/* Interactive Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dimension & Batch Controls */}
        <div className="lg:col-span-6 zen-card p-6 border-slate-200 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-heading font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4 text-blue-600" />
              Pouch Geometry & Production Run
            </h2>
            <span className="text-[10px] font-mono text-slate-400 font-medium">+15% Seam Allowance</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 text-[11px] font-semibold">Width (cm)</label>
              <input
                type="number"
                min="2"
                max="100"
                value={widthCm}
                onChange={(e) => setWidthCm(parseFloat(e.target.value) || 2)}
                className="w-full zen-input text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 text-[11px] font-semibold">Length (cm)</label>
              <input
                type="number"
                min="2"
                max="100"
                value={lengthCm}
                onChange={(e) => setLengthCm(parseFloat(e.target.value) || 2)}
                className="w-full zen-input text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 text-[11px] font-semibold">Gusset Depth (cm)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={heightCm}
                onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                className="w-full zen-input text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 text-xs">
              <label className="font-bold text-slate-900">Production Batch Volume</label>
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {quantity.toLocaleString()} Pouches
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>1k (Pilot)</span>
              <span>50k (Mid Scale)</span>
              <span>200k (Industrial)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <span className="text-slate-500">Pouch Film Surface Area per Unit:</span>
            <span className="font-bold text-blue-700 font-mono text-xs">
              {costResult?.package_dimensions?.surface_area_sqm_unit || '0.075'} m²
            </span>
          </div>
        </div>

        {/* Right: Material Selectors */}
        <div className="lg:col-span-6 zen-card p-6 border-slate-200 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-heading font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Packaging Substrate Comparison
            </h2>
            <span className="text-[10px] font-mono font-semibold text-blue-600">Live Price Matrix</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current / Traditional Packaging Material
            </label>
            <select
              value={currentMatId}
              onChange={(e) => setCurrentMatId(parseInt(e.target.value))}
              className="w-full zen-input text-xs"
            >
              {activeMaterials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (₹{m.cost_per_sqm_inr.toFixed(2)}/m²)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              PackZen Recommended Solution
            </label>
            <select
              value={recMatId}
              onChange={(e) => setRecMatId(parseInt(e.target.value))}
              className="w-full zen-input text-xs"
            >
              {activeMaterials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (₹{m.cost_per_sqm_inr.toFixed(2)}/m²)
                </option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Real-time converter film cost rates synchronized with industry extrusion & lamination indexes.
            </span>
          </div>
        </div>
      </div>

      {/* COST COMPARISON SUMMARY CARDS */}
      {costResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Packaging Card */}
            <div className="zen-card p-6 border-slate-200 space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                CURRENT BASELINE PACK
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900 line-clamp-1">
                {costResult.current_packaging.name}
              </h3>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Substrate Rate:</span>
                  <span className="text-slate-800 font-mono font-medium">₹{costResult.current_packaging.cost_per_sqm_inr.toFixed(2)} / m²</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Unit Pouch Cost:</span>
                  <span className="font-bold text-slate-900 font-mono">₹{costResult.current_packaging.unit_cost_inr.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Total Batch Cost:</span>
                  <span className="font-bold text-rose-600 text-sm font-mono">
                    ₹{costResult.current_packaging.total_cost_inr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommended Packaging Card */}
            <div className="zen-card p-6 border-blue-200 bg-blue-50/20 space-y-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold">
                  PACKZEN SOLUTION
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold font-mono border border-blue-200">
                  {costResult.savings_analysis.is_saving ? `-${costResult.savings_analysis.savings_percentage}% Cost` : 'Enhanced Protection'}
                </span>
              </div>
              <h3 className="font-heading font-black text-base text-slate-900 line-clamp-1">
                {costResult.recommended_packaging.name}
              </h3>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Substrate Rate:</span>
                  <span className="text-blue-700 font-mono font-semibold">₹{costResult.recommended_packaging.cost_per_sqm_inr.toFixed(2)} / m²</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Unit Pouch Cost:</span>
                  <span className="font-bold text-amber-600 font-mono">₹{costResult.recommended_packaging.unit_cost_inr.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Total Batch Cost:</span>
                  <span className="font-bold text-blue-700 text-sm font-mono">
                    ₹{costResult.recommended_packaging.total_cost_inr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Savings & ROI Card */}
            <div className="zen-card p-6 border-amber-200 bg-amber-50/20 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
                  FINANCIAL ROI IMPACT
                </div>
                <div className="text-3xl font-heading font-black text-amber-600 mt-1 font-mono">
                  ₹{costResult.savings_analysis.cost_savings_inr.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Projected batch expenditure savings on this production run.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-amber-200 text-xs space-y-1.5 shadow-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Unit Delta:</span>
                  <span className="font-mono text-blue-700 font-bold">
                    ₹{costResult.savings_analysis.unit_cost_diff_inr.toFixed(2)} / unit
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Annualized (4 Runs):</span>
                  <span className="font-mono text-amber-700 font-bold">
                    ₹{(costResult.savings_analysis.cost_savings_inr * 4).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculatorPage;
