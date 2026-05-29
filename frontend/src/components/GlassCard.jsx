import React from 'react';

/**
 * Reusable Glassmorphism Card Component.
 * Implements standard borders, blurs, and hover effects from index.css.
 */
export default function GlassCard({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  headerAction,
  interactive = false,
  ...props 
}) {
  return (
    <div 
      className={`glass-panel ${interactive ? 'glass-interactive' : ''} ${className}`} 
      style={{ padding: '1.5rem' }}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '1.25rem',
          borderBottom: '1px solid hsla(220, 15%, 20%, 0.3)',
          paddingBottom: '0.75rem'
        }}>
          <div>
            {title && (
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600,
                color: 'hsl(var(--text-primary))',
                fontFamily: 'var(--font-display)'
              }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ 
                fontSize: '0.8125rem', 
                color: 'hsl(var(--text-muted))',
                marginTop: '0.125rem'
              }}>
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && (
            <div style={{ marginLeft: '1rem' }}>
              {headerAction}
            </div>
          )}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
