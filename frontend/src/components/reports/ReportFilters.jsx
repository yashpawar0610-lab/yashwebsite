import React from 'react';
import { Search, Filter, Layers } from 'lucide-react';

const categories = ['All', 'Financial', 'Operational', 'Marketing', 'System'];
const statuses = ['All', 'Completed', 'Processing', 'Draft', 'Archived'];

const ReportFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  totalResults
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports by title, keyword, or tag..."
            className="glass-input"
            style={{ paddingLeft: '38px', fontSize: '0.85rem' }}
          />
        </div>

        {/* Status Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="glass-input"
            style={{ width: 'auto', padding: '8px 12px', fontSize: '0.82rem', cursor: 'pointer' }}
          >
            {statuses.map((st) => (
              <option key={st} value={st} style={{ background: '#0f172a', color: '#fff' }}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Results Counter */}
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: 'var(--text-main)' }}>{totalResults}</strong> records
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginRight: '4px' }}>
          Category:
        </span>
        {categories.map((cat) => {
          const isSelected = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="glass-pill"
              style={{
                cursor: 'pointer',
                border: isSelected ? '1px solid var(--primary-accent)' : '1px solid var(--glass-border)',
                background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'var(--badge-bg)',
                color: isSelected ? 'var(--primary-accent)' : 'var(--text-secondary)',
                padding: '5px 12px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReportFilters;
