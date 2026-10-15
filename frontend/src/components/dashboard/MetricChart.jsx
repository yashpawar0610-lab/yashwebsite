import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { Calendar, Layers, Sparkles } from 'lucide-react';

const MetricChart = ({ chartData, timeframe, onTimeframeChange, loading }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const labels = chartData?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const series1 = chartData?.series?.[0]?.data || [40, 60, 55, 80, 70, 90, 85];
  const series2 = chartData?.series?.[1]?.data || [15, 25, 20, 35, 45, 30, 42];

  const maxVal = Math.max(...series1, ...series2, 100);
  const chartHeight = 220;
  const chartWidth = 600;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate coordinates for points
  const getCoordinates = (data) => {
    return data.map((val, idx) => {
      const x = paddingX + (idx / (data.length - 1)) * (chartWidth - paddingX * 2);
      const y = chartHeight - paddingY - (val / maxVal) * (chartHeight - paddingY * 2);
      return { x, y, val };
    });
  };

  const points1 = getCoordinates(series1);
  const points2 = getCoordinates(series2);

  // Generate SVG smooth path
  const generateCurvedPath = (points) => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const path1 = generateCurvedPath(points1);
  const path2 = generateCurvedPath(points2);

  // Area path for gradient fill
  const area1 = `${path1} L ${points1[points1.length - 1].x} ${chartHeight - paddingY} L ${points1[0].x} ${chartHeight - paddingY} Z`;

  return (
    <GlassCard style={{ padding: '24px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
              Operational Performance & Throughput
            </h3>
            <span
              className="glass-pill"
              style={{ fontSize: '0.7rem', color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)' }}
            >
              Real-time SVG Engine
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Comparative multi-stream latency vs. report generation density
          </p>
        </div>

        {/* Timeframe Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            background: 'var(--glass-surface-subtle)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid var(--glass-border)'
          }}
        >
          {['7d', '30d', '90d'].map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              style={{
                border: 'none',
                padding: '5px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: timeframe === tf ? 'var(--primary-gradient)' : 'transparent',
                color: timeframe === tf ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Responsive Container */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={chartWidth - paddingX}
                y2={y}
                stroke="var(--chart-grid)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Area fill */}
          <path d={area1} fill="url(#cyanGradient)" />

          {/* Series 2 (Purple) */}
          <path
            d={path2}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Series 1 (Cyan) */}
          <path
            d={path1}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowEffect)"
          />

          {/* Data Points on hover / active */}
          {points1.map((p, idx) => (
            <g
              key={idx}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={hoverIndex === idx ? 6 : 4}
                fill="#ffffff"
                stroke="#06b6d4"
                strokeWidth="2.5"
                style={{ transition: 'all 0.15s ease' }}
              />
              {/* X-axis labels */}
              <text
                x={p.x}
                y={chartHeight - 8}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-muted)"
              >
                {labels[idx]}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoverIndex !== null && points1[hoverIndex] && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: `${(points1[hoverIndex].x / chartWidth) * 100}%`,
              transform: 'translateX(-50%)',
              background: 'var(--glass-surface-hover)',
              border: '1px solid var(--glass-border-hover)',
              backdropFilter: 'blur(12px)',
              padding: '6px 12px',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              fontSize: '0.75rem',
              zIndex: 20
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
              {labels[hoverIndex]}
            </div>
            <div style={{ color: '#06b6d4' }}>
              Throughput: {series1[hoverIndex]} req/s
            </div>
            <div style={{ color: '#8b5cf6' }}>
              Output: {series2[hoverIndex]} reports
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4' }} />
          <span>System Throughput</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b5cf6' }} />
          <span>Report Synthesis</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default MetricChart;
