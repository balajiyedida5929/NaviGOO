import { useNavigate } from 'react-router-dom';
import { BottomNav, Card } from '../components/UI.jsx';

const modules = [
  { to: '/self-drive', icon: '🚕', title: 'Self-Drive Rentals &\nCars With Drivers', border: false },
  { to: '/roadside', icon: '🧰', title: 'Roadside\nAssistance', border: false },
  { to: '/delivery', icon: '🛵', title: 'Route Based\nDelivery', border: false },
  { to: '/sos', icon: '🚑', title: 'SOS Emergency', border: false, danger: true },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <div className="hero-gradient text-white px-5 pt-6 pb-8 rounded-b-3xl">
        <div className="flex justify-between items-start">
          <div className="flex-1" />
          <div className="text-2xl">🔔<sup className="text-xs bg-orange-400 rounded-full px-1">3</sup></div>
        </div>
        <div className="text-center mt-1">
          <div className="text-3xl mb-1">📍</div>
          <div className="text-2xl font-extrabold tracking-tight">NaviGoo</div>
          <div className="text-xs text-white/70 mt-1">Your Journey. Our Support.</div>
        </div>

        <button className="w-full bg-white rounded-full mt-5 px-4 py-3 flex items-center justify-between text-brand-blue font-semibold text-sm">
          <span>📍 Current Location: Hyderabad</span>
          <span>⌄</span>
        </button>
        <button className="w-full bg-white/95 rounded-full mt-3 px-4 py-3 flex items-center justify-between text-slate-400 text-sm">
          <span>🔍 Where to? (Ask Nyra.ai)</span>
          <span className="text-brand-blue font-semibold text-xs">🤖 nyra.ai</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {modules.map((m) => (
          <Card key={m.to} onClick={() => navigate(m.to)} className="flex flex-col items-center justify-center text-center py-6 gap-2">
            <div className="text-4xl">{m.icon}</div>
            <div className={`font-semibold text-sm whitespace-pre-line ${m.danger ? 'text-red-600' : 'text-slate-800'}`}>
              {m.title}
            </div>
          </Card>
        ))}
      </div>

      <div className="hero-gradient text-white text-center px-6 py-8 mx-4 rounded-2xl mb-4">
        <div className="font-bold text-lg mb-4">One Platform For Your Endless Destinations</div>
        <button onClick={() => navigate('/self-drive')} className="bg-brand-green px-8 py-3 rounded-full font-semibold">
          Start Journey
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
