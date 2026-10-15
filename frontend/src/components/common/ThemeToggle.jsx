import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="btn-glass"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      style={{
        padding: '8px 12px',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.8rem',
        fontWeight: '500'
      }}
    >
      {isDark ? (
        <>
          <Sun size={16} color="#f59e0b" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon size={16} color="#8b5cf6" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
