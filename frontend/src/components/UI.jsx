import { NavLink, useNavigate } from 'react-router-dom';

export function BottomNav() {
  const tabs = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/my-services', label: 'My Services', icon: '🧾' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ];
  return (
    <nav className="sticky bottom-0 bg-white border-t border-slate-200 flex justify-around py-2 px-2 mt-auto">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs gap-0.5 px-3 py-1 rounded-lg ${
              isActive ? 'text-brand-green font-semibold' : 'text-slate-500'
            }`
          }
        >
          <span className="text-lg leading-none">{t.icon}</span>
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function TopBar({ title, subtitle }) {
  const navigate = useNavigate();
  return (
    <div className="hero-gradient text-white px-4 pt-4 pb-4 flex items-center gap-3">
      <button onClick={() => navigate(-1)} className="text-xl leading-none px-1" aria-label="Back">←</button>
      <div>
        <div className="font-semibold text-base">{title}</div>
        {subtitle && <div className="text-xs text-white/70">{subtitle}</div>}
      </div>
    </div>
  );
}

export function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl2 shadow-sm border border-slate-100 p-4 ${onClick ? 'cursor-pointer active:scale-[0.99] transition' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-brand-green hover:bg-brand-greenDark text-white',
    secondary: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    dark: 'bg-brand-blue hover:bg-brand-blueDark text-white',
  };
  return (
    <button
      className={`w-full py-3 rounded-full font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Pill({ active, children, ...props }) {
  return (
    <button
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
        active ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-slate-600 border-slate-300'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Stepper({ steps, current }) {
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              i < current ? 'bg-brand-green text-white' : i === current ? 'bg-brand-blue text-white animate-pulse' : 'bg-slate-200 text-slate-400'
            }`}
          >
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`text-sm ${i <= current ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{s}</span>
        </div>
      ))}
    </div>
  );
}

export function Loading({ label = 'Loading…' }) {
  return <div className="p-8 text-center text-slate-400 text-sm">{label}</div>;
}
