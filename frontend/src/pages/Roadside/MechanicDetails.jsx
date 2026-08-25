import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function MechanicDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [m, setM] = useState(null);

  useEffect(() => { api.getMechanic(id).then(setM); }, [id]);

  if (!m) return <div className="app-shell"><TopBar title="Mechanic Details" /><Loading /></div>;

  return (
    <div className="app-shell">
      <TopBar title="Mechanic Details" />
      <div className="p-4 space-y-4 flex-1">
        <Card className="flex items-center gap-3">
          <div className="text-4xl">🧑‍🔧</div>
          <div>
            <div className="font-semibold">{m.name}</div>
            <div className="text-xs text-amber-500">⭐ {m.rating}</div>
            <div className="text-xs text-slate-500">{m.experience_years} Years Experience</div>
          </div>
        </Card>

        <div className="flex justify-between text-center text-xs text-slate-500">
          <div>📦 {m.jobs_done}<br />Jobs Done</div>
          <div>⭐ {m.rating}<br />Rating</div>
          <div>📍 {m.distance_km} km<br />Away</div>
        </div>

        <Card>
          <div className="font-semibold text-sm mb-1">About</div>
          <div className="text-sm text-slate-600">{m.about}</div>
        </Card>

        <Card>
          <div className="font-semibold text-sm mb-2">Services</div>
          <div className="space-y-1">
            {m.services.map((s) => <div key={s} className="text-sm text-slate-600">✅ {s}</div>)}
          </div>
        </Card>

        <Card className="flex justify-between text-sm">
          <div>Est. Arrival Time<br /><span className="font-semibold text-slate-800">{m.eta_min} min</span></div>
          <div className="text-right">Charges<br /><span className="font-semibold text-slate-800">₹{m.price}</span></div>
        </Card>
      </div>
      <div className="p-4">
        <Button onClick={() => navigate('/roadside/confirm', { state: { ...state, mechanic_id: m.id, mechanic: m } })}>Connect Now</Button>
      </div>
    </div>
  );
}
