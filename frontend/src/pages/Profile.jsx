import { BottomNav, Card } from '../components/UI.jsx';

export default function Profile() {
  return (
    <div className="app-shell">
      <div className="hero-gradient text-white px-4 pt-8 pb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-white/20 mx-auto flex items-center justify-center text-4xl mb-3">👤</div>
        <div className="font-bold text-lg">Guest User</div>
        <div className="text-xs text-white/70">+91 98765 43210</div>
      </div>
      <div className="p-4 space-y-3 flex-1">
        {['My Bookings', 'Saved Locations', 'Payment Methods', 'Notifications', 'Help & Support', 'Settings'].map((item) => (
          <Card key={item} className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{item}</span>
            <span className="text-slate-400">›</span>
          </Card>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
