import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

interface ScoreRadarProps {
  scores: {
    protection: number;
    shelf_life: number;
    cost: number;
    sustainability: number;
    compatibility: number;
  };
  materialName?: string;
}

export const ScoreRadar: React.FC<ScoreRadarProps> = ({ scores, materialName = 'Material' }) => {
  const data = [
    { subject: 'Barrier Protection', score: scores.protection, fullMark: 100 },
    { subject: 'Shelf Life', score: scores.shelf_life, fullMark: 100 },
    { subject: 'Cost Economy', score: scores.cost, fullMark: 100 },
    { subject: 'Circularity', score: scores.sustainability, fullMark: 100 },
    { subject: 'Matrix Compatibility', score: scores.compatibility, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" tick={{ fill: '#2563EB', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 600 }} />
          <Radar
            name={materialName}
            dataKey="score"
            stroke="#2563EB"
            fill="#3B82F6"
            fillOpacity={0.28}
            strokeWidth={2.5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#BFDBFE',
              borderRadius: '12px',
              color: '#0F172A',
              fontSize: '11px',
              fontWeight: 600,
              boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.15)'
            }}
            formatter={(value: any) => [`${value}/100`, 'Zen Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreRadar;

