import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Activity, Shield, User, LogOut, Sparkles, Menu } from 'lucide-react';

const Navbar = ({ onToggleSidebar, activeTab, isMobile }) => {
  const { user, isAuthenticated, logout, quickDemoLogin } = useAuth();

  return (
    <header
      className="glass-panel"
      style={{
        position: 'sticky',
        top: '16px',
        zIndex: 50,
        margin: '0 20px 24px 20px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '16px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            className="btn-glass"
            style={{ padding: '8px', borderRadius: '10px' }}
          >
            <Menu size={18} />
          </button>
        )}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
              {activeTab === 'dashboard' && 'Executive Dashboard'}
              {activeTab === 'reports' && 'Analytics & Reports'}
              {activeTab === 'activity' && 'Security & Audit Log'}
              {activeTab === 'settings' && 'System Parameters'}
            </h2>
            <span
              className="glass-pill"
              style={{
                color: '#10b981',
                borderColor: 'rgba(16, 185, 129, 0.3)',
                fontSize: '0.7rem'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }}
              />
              API & DB Online
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Real-time analytics engine powered by MongoDB & Express.js
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Quick Demo Switcher if not logged in or want to switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => quickDemoLogin('admin')}
                className="btn-glass"
                style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                title="Quick login as Alexander Vance (Admin)"
              >
                <Sparkles size={14} color="#06b6d4" />
                Demo Admin
              </button>
              <button
                onClick={() => quickDemoLogin('analyst')}
                className="btn-glass"
                style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                title="Quick login as Sarah Connor (Analyst)"
              >
                Demo Analyst
              </button>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 10px',
                borderRadius: '12px',
                background: 'var(--glass-surface-subtle)',
                border: '1px solid var(--glass-border)'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                {user.name ? user.name[0] : 'U'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {user.name}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-accent)', fontWeight: 500 }}>
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="btn-glass"
                title="Log Out"
                style={{
                  padding: '6px',
                  borderRadius: '8px',
                  marginLeft: '6px',
                  color: 'var(--text-muted)'
                }}
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
