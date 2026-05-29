import React from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  LineChart, 
  Compass, 
  Settings, 
  ShieldAlert,
  Database
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'telemetry', label: 'Telemetry History', icon: LineChart },
    { id: 'analytics', label: 'ML Satellite Runs', icon: Compass },
    { id: 'diagnostics', label: 'Crop Shield', icon: ShieldAlert },
  ];

  return (
    <aside style={{
      width: '280px',
      background: 'hsl(var(--bg-surface))',
      borderRight: '1px solid hsl(var(--border-light))',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1.5rem',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      {/* Brand Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '3rem',
        padding: '0 0.5rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, hsl(var(--color-primary)), #059669)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
        }}>
          <Sprout style={{ color: 'white', width: '22px', height: '22px' }} />
        </div>
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(to right, #ffffff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em'
          }}>
            AgriTech
          </h2>
          <p style={{
            fontSize: '0.7rem',
            color: 'hsl(var(--text-muted))',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginTop: '1px'
          }}>
            Analysis Portal
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <p style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'hsl(var(--text-muted))',
          padding: '0 0.75rem 0.5rem 0.75rem',
        }}>
          Navigation
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                color: isActive ? 'hsl(var(--color-primary))' : 'hsl(var(--text-secondary))',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                textAlign: 'left',
                borderLeft: isActive ? '3px solid hsl(var(--color-primary))' : '3px solid transparent',
                paddingLeft: isActive ? 'calc(1rem - 3px)' : '1rem',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.color = 'hsl(var(--text-primary))';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'hsl(var(--text-secondary))';
                }
              }}
            >
              <Icon style={{ 
                width: '20px', 
                height: '20px',
                strokeWidth: isActive ? 2.2 : 1.8 
              }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer / System Status */}
      <div style={{
        marginTop: 'auto',
        padding: '1rem',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid hsl(var(--border-light))',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Database style={{ width: '14px', height: '14px', color: 'hsl(var(--color-primary))' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>System Core</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'hsl(var(--color-primary))',
            display: 'inline-block'
          }} className="animate-pulse-glow" />
          <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))' }}>API Backend: Online</span>
        </div>
      </div>
    </aside>
  );
}
