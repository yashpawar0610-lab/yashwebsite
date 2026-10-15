import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, User, Shield, ArrowRight } from 'lucide-react';

const RegisterForm = ({ onSwitchToLogin, onSuccess }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Analyst');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password, role);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Registration failed');
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Full Name
          </label>
          <div style={{ position: 'relative' }}>
            <User
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Hayes"
              className="glass-input"
              style={{ paddingLeft: '38px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Work Email
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
              placeholder="name@company.io"
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="glass-input"
              style={{ paddingLeft: '38px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Organizational Role
          </label>
          <div style={{ position: 'relative' }}>
            <Shield
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '38px', cursor: 'pointer' }}
            >
              <option value="Analyst" style={{ background: '#0f172a', color: '#fff' }}>Data Analyst</option>
              <option value="Manager" style={{ background: '#0f172a', color: '#fff' }}>Operations Manager</option>
              <option value="Admin" style={{ background: '#0f172a', color: '#fff' }}>Platform Administrator</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', marginTop: '8px' }}
        >
          {loading ? 'Creating Profile...' : 'Complete Registration'}
          <ArrowRight size={16} />
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        Already have credentials?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary-accent)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Log in here
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
