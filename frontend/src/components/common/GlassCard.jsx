import React from 'react';

const GlassCard = ({
  children,
  className = '',
  interactive = false,
  glow = false,
  style = {},
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`glass-panel ${interactive ? 'glass-panel-interactive' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
