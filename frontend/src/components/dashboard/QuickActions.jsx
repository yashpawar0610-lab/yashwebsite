import React from 'react';
import GlassCard from '../common/GlassCard';
import { PlusCircle, FileText, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

const QuickActions = ({ onOpenCreateModal, onNavigateReports, onRefreshStats, isRefreshing }) => {
  return (
    <GlassCard style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Zap size={18} color="#f59e0b" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
          Operator Quick Actions
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px'
        }}
      >
        <button
          onClick={onOpenCreateModal}
          className="btn btn-primary"
          style={{ padding: '10px', fontSize: '0.8rem', borderRadius: '12px' }}
        >
          <PlusCircle size={15} />
          New Report
        </button>

        <button
          onClick={onNavigateReports}
          className="btn-glass"
          style={{ padding: '10px', fontSize: '0.8rem', borderRadius: '12px', justifyContent: 'center' }}
        >
          <FileText size={15} color="#06b6d4" />
          View All Data
        </button>

        <button
          onClick={onRefreshStats}
          disabled={isRefreshing}
          className="btn-glass"
          style={{ padding: '10px', fontSize: '0.8rem', borderRadius: '12px', justifyContent: 'center' }}
        >
          <RefreshCw size={15} color="#10b981" className={isRefreshing ? 'spin-icon' : ''} />
          {isRefreshing ? 'Syncing...' : 'Sync Telemetry'}
        </button>
      </div>
    </GlassCard>
  );
};

export default QuickActions;
