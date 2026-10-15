import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

const LoginForm = ({ onSwitchToRegister, onSuccess }) => {
  const { login, quickDemoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async (role) => {
    setError('');
    setLoading(true);
    try {
      await quickDemoLogin(role);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {error && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '10px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            fontSize: '0.82rem',
            marginBottom: '16px'
          }}
        >
          {error}
        </div>
      )}

      {/* Quick Demo Pre-fill Bar */}
      <div
        style={{
          padding: '12px',
          borderRadius: '12px',
          background: 'var(--glass-surface-subtle)',
          border: '1px solid var(--glass-border)',
          marginBottom: '20px'
        }}
      >
        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
          Instant Demo Access:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            type="button"
            onClick={() => handleDemo('admin')}
            className="btn-glass"
            style={{ fontSize: '0.78rem', padding: '6px 10px', justifyContent: 'flex-start' }}
          >
            <ShieldCheck size={14} color="#06b6d4" />
            Alexander (Admin)
          </button>
          <button
            type="button"
            onClick={() => handleDemo('analyst')}
            className="btn-glass"
            style={{ fontSize: '0.78rem', padding: '6px 10px', justifyContent: 'flex-start' }}
          >
            <UserCheck size={14} color="#8b5cf6" />
            Sarah (Analyst)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Email Address
          </label>
          <div style={{ position: 'relative' }}>
            <Mail
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@pulse.io"
              className="glass-input"
              style={{ paddingLeft: '38px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <Lock
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="glass-input"
              style={{ paddingLeft: '38px' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', marginTop: '6px' }}
        >
          {loading ? 'Authenticating...' : 'Sign In to Workspace'}
          <ArrowRight size={16} />
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary-accent)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Create account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
