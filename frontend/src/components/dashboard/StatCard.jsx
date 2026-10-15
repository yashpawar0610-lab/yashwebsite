import React from 'react';
import GlassCard from '../common/GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  title,
  value,
  trend,
  isPositive = true,
  icon: Icon,
  accentColor = '#06b6d4',
  subtitle
}) => {
  return (
    <GlassCard
      interactive
      style={{
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient Corner Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: accentColor,
          opacity: 0.15,
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {title}
        </span>
        {Icon && (
          <div
            style={{
              padding: '8px',
              borderRadius: '10px',
              background: `rgba(${accentColor === '#06b6d4' ? '6, 182, 212' : '139, 92, 246'}, 0.12)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accentColor
            }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
        <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {value}
        </div>
        {trend && (
          <div
            className="glass-pill"
            style={{
              padding: '2px 8px',
              fontSize: '0.72rem',
              color: isPositive ? '#10b981' : '#ef4444',
              borderColor: isPositive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'
            }}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        )}
      </div>

      {subtitle && (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          {subtitle}
        </div>
      )}
    </GlassCard>
  );
};

export default StatCard;
