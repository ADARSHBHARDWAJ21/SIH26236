import React, { useState, useEffect } from 'react';
import {
  Activity, Thermometer, Droplets, Clock, AlertTriangle,
  RefreshCw, TrendingUp, ShieldCheck, Sparkles, HelpCircle, Info, Zap
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Legend
} from 'recharts';
import api from '../services/api';
import { SimulationResult } from '../types';

export const ShelfLifeSimulatorPage: React.FC = () => {
  const [commodityName, setCommodityName] = useState('Fresh Harvest Tomato');
  const [temperature, setTemperature] = useState(10.0);
  const [humidity, setHumidity] = useState(85.0);
  const [targetDays, setTargetDays] = useState(21);
  const [respirationRate, setRespirationRate] = useState('High');
  const [fatPct, setFatPct] = useState(0.2);
  const [moisturePct, setMoisturePct] = useState(94.0);

  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Instant physics-based client calculation fallback for 0-latency interactive slider response
  const computeKineticSimulation = (): SimulationResult => {
    const tempFactor = Math.pow(2.0, (temperature - 10) / 10);
    const humidityFactor = 1 + (humidity - 50) / 120;
    const respFactor = respirationRate === 'Very High' ? 2.2 : respirationRate === 'High' ? 1.6 : respirationRate === 'Medium' ? 1.2 : 0.8;

    // Decay rate constants
    const kBaseline = 0.085 * tempFactor * humidityFactor * respFactor;
    const kOptimized = 0.028 * (1 + (tempFactor - 1) * 0.45) * (1 + (humidityFactor - 1) * 0.3) * (1 + (respFactor - 1) * 0.35);

    const curveData = [];
    let baselineDaysTo60 = targetDays;
    let optimizedDaysTo60 = targetDays;
    let foundBase = false;
    let foundOpt = false;

    for (let day = 0; day <= targetDays; day++) {
      const qBase = Math.max(5, Math.round(100 * Math.exp(-kBaseline * day) * 10) / 10);
      const qOpt = Math.max(10, Math.round(100 * Math.exp(-kOptimized * day) * 10) / 10);

      if (!foundBase && qBase < 60) {
        baselineDaysTo60 = day;
        foundBase = true;
      }
      if (!foundOpt && qOpt < 60) {
        optimizedDaysTo60 = day;
        foundOpt = true;
      }

      curveData.push({
        day,
        current_quality_pct: qBase,
        recommended_quality_pct: qOpt,
        spoilage_threshold: 60,
        current_microbial_log: +(3.0 + (100 - qBase) * 0.05).toFixed(1),
        recommended_microbial_log: +(3.0 + (100 - qOpt) * 0.03).toFixed(1)
      });
    }

    if (!foundBase) baselineDaysTo60 = targetDays;
    if (!foundOpt) optimizedDaysTo60 = Math.round(targetDays * 1.65);

    const extensionPct = Math.round(((optimizedDaysTo60 - baselineDaysTo60) / Math.max(1, baselineDaysTo60)) * 100);

    return {
      current_shelf_life_days: Math.max(3, baselineDaysTo60),
      recommended_shelf_life_days: Math.max(7, optimizedDaysTo60),
      shelf_life_extension_pct: Math.max(40, extensionPct),
      primary_failure_mode: respirationRate === 'High' || respirationRate === 'Very High'
        ? 'Moisture Transpiration & Anaerobic Rot Risk'
        : moisturePct < 10
        ? 'Water Vapor Ingress & Crispness Loss'
        : 'Microbial Spoilage & Aerobic Mold Growth',
      days: curveData,
      simulation_notes: `Kinetic quality retention modelled using Arrhenius spoilage dynamics at ${temperature}°C & ${humidity}% RH. PackZen bio-barrier dampens decay kinetics by ${(kBaseline / kOptimized).toFixed(1)}x.`
    };
  };

  const runSimulation = async () => {
    // Immediate local computation for buttery smooth sliders
    const localResult = computeKineticSimulation();
    setSimulation(localResult);

    try {
      const res = await api.simulation.run({
        commodity_name: commodityName,
        temperature_c: temperature,
        humidity_pct: humidity,
        target_days: targetDays,
        moisture_pct: moisturePct,
        fat_pct: fatPct,
        respiration_rate: respirationRate
      });
      if (res && res.days && res.days.length > 0) {
        setSimulation(res);
      }
    } catch (err) {
      // Local result already active, smoothly continue
    }
  };

  useEffect(() => {
    runSimulation();
  }, [temperature, humidity, targetDays, respirationRate, commodityName]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Kinetic Spoilage & Biochemical Modelling
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 flex items-center gap-2.5">
            <Activity className="w-7 h-7 text-blue-600" />
            PackZen Shelf-Life Degradation Simulator
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Simulate dynamic food quality decay kinetics $Q(t) = 100 \cdot e^{'{'}-kt{'}'}$ under variable ambient conditions.
          </p>
        </div>

        {/* Disclaimer Badge */}
        <div className="text-[11px] px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-2 font-mono font-semibold self-start sm:self-auto">
          <AlertTriangle className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive Kinetic Simulator</span>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="zen-card p-6 border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span>Ambient Variable Controls</span>
            <span className="text-slate-500 font-normal lowercase">(live reactive decay curves)</span>
          </div>
          <div className="text-[11px] text-blue-700 font-mono flex items-center gap-1 font-semibold">
            <Zap className="w-3 h-3 text-blue-600" />
            Instant Arrhenius Physics Enabled
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Temperature Slider */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                Storage Temp (°C)
              </label>
              <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="0"
              max="45"
              step="1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-rose-500"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
              <span>0°C (Chilled)</span>
              <span>22°C (Room)</span>
              <span>45°C (Extreme)</span>
            </div>
          </div>

          {/* Humidity Slider */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                Ambient Humidity (% RH)
              </label>
              <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{humidity}% RH</span>
            </div>
            <input
              type="range"
              min="20"
              max="98"
              step="1"
              value={humidity}
              onChange={(e) => setHumidity(parseFloat(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
              <span>20% (Dry)</span>
              <span>65% (Normal)</span>
              <span>98% (Saturated)</span>
            </div>
          </div>

          {/* Target Days Slider */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Horizon Days
              </label>
              <span className="text-xs font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">{targetDays} Days</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={targetDays}
              onChange={(e) => setTargetDays(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
              <span>5d</span>
              <span>30d</span>
              <span>60d</span>
            </div>
          </div>

          {/* Respiration Preset */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Crop Respiration Intensity
            </label>
            <select
              value={respirationRate}
              onChange={(e) => setRespirationRate(e.target.value)}
              className="w-full zen-input text-xs py-2 bg-white"
            >
              <option value="None">None (Dry / Processed)</option>
              <option value="Low">Low (Apples, Citrus)</option>
              <option value="High">High (Tomatoes, Berries)</option>
              <option value="Very High">Very High (Spinach, Greens)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SIMULATION RESULTS & CHARTS */}
      {simulation && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Quality Curve Chart */}
          <div className="lg:col-span-8 zen-card p-6 border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-heading font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Sensory Quality Decay Curve $Q(t) = 100 \cdot e^{'{'}-kt{'}'}$
                </h3>
                <p className="text-[11px] text-slate-500">
                  Conventional Unprotected Pouch vs PackZen Multi-Barrier Optimization
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-rose-600 font-mono font-medium">
                  <span className="w-3 h-0.5 bg-rose-500"></span>
                  Baseline ({simulation.current_shelf_life_days}d)
                </span>
                <span className="flex items-center gap-1.5 text-blue-700 font-bold font-mono">
                  <span className="w-3 h-0.5 bg-blue-600"></span>
                  PackZen ({simulation.recommended_shelf_life_days}d)
                </span>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulation.days}>
                  <XAxis
                    dataKey="day"
                    stroke="#CBD5E1"
                    tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                    label={{ value: 'Storage Duration (Days)', position: 'insideBottomRight', offset: -5, fill: '#64748B', fontSize: 10 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="#CBD5E1"
                    tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                    label={{ value: 'Sensory Quality Index (%)', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#BFDBFE',
                      borderRadius: '12px',
                      color: '#0F172A',
                      fontSize: '11px',
                      boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.15)'
                    }}
                    formatter={(value: any, name: any) => [
                      `${value}%`,
                      name === 'current_quality_pct' ? 'Conventional Packaging' : 'PackZen Optimized Solution'
                    ]}
                  />
                  <ReferenceLine
                    y={60}
                    stroke="#F59E0B"
                    strokeDasharray="4 4"
                    label={{ value: 'Critical Spoilage Limit (60% QDI)', fill: '#D97706', fontSize: 10, position: 'top' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="current_quality_pct"
                    stroke="#F43F5E"
                    strokeWidth={2}
                    dot={false}
                    name="current_quality_pct"
                  />
                  <Line
                    type="monotone"
                    dataKey="recommended_quality_pct"
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={false}
                    name="recommended_quality_pct"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Diagnostic Metrics */}
          <div className="lg:col-span-4 space-y-4">
            {/* Shelf-life extension banner */}
            <div className="zen-card p-6 border-blue-200 bg-blue-50/40 space-y-3 shadow-sm relative overflow-hidden">
              <span className="text-[10px] font-mono text-blue-700 uppercase tracking-wider font-bold">
                PREDICTED SHELF-LIFE OUTCOME
              </span>
              <div className="text-3xl font-heading font-black text-slate-900">
                +{simulation.shelf_life_extension_pct}%{' '}
                <span className="text-xs font-normal text-blue-600 font-sans font-bold">Prolongation</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-500 text-[10px] font-mono">Unprotected Pack</div>
                  <div className="font-bold text-rose-600 text-sm mt-0.5 font-mono">{simulation.current_shelf_life_days} Days</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-blue-200">
                  <div className="text-slate-500 text-[10px] font-mono">PackZen Solution</div>
                  <div className="font-bold text-blue-600 text-sm mt-0.5 font-mono">{simulation.recommended_shelf_life_days} Days</div>
                </div>
              </div>
            </div>

            {/* Failure Mode Card */}
            <div className="zen-card p-6 border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Primary Food Spoilage Threat
              </div>
              <p className="text-xs text-slate-900 leading-relaxed font-bold">
                {simulation.primary_failure_mode}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                {simulation.simulation_notes}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelfLifeSimulatorPage;
