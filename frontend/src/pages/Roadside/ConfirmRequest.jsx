import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button } from '../../components/UI.jsx';

export default function ConfirmRequest() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (!state) { navigate('/roadside'); return null; }

  const confirm = async () => {
    setSubmitting(true);
    const res = await api.createRoadsideRequest({
      vehicle_type: state.vehicle_type,
      problem: state.problem,
      location: 'Hi-Tech City, Hyderabad',
      mechanic_id: state.mechanic_id,
    });
    setSubmitting(false);
    navigate(`/roadside/confirmed/${res.id}`);
  };

  return (
    <div className="app-shell">
      <TopBar title="Confirm Request" />
      <div className="p-4 space-y-4 flex-1">
        <Card>
          <div className="font-semibold text-sm mb-3">Your Request</div>
          <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Vehicle</span><span>{state.vehicle_type}</span></div>
          <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Problem</span><span>{state.problem}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Location</span><span className="text-brand-blue">Hi-Tech City, Hyderabad</span></div>
        </Card>

        <div className="font-semibold text-sm text-slate-700">Selected Mechanic</div>
        <Card className="flex items-center gap-3">
          <div className="text-3xl">🧑‍🔧</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{state.mechanic.name} <span className="text-amber-500 text-xs">⭐ {state.mechanic.rating}</span></div>
            <div className="text-xs text-slate-500">{state.mechanic.experience_years} Years Experience • {state.mechanic.distance_km} km away</div>
          </div>
          <div className="text-sm font-semibold">₹{state.mechanic.price}</div>
        </Card>
      </div>
      <div className="p-4 space-y-2">
        <Button onClick={confirm} disabled={submitting}>{submitting ? 'Connecting…' : 'Confirm & Connect'}</Button>
        <div className="text-xs text-slate-400 text-center">You can track the mechanic in real-time</div>
      </div>
    </div>
  );
}
