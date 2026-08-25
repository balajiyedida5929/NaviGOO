import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Loading } from '../../components/UI.jsx';

export default function MechanicsList() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => { api.getMechanics().then(setMechanics); }, []);

  if (!mechanics.length) return <div className="app-shell"><TopBar title="Available Mechanics" /><Loading /></div>;

  return (
    <div className="app-shell">
      <TopBar title="Available Mechanics" subtitle={`We found ${mechanics.length} mechanics near you`} />
      <div className="p-4 space-y-3 flex-1">
        {mechanics.map((m) => (
          <Card key={m.id} className="flex items-center gap-3">
            <div className="text-3xl">🧑‍🔧</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{m.name}</div>
              <div className="text-xs text-slate-500">{m.experience_years} Years Experience</div>
              <div className="text-xs text-slate-500">⭐ {m.rating} • {m.distance_km} km away</div>
              <div className="text-xs text-slate-400">Est. Arrival {m.eta_min} min</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-sm font-semibold">₹{m.price}</div>
              <button
                onClick={() => navigate(`/roadside/mechanics/${m.id}`, { state })}
                className="bg-brand-green text-white text-xs px-4 py-1.5 rounded-full font-semibold"
              >
                Connect
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
