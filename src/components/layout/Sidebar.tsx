import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Bot, Cpu, Key, Settings } from 'lucide-react';
import pulseaiLogo from '@/assets/pulseai-logo.png';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/agents', icon: Bot, label: 'Agents' },
  { to: '/gpus', icon: Cpu, label: 'GPUs' },
  { to: '/api-keys', icon: Key, label: 'API Keys' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-strong border-r border-border/50 flex flex-col z-50">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <img src={pulseaiLogo} alt="PulseAI" className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-xl font-bold text-gradient">PulseAI</h1>
            <p className="text-xs text-muted-foreground">Compute Agents</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary glow-sm border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="glass rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Powered by</p>
          <p className="text-sm font-semibold text-foreground">Nosana GPU Network</p>
        </div>
      </div>
    </aside>
  );
}
