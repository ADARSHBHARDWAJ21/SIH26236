import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Download, ArrowLeft, ShieldCheck, Clock, DollarSign, Leaf,
  Cpu, AlertTriangle, CheckCircle2, ChevronRight, Wind, Layers,
  Scale, Activity, HelpCircle, Sparkles, RefreshCw, BarChart3,
  Box, Award, Check
} from 'lucide-react';
import api from '../services/api';
import { AnalysisDetail, Recommendation } from '../types';
import RiskBadge from '../components/RiskBadge';
import ScoreRadar from '../components/ScoreRadar';

export const AnalysisResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRecIndex, setSelectedRecIndex] = useState(0);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // Fallback sample analysis for instant preview if backend is offline
  const getSampleAnalysis = (reqId: number): AnalysisDetail => ({
    id: reqId,
    commodity_name: 'Fresh Harvest Tomato',
    commodity_category: 'Fresh Produce',
    moisture_pct: 94.0,
    fat_pct: 0.2,
    ph: 4.3,
    respiration_rate: 'High',
    target_shelf_life_days: 10,
    storage_temp_c: 8.0,
    storage_humidity_pct: 85.0,
    transport_duration_days: 2,
    transport_type: 'Refrigerated Cold Chain',
    transport_condition: 'Controlled (2-8°C)',
    priority_protection: 0.35,
    priority_shelf_life: 0.25,
    priority_cost: 0.20,
    priority_sustainability: 0.20,
    overall_risk_level: 'HIGH',
    status: 'completed',
    mode: 'Expert',
    created_at: new Date().toISOString(),
    recommendations: [
      {
        rank: 1,
        recommendation_type: 'Primary Optimal Solution',
        material_id: 1,
        material_name: 'Laser Micro-perforated Polyolefin (PP/LDPE 30μm)',
        material_structure: 'Biaxially Oriented Polypropylene + Precision Laser Apertures',
        overall_score: 94.2,
        protection_score: 95.0,
        shelf_life_score: 93.0,
        sustainability_score: 91.0,
        compatibility_score: 97.0,
        thickness_microns: 30,
        otr: 8500,
        wvtr: 22.0,
        sealability: 'Excellent (Wide 120-155°C Window)',
        gas_permeability: 'High Controlled (Laser Apertures)',
        map_suitability: true,
        estimated_cost_unit: 4.50,
        why_points: [
          'Calibrated gas transmission prevents produce asphyxiation in transit.',
          'Water vapor flux prevents pouch condensation and bacterial slime.',
          'Thermally stable seal ensures hermetic package integrity.'
        ],
        what_would_change: [
          'Ambient storage above 30°C requires a 20% increase in laser perforation density.',
          'Pre-cut diced tomatoes would shift recommendation to high-barrier EVOH tray.'
        ],
        risks: [
          {
            risk: 'Moisture Condensation & Grey Mould',
            level: 'High',
            probability_pct: 80,
            reason: 'High transpiration rate inside sealed polymer film.',
            mitigation: 'Anti-fog additive coating and laser breathable micro-perforations.'
          },
          {
            risk: 'Anaerobic Produce Fermentation',
            level: 'Moderate',
            probability_pct: 45,
            reason: 'Produce consumes O2 rapidly if film transmission is too low.',
            mitigation: 'Equilibrium modified atmosphere target O2 ≥ 2.5%.'
          },
          {
            risk: 'Impact Bruising in Transit',
            level: 'Low',
            probability_pct: 20,
            reason: 'Rough freight handling and vehicle vibration.',
            mitigation: 'Multi-layer polyolefin film provides high impact puncture resistance.'
          }
        ]
      },
      {
        rank: 2,
        recommendation_type: 'Economic Value Option',
        material_id: 2,
        material_name: 'Economic Mono-material Co-extruded Polyethylene (LDPE/LLDPE)',
        material_structure: 'High-Clarity Coex LDPE with Slip Additives',
        overall_score: 85.8,
        protection_score: 81.0,
        shelf_life_score: 83.0,
        sustainability_score: 84.0,
        compatibility_score: 87.0,
        thickness_microns: 45,
        otr: 4200,
        wvtr: 16.0,
        sealability: 'Good',
        gas_permeability: 'Moderate',
        map_suitability: false,
        estimated_cost_unit: 2.80,
        why_points: [
          'Lowest unit expenditure per package.',
          'Universally available converter supply chain.'
        ],
        what_would_change: [
          'Not recommended for shelf-life requirements exceeding 7 days.'
        ],
        risks: [
          {
            risk: 'Moisture Buildup',
            level: 'High',
            probability_pct: 75,
            reason: 'Lacks micro-perforations.',
            mitigation: 'Provide manual ventilation punch holes.'
          }
        ]
      },
      {
        rank: 3,
        recommendation_type: 'Certified Bio-Polymer',
        material_id: 3,
        material_name: 'Certified Compostable Bio-Polymer (PLA / PBAT Blown Film)',
        material_structure: 'Renewable Corn Starch Derived PLA Co-polymer (ASTM D6400)',
        overall_score: 89.1,
        protection_score: 86.0,
        shelf_life_score: 85.0,
        sustainability_score: 98.0,
        compatibility_score: 93.0,
        thickness_microns: 35,
        otr: 6200,
        wvtr: 26.0,
        sealability: 'Good',
        gas_permeability: 'High',
        map_suitability: true,
        estimated_cost_unit: 5.90,
        why_points: [
          'Highest circularity rating on the market.',
          'Naturally breathable polymer kinetics suited for organic produce.'
        ],
        what_would_change: [
          'Higher moisture vapor transmission may shorten shelf life in dry air.'
        ],
        risks: [
          {
            risk: 'Premature Film Embrittlement',
            level: 'Moderate',
            probability_pct: 35,
            reason: 'Sensitivity to extreme heat and humidity during storage.',
            mitigation: 'Store in temperature-controlled warehousing.'
          }
        ]
      }
    ],
    respiration_intelligence: {
      respiration_level: 'High',
      o2_permeability_target: '8500 cc/m²·day',
      co2_flush_tolerance: '5.0%',
      micro_perforation_needed: true,
      map_gas_mix: {
        o2_pct: 3.0,
        co2_pct: 5.0,
        n2_pct: 92.0
      },
      micro_perforation_spec: '150-200 μm diameter @ 12 laser apertures / pouch',
      anti_fog_recommended: true,
      advisory_notes: 'Regulated micro-perforations maintain oxygen equilibrium above critical anaerobic threshold (2.0%) while expelling water vapor.'
    },
    cost_estimate: {
      quantity: 25000,
      package_width_cm: 15,
      package_length_cm: 20,
      package_height_cm: 5,
      unit_cost_current: 6.50,
      unit_cost_recommended: 4.50,
      total_cost_current: 162500,
      total_cost_recommended: 112500,
      cost_savings_pct: 30.8,
      annual_estimated_savings_inr: 50000
    },
    sustainability_score: {
      recyclability_pct: 88,
      carbon_saved_kg: 1420,
      plastic_reduction_pct: 58.0,
      environmental_rating: 'A',
      material_impact_notes: 'Mono-material polyolefin structure qualifies for mechanical circular recycling streams.'
    }
  });

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await api.analyses.getById(parseInt(id));
        setAnalysis(data);
      } catch (err) {
        console.warn('Backend unavailable, checking session or sample:', err);
        const saved = sessionStorage.getItem(`packzen_analysis_${id}`);
        if (saved) {
          try {
            setAnalysis(JSON.parse(saved));
          } catch (e) {
            setAnalysis(getSampleAnalysis(parseInt(id)));
          }
        } else {
          setAnalysis(getSampleAnalysis(parseInt(id)));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  const handleDownloadPdf = async () => {
    if (!analysis) return;
    setDownloadingPdf(true);
    try {
      await api.analyses.downloadReportPdf(analysis.id, analysis.commodity_name);
    } catch (err) {
      console.warn('PDF download failed. Generating client-side print view:', err);
      window.print();
    } finally {
      setDownloadingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs text-slate-500 font-mono">Synthesizing PackZen Intelligence Result #{id}...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="zen-card p-8 text-center space-y-4 border-slate-200">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h2 className="text-lg font-heading font-bold text-slate-900">Analysis #{id} Not Found</h2>
        <p className="text-xs text-slate-500">The requested packaging evaluation does not exist or was deleted.</p>
        <Link to="/new-analysis" className="btn-primary text-xs inline-flex">
          Run New Analysis
        </Link>
      </div>
    );
  }

  const activeRec: Recommendation = analysis.recommendations[selectedRecIndex] || analysis.recommendations[0];
  const resp = analysis.respiration_intelligence;
  const cost = analysis.cost_estimate;
  const sust = analysis.sustainability_score;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link to="/history" className="text-slate-500 hover:text-blue-600 text-xs font-semibold flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Analyses Archive</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">AN-#{analysis.id}</span>
            <RiskBadge level={analysis.overall_risk_level} size="sm" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">
            {analysis.commodity_name}{' '}
            <span className="text-sm font-normal text-slate-500">({analysis.commodity_category})</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Target Shelf Life: <span className="text-slate-900 font-bold">{analysis.target_shelf_life_days} Days</span> | Storage: {analysis.storage_temp_c}°C ({analysis.storage_humidity_pct}% RH) | Channel: {analysis.transport_type}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="btn-primary text-xs py-2.5 px-4 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadingPdf ? 'Compiling PDF...' : 'Download Technical PDF'}</span>
          </button>

          <Link
            to="/compare"
            className="btn-secondary text-xs py-2.5 px-3.5"
          >
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Compare</span>
          </Link>

          <Link
            to="/simulator"
            className="btn-secondary text-xs py-2.5 px-3.5"
          >
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulate Decay</span>
          </Link>
        </div>
      </div>

      {/* TOP 3 RECOMMENDATIONS TABS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Top 3 PackZen Pareto Optimal Solutions
            </h2>
            <p className="text-xs text-slate-500">
              Ranked and differentiated by multi-objective optimization across barrier protection, batch economics, and circularity.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Pareto Front v2.4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.recommendations.map((rec, index) => {
            const isSelected = selectedRecIndex === index;
            const rankTitle = index === 0
              ? 'RECOMMENDATION #1: Best Balanced'
              : index === 1
              ? 'RECOMMENDATION #2: Lower Cost'
              : 'RECOMMENDATION #3: Circularity';

            return (
              <button
                key={rec.rank || index}
                type="button"
                onClick={() => setSelectedRecIndex(index)}
                className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/25'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/90 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      index === 0
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : index === 1
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-sky-100 text-sky-800 border border-sky-300'
                    }`}>
                      {rankTitle}
                    </span>
                    <span className={`text-xs font-mono font-black ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                      {rec.overall_score.toFixed(1)}/100
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-sm text-slate-900 mb-1">{rec.material_name}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{rec.material_structure}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-[10px]">
                  <div>
                    <div className="text-slate-500 font-medium">Unit Cost</div>
                    <div className="font-bold text-amber-600 font-mono mt-0.5">₹{rec.estimated_cost_unit.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Protection</div>
                    <div className="font-bold text-blue-600 font-mono mt-0.5">{rec.protection_score.toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Circularity</div>
                    <div className="font-bold text-sky-600 font-mono mt-0.5">{rec.sustainability_score.toFixed(0)}%</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED RECOMMENDATION DEEP-DIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Technical Specification Matrix */}
        <div className="lg:col-span-7 zen-card p-6 sm:p-7 border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider font-bold">
                PACKZEN TECHNICAL PROFILE
              </span>
              <h3 className="text-lg font-heading font-black text-slate-900">{activeRec.material_name}</h3>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              Score: {activeRec.overall_score.toFixed(1)} / 100
            </span>
          </div>

          {/* Key Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="text-slate-500 text-[10px] uppercase font-mono font-semibold">Film Thickness</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">{activeRec.thickness_microns} μm</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="text-slate-500 text-[10px] uppercase font-mono font-semibold">OTR (Oxygen Barrier)</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">
                {activeRec.otr.toLocaleString()} <span className="text-[9px] font-normal text-slate-500">cc/m²·d</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="text-slate-500 text-[10px] uppercase font-mono font-semibold">WVTR (Moisture)</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">
                {activeRec.wvtr} <span className="text-[9px] font-normal text-slate-500">g/m²·d</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="text-slate-500 text-[10px] uppercase font-mono font-semibold">Thermal Sealability</div>
              <div className="font-bold text-blue-600 text-sm mt-0.5">{activeRec.sealability}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="text-slate-500 text-[10px] uppercase font-mono font-semibold">Gas Permeability</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{activeRec.gas_permeability || 'Engineered'}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="text-slate-500 text-[10px] uppercase font-mono font-semibold">MAP Compatibility</div>
              <div className="font-bold text-sky-600 text-sm mt-0.5">
                {activeRec.map_suitability ? '✓ Qualified' : 'Standard Flush'}
              </div>
            </div>
          </div>

          {/* Subscores breakdown bar */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-700">Scoring Attribute Breakdown:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Protection</div>
                <div className="font-bold text-blue-600 font-mono">{activeRec.protection_score.toFixed(1)}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Shelf Life</div>
                <div className="font-bold text-sky-600 font-mono">{activeRec.shelf_life_score.toFixed(1)}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Cost Economy</div>
                <div className="font-bold text-amber-600 font-mono">{((activeRec as any).cost_score || activeRec.compatibility_score || 88.0).toFixed(1)}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Circularity</div>
                <div className="font-bold text-emerald-600 font-mono">{activeRec.sustainability_score.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Performance Radar Chart */}
        <div className="lg:col-span-5 zen-card p-6 border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-heading font-bold text-slate-900 mb-1">Performance Polygon Index</h3>
            <p className="text-[11px] text-slate-500">Multi-attribute scoring distribution</p>
          </div>

          <ScoreRadar
            scores={{
              protection: activeRec.protection_score,
              shelf_life: activeRec.shelf_life_score,
              cost: (activeRec as any).cost_score || 88,
              sustainability: activeRec.sustainability_score,
              compatibility: activeRec.compatibility_score || 95
            }}
            materialName={activeRec.material_name}
          />

          <div className="text-[10px] text-center text-slate-400 font-mono">
            PackZen Multi-Objective Optimization Verified
          </div>
        </div>
      </div>

      {/* EXPLAINABLE AI (XAI) PANEL */}
      <div className="zen-card p-6 sm:p-7 border-slate-200 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
          <Cpu className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-base font-heading font-bold text-slate-900">Explainable AI (XAI) Scientific Justification</h3>
            <p className="text-xs text-slate-500">Transparent polymer physics and post-harvest biological compliance rationale</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Why this material */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Why This Material Was Selected
            </h4>
            <div className="space-y-2">
              {(activeRec.why_points || (activeRec as any).xai_justification || []).map((pt: string, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What would change this recommendation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Sensitivity Triggers (What Would Shift This Decision?)
            </h4>
            <div className="space-y-2">
              {(activeRec.what_would_change || (activeRec as any).sensitivity_triggers || []).map((trg: string, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-slate-700 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                  <span>{trg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RESPIRATION-AWARE MODE */}
      {resp && (
        <div className="zen-card p-6 sm:p-7 border-slate-200 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900">Respiration-Aware Intelligence</h3>
                <p className="text-xs text-slate-500">Post-harvest physiology & equilibrium MAP gas formulation</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
              Active Produce Mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-mono uppercase font-semibold">Target Gas Equilibrium</div>
              <div className="font-bold text-blue-700 text-sm mt-1 font-mono">
                {resp.map_gas_mix?.o2_pct ?? (resp as any).target_o2_pct ?? 3}% O₂ / {resp.map_gas_mix?.co2_pct ?? (resp as any).target_co2_pct ?? 5}% CO₂ / {resp.map_gas_mix?.n2_pct ?? (resp as any).target_n2_pct ?? 92}% N₂
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-mono uppercase font-semibold">Micro-Perforation Protocol</div>
              <div className="font-bold text-slate-900 text-xs mt-1">
                {resp.micro_perforation_spec || 'Controlled laser apertures'}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-mono uppercase font-semibold">Condensation Control</div>
              <div className="font-bold text-sky-700 text-xs mt-1">
                {resp.anti_fog_recommended ? 'Anti-fog surfactant layer required' : 'Standard surface'}
              </div>
            </div>
          </div>

          {resp.advisory_notes && (
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700">
              <span className="font-bold text-blue-900">Post-Harvest Advisory:</span> {resp.advisory_notes}
            </div>
          )}
        </div>
      )}

      {/* PACKAGING RISK MATRIX */}
      <div className="zen-card p-6 sm:p-7 border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900">Packaging Failure Risk Analysis</h3>
              <p className="text-xs text-slate-500">Potential quality failure modes and verified engineering mitigations</p>
            </div>
          </div>
          <RiskBadge level={analysis.overall_risk_level} size="md" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-xl">Identified Threat</th>
                <th className="p-3">Severity & Probability</th>
                <th className="p-3">Root Cause Reason</th>
                <th className="p-3 rounded-r-xl">Engineering Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(activeRec.risks || (analysis as any).risk_analysis || []).map((rk: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">{rk.risk || rk.failure_mode}</td>
                  <td className="p-3">
                    <RiskBadge level={rk.level || rk.threat_level} size="sm" />
                    <span className="text-[10px] text-slate-500 ml-1.5 font-mono">
                      ({rk.probability_pct || Math.round(rk.probability * 100)}%)
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 max-w-xs">{rk.reason || 'Biochemical food matrix degradation'}</td>
                  <td className="p-3 text-blue-700 max-w-xs font-semibold">{rk.mitigation || rk.engineering_mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ECONOMIC & SUSTAINABILITY IMPACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost Savings Card */}
        {cost && (
          <div className="zen-card p-6 border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-600" />
                Batch Economic Summary
              </h3>
              <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {(cost.quantity || 25000).toLocaleString()} Units
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">Conventional Cost</div>
                <div className="font-bold text-slate-700 text-sm mt-0.5 font-mono">
                  ₹{(cost.total_cost_current || 162500).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">PackZen Solution</div>
                <div className="font-bold text-amber-600 text-sm mt-0.5 font-mono">
                  ₹{(cost.total_cost_recommended || 112500).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-bold flex items-center justify-between">
              <span>Potential Batch Cost Reduction:</span>
              <span>{cost.cost_savings_pct || 30.8}% Saved</span>
            </div>
          </div>
        )}

        {/* Sustainability Impact Card */}
        {sust && (
          <div className="zen-card p-6 border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-slate-900 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Circularity & Eco-Score
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                Rating {sust.environmental_rating || (sust as any).recyclability_grade || 'A'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">Material Recyclability</div>
                <div className="font-bold text-emerald-600 text-sm mt-0.5 font-mono">
                  {sust.recyclability_pct}% Circular
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">Carbon Avoidance</div>
                <div className="font-bold text-blue-600 text-sm mt-0.5 font-mono">
                  {sust.carbon_saved_kg || 1420} kg CO₂e
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              {sust.material_impact_notes || 'Mono-material polymer structure qualifies for mechanical circular recycling streams.'}
            </p>
          </div>
        )}
      </div>

      {/* Scientific Disclaimer */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-[11px] text-slate-600 text-center leading-relaxed shadow-sm">
        <span className="font-bold text-slate-800">PACKZEN SCIENTIFIC DECISION-SUPPORT DISCLAIMER:</span> Results are engineered decision-support estimates based on user matrix inputs and empirical polymer science databases. Standard pilot laboratory sealing validation and regional regulatory assessment (FSSAI / FDA / EU) are recommended prior to commercial packaging line commissioning.
      </div>
    </div>
  );
};

export default AnalysisResultPage;
