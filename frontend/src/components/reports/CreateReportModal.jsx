import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Plus, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';

const CreateReportModal = ({ isOpen, onClose, onCreateSuccess }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Operational');
  const [status, setStatus] = useState('Completed');
  const [summary, setSummary] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [metrics, setMetrics] = useState([
    { key: 'efficiency', val: '98.2%' },
    { key: 'throughput', val: '2,400 req/s' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddMetric = () => {
    setMetrics([...metrics, { key: '', val: '' }]);
  };

  const handleMetricChange = (index, field, value) => {
    const updated = [...metrics];
    updated[index][field] = value;
    setMetrics(updated);
  };

  const handleRemoveMetric = (index) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a report title');
      return;
    }

    setLoading(true);
    setError('');

    // Transform metric array into object
    const metricsObj = {};
    metrics.forEach((m) => {
      if (m.key.trim()) {
        metricsObj[m.key.trim()] = m.val.trim();
      }
    });

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      await onCreateSuccess({
        title,
        category,
        status,
        summary,
        tags,
        metrics: metricsObj
      });
      onClose();
      // Reset form
      setTitle('');
      setSummary('');
      setTagsInput('');
    } catch (err) {
      setError(err.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Synthesize New Report" maxWidth="620px">
      {error && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            fontSize: '0.82rem',
            marginBottom: '16px'
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Report Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Q4 Multi-Cloud Resilience & Throughput Synthesis"
            className="glass-input"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass-input"
              style={{ cursor: 'pointer' }}
            >
              <option value="Financial" style={{ background: '#0f172a', color: '#fff' }}>Financial</option>
              <option value="Operational" style={{ background: '#0f172a', color: '#fff' }}>Operational</option>
              <option value="Marketing" style={{ background: '#0f172a', color: '#fff' }}>Marketing</option>
              <option value="System" style={{ background: '#0f172a', color: '#fff' }}>System</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="glass-input"
              style={{ cursor: 'pointer' }}
            >
              <option value="Completed" style={{ background: '#0f172a', color: '#fff' }}>Completed</option>
              <option value="Processing" style={{ background: '#0f172a', color: '#fff' }}>Processing</option>
              <option value="Draft" style={{ background: '#0f172a', color: '#fff' }}>Draft</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Executive Summary / Insights
          </label>
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Key findings, statistical milestones, and strategic recommendations..."
            className="glass-input"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. Q4, Cloud, Audit, HighPriority"
            className="glass-input"
          />
        </div>

        {/* Dynamic Key-Value Metrics */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Custom KPI Metrics:
            </label>
            <button
              type="button"
              onClick={handleAddMetric}
              className="btn-glass"
              style={{ padding: '4px 8px', fontSize: '0.72rem', borderRadius: '6px' }}
            >
              <Plus size={12} />
              Add Metric
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {metrics.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Metric Name (e.g. ROI)"
                  value={m.key}
                  onChange={(e) => handleMetricChange(idx, 'key', e.target.value)}
                  className="glass-input"
                  style={{ flex: 1, padding: '7px 10px', fontSize: '0.8rem' }}
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 4.2x)"
                  value={m.val}
                  onChange={(e) => handleMetricChange(idx, 'val', e.target.value)}
                  className="glass-input"
                  style={{ flex: 1, padding: '7px 10px', fontSize: '0.8rem' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMetric(idx)}
                  className="btn-danger-glass"
                  style={{ padding: '7px', borderRadius: '8px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-glass"
            style={{ padding: '9px 16px' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ padding: '9px 20px' }}
          >
            <Sparkles size={16} />
            {loading ? 'Synthesizing...' : 'Generate & Publish'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateReportModal;
