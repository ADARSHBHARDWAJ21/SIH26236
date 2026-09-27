import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, AlertCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const norm = level ? level.toUpperCase() : 'LOW';

  let bgClass = 'bg-blue-50 text-blue-700 border-blue-200';
  let Icon = CheckCircle;

  if (norm === 'HIGH') {
    bgClass = 'bg-rose-50 text-rose-700 border-rose-200';
    Icon = ShieldAlert;
  } else if (norm === 'MODERATE' || norm === 'MEDIUM') {
    bgClass = 'bg-amber-50 text-amber-700 border-amber-200';
    Icon = AlertTriangle;
  }

  const sizeClass = {
    sm: 'text-[10px] px-2 py-0.5 rounded-lg gap-1 font-mono',
    md: 'text-xs px-2.5 py-1 rounded-xl gap-1.5 font-medium font-mono',
    lg: 'text-sm px-3.5 py-1.5 rounded-xl gap-2 font-semibold font-mono',
  }[size];

  return (
    <span className={`inline-flex items-center border ${bgClass} ${sizeClass} tracking-wide backdrop-blur-md`}>
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{norm} RISK</span>
    </span>
  );
};

export default RiskBadge;

