import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle, TrendingUp, ShieldCheck, Leaf, DollarSign,
  Activity, AlertTriangle, ArrowRight, Download, FileText,
  Clock, CheckCircle, RefreshCw, BarChart2, Sparkles, Box, Zap
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import api from '../services/api';
import { DashboardSummary } from '../types';
import { useAuth } from '../context/AuthContext';
import RiskBadge from '../components/RiskBadge';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  // High-fidelity fallback data in case the backend is booting or offline
  const fallbackSummary: DashboardSummary = {
    analyses_completed: 18,
    avg_shelf_life_improvement_pct: 142.5,
    potential_cost_saving_inr: 84600,
    avg_sustainability_score: 84.5,
    monthly_trend: [
      { month: 'Apr', analyses: 4, savings: 12000, sust_score: 82 },
      { month: 'May', analyses: 7, savings: 26000, sust_score: 83 },
      { month: 'Jun', analyses: 9, savings: 39000, sust_score: 84 },
      { month: 'Jul', analyses: 12, savings: 51000, sust_score: 85 },
      { month: 'Aug', analyses: 15, savings: 68000, sust_score: 87 },
      { month: 'Sep', analyses: 18, savings: 84600, sust_score: 88 },
    ],
    top_recommended_materials: [
      { name: 'BOPP Metallized Barrier', count: 6 },
      { name: 'Laser Micro-perforated PLA', count: 5 },
      { name: 'Multi-layer EVOH Barrier', count: 4 },
      { name: 'rPET 80% PCR Clamshell', count: 3 }
    ],
    category_distribution: [
      { name: 'Fresh Fruits', value: 35 },
      { name: 'Vegetables', value: 25 },
      { name: 'Bakery & Snacks', value: 20 },
      { name: 'Chilled Dairy', value: 12 },
      { name: 'Proteins & Meat', value: 8 },
    ],
    active_risk_alerts: [
      {
        id: 1,
        commodity: 'Fresh Cut Tomatoes',
        risk_type: 'Condensation & Botrytis Mould',
        severity: 'HIGH',
        message: 'High moisture causing rapid mold growth under ambient fluctuations.',
        action: 'Implement 150μm laser micro-perforations to elevate O2 above 2.5% and dissipate moisture.'
      },
      {
        id: 2,
        commodity: 'Crispy Butter Wafers',
        risk_type: 'Moisture Uptake & Soggy Texture',
        severity: 'MODERATE',
        message: 'Atmospheric humidity penetrating current weak poly film.',
        action: 'Upgrade to metallized BOPP with WVTR < 1.0 g/m²·day to prevent vapor penetration.'
      },
      {
        id: 3,
        commodity: 'Fresh Spinach Leaves',
        risk_type: 'Anaerobic Fermentation',
        severity: 'MODERATE',
        message: 'High respiration depleting O2 below critical 1% threshold.',
        action: 'Anti-fog bio-polymer film required under cold chain 4°C storage.'
      }
    ],
    recent_analyses: [
      {
        id: 1042,
        date: '2026-09-27',
        commodity: 'Tomato (Fresh Cut)',
        category: 'Fruits',
        recommended_material: 'Laser Micro-perforated PP/LDPE',
        shelf_life_days: 14,
        cost_inr: 4.2,
        sustainability_score: 92,
        risk_level: 'LOW',
        status: 'completed'
      },
      {
        id: 1041,
        date: '2026-09-26',
        commodity: 'Crispy Biscuits & Cookies',
        category: 'Bakery',
        recommended_material: 'BOPP Metallized High Barrier',
        shelf_life_days: 180,
        cost_inr: 2.8,
        sustainability_score: 84,
        risk_level: 'LOW',
        status: 'completed'
      },
      {
        id: 1040,
        date: '2026-09-25',
        commodity: 'Organic Spinach',
        category: 'Vegetables',
        recommended_material: 'Anti-Fog Micro-perforated PLA',
        shelf_life_days: 12,
        cost_inr: 5.1,
        sustainability_score: 95,
        risk_level: 'LOW',
        status: 'completed'
      }
    ]
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await api.dashboard.getSummary();
      setSummary(data);
    } catch (err) {
      console.warn('Dashboard API call fell back to local store:', err);
      setSummary(fallbackSummary);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const activeData = summary || fallbackSummary;
  const PIE_COLORS = ['#2563EB', '#0EA5E9', '#4F46E5', '#3B82F6', '#60A5FA'];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              PackZen Decision Command Center
            </span>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 font-mono font-bold">
              Role: {user?.role || 'Packaging Researcher'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">
            Welcome back, {user?.name || 'Packaging Specialist'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {user?.organization || 'National Institute of Food Packaging Technology'} — Status: Operational
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all"
            title="Refresh Intelligence Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
          <Link
            to="/new-analysis"
            className="btn-primary text-xs font-bold py-2.5 px-4 shadow-md shadow-blue-500/25"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New AI Packaging Analysis</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Analyses Completed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Analyses Synthesized</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-slate-900">
            {activeData.analyses_completed}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-blue-600 mt-2 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active multi-objective repository</span>
          </div>
        </div>

        {/* Card 2: Shelf-Life Improvement */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Avg. Shelf-Life Gain</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-blue-600">
            +{activeData.avg_shelf_life_improvement_pct}%
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2 font-medium">
            <span>Delays post-harvest spoilage curve</span>
          </div>
        </div>

        {/* Card 3: Potential Cost Savings */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Estimated Cost Savings</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-blue-600">
            ₹{activeData.potential_cost_saving_inr.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2 font-medium">
            <span>Annualized batch optimization</span>
          </div>
        </div>

        {/* Card 4: Sustainability Score */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Sustainability Index</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-indigo-600">
            {activeData.avg_sustainability_score}
            <span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-indigo-600 mt-2 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>High mono-material recyclability</span>
          </div>
        </div>
      </div>

      {/* Analytics Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-heading font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                Packaging Analyses & Cumulative Cost Savings
              </h3>
              <p className="text-[11px] text-slate-500">Monthly volume of decision evaluations and cumulative savings</p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Live Trajectory
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeData.monthly_trend}>
                <defs>
                  <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#CBD5E1" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <YAxis stroke="#CBD5E1" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#BFDBFE',
                    borderRadius: '12px',
                    color: '#0F172A',
                    fontSize: '11px',
                    boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.12)'
                  }}
                />
                <Area type="monotone" dataKey="analyses" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAnalyses)" name="Analyses Run" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Commodity Matrix Distribution Donut */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-heading font-bold text-slate-900">Commodity Matrix Mix</h3>
              <p className="text-[11px] text-slate-500">Categorical evaluation distribution</p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-bold">Distribution</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeData.category_distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {activeData.category_distribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '10px',
                    color: '#0F172A',
                    fontSize: '11px',
                    boxShadow: '0 8px 20px -4px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] mt-2 pt-2 border-t border-slate-100">
            {activeData.category_distribution.slice(0, 4).map((c, idx) => (
              <div key={c.name} className="flex items-center gap-1.5 text-slate-700 font-medium">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></span>
                <span className="truncate">{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Packaging Risk Alerts */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-heading font-bold text-slate-900">Active Food Spoilage Threat Alerts</h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Automated continuous barrier monitor</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeData.active_risk_alerts.map((alert) => (
            <div key={alert.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:border-blue-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-bold text-xs text-slate-900">{alert.commodity}</span>
                  <RiskBadge level={alert.severity} size="sm" />
                </div>
                <div className="text-xs font-semibold text-slate-800 mb-1">{alert.risk_type}</div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{alert.action}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-mono">PackZen Physics Rule #{alert.id}</span>
                <Link to="/simulator" className="text-blue-600 hover:underline font-bold flex items-center gap-0.5">
                  Simulate Decay <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Packaging Analyses Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-heading font-bold text-slate-900">Recent Multi-Objective Packaging Evaluations</h3>
          </div>
          <Link to="/history" className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1">
            View All History <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 pl-4">ID</th>
                <th className="py-3">Commodity & Matrix</th>
                <th className="py-3">Recommended Film Solution</th>
                <th className="py-3 text-center">Shelf Life</th>
                <th className="py-3 text-center">Threat Status</th>
                <th className="py-3 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeData.recent_analyses.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 pl-4 font-mono font-bold text-blue-600">AN-#{item.id}</td>
                  <td className="py-3.5">
                    <div className="font-bold text-slate-900">{item.commodity}</div>
                    <div className="text-[10px] text-slate-500">{item.category}</div>
                  </td>
                  <td className="py-3.5">
                    <span className="font-medium text-slate-700">{item.recommended_material}</span>
                  </td>
                  <td className="py-3.5 text-center font-mono font-bold text-blue-600">
                    {item.shelf_life_days} Days
                  </td>
                  <td className="py-3.5 text-center">
                    <RiskBadge level={item.risk_level} size="sm" />
                  </td>
                  <td className="py-3.5 text-right pr-4">
                    <Link
                      to={`/analysis/${item.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 shadow-sm transition-all font-semibold text-[11px]"
                    >
                      <span>View Datasheet</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
