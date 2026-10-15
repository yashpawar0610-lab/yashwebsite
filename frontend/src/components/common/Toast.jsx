import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#10b981" />,
    error: <AlertCircle size={18} color="#ef4444" />,
    warning: <AlertCircle size={18} color="#f59e0b" />,
    info: <Info size={18} color="#38bdf8" />
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 18px',
        background: 'var(--glass-surface)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border-hover)',
        borderRadius: '12px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {icons[type] || icons.info}
      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
