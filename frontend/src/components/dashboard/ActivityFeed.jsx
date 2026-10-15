import React from 'react';
import GlassCard from '../common/GlassCard';
import { Activity, CheckCircle, AlertTriangle, Info, Clock, ShieldAlert } from 'lucide-react';

const ActivityFeed = ({ activities = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={15} color="#10b981" />;
      case 'warning':
        return <AlertTriangle size={15} color="#f59e0b" />;
      case 'danger':
        return <ShieldAlert size={15} color="#ef4444" />;
      default:
        return <Info size={15} color="#38bdf8" />;
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return 'Just now';
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <GlassCard style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#06b6d4" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
            Live Security & Audit Feed
          </h3>
        </div>
        <span className="glass-pill" style={{ fontSize: '0.68rem', color: '#10b981' }}>
          Real-time
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1 }}>
        {activities.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No recent activity logged.
          </div>
        ) : (
          activities.map((item, idx) => (
            <div
              key={item._id || idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '12px',
                background: 'var(--glass-surface-subtle)',
                border: '1px solid var(--glass-border)',
                transition: 'all 0.2s ease'
              }}
            >
              <div
                style={{
                  padding: '6px',
                  borderRadius: '8px',
                  background: 'var(--glass-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px'
                }}
              >
                {getIcon(item.type)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {item.action}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={11} />
                    {formatTime(item.timestamp || item.createdAt)}
                  </span>
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: '3px 0 0 0', lineHeight: 1.4 }}>
                  {item.details}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--primary-accent)', fontWeight: 500 }}>
                    {item.userName || 'System'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
};

export default ActivityFeed;
