import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Activity,
  Sliders,
  Sparkles,
  Layers,
  ChevronRight,
  Database
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, isMobile }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'reports', label: 'Reports & Data', icon: FileText, badge: 'Live' },
    { id: 'activity', label: 'Activity Logs', icon: Activity, badge: null },
    { id: 'settings', label: 'Configuration', icon: Sliders, badge: null }
  ];

  return (
    <aside
      className="glass-panel"
      style={{
        width: isOpen ? '260px' : '80px',
        minHeight: 'calc(100vh - 32px)',
        margin: '16px 0 16px 16px',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: isMobile ? 'fixed' : 'sticky',
        top: '16px',
        zIndex: 100,
        borderRadius: '20px'
      }}
    >
      <div>
        {/* Brand Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 10px',
            marginBottom: '32px',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('dashboard')}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(6, 182, 212, 0.4)',
              flexShrink: 0
            }}
          >
            <Sparkles size={22} />
          </div>
          {isOpen && (
            <div>
              <h1
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  background: 'var(--primary-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}
              >
                PULSE
              </h1>
              <span
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em'
                }}
              >
                Analytics Suite
              </span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setIsOpen(false);
                }}
                className={`btn-glass ${isActive ? 'active-nav-item' : ''}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isOpen ? 'space-between' : 'center',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: isActive
                    ? '1px solid rgba(6, 182, 212, 0.4)'
                    : '1px solid transparent',
                  background: isActive
                    ? 'rgba(6, 182, 212, 0.12)'
                    : 'transparent',
                  color: isActive ? 'var(--primary-accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={20} color={isActive ? '#06b6d4' : 'currentColor'} />
                  {isOpen && (
                    <span style={{ fontSize: '0.9rem', fontWeight: isActive ? 700 : 500 }}>
                      {item.label}
                    </span>
                  )}
                </div>
                {isOpen && item.badge && (
                  <span
                    className="glass-pill"
                    style={{
                      fontSize: '0.65rem',
                      background: 'rgba(6, 182, 212, 0.2)',
                      color: 'var(--primary-accent)',
                      border: 'none',
                      padding: '2px 8px'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      {isOpen && (
        <div
          style={{
            padding: '14px',
            borderRadius: '14px',
            background: 'var(--glass-surface-subtle)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={16} color="#10b981" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Engine Specs</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <span>Mongoose ODM</span>
            <span style={{ color: '#10b981' }}>v8.9</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <span>Vite Bundler</span>
            <span style={{ color: '#06b6d4' }}>Active</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
