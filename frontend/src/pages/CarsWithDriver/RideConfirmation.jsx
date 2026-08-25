import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button } from '../../components/UI.jsx';

export default function RideConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (!state) { navigate('/self-drive/cars-with-driver'); return null; }

  const confirm = async () => {
    setSubmitting(true);
    const res = await api.bookCarsWithDriver({
      vehicle_id: state.vehicle_id,
      from_location: state.from,
      to_location: state.to,
      departure_time: state.departure,
      passengers: state.passengers,
      trip_type: state.tripType,
    });
    setSubmitting(false);
    navigate(`/self-drive/cars-with-driver/track/${res.id}`);
  };

  return (
    <div className="app-shell">
      <TopBar title="Ride Confirmation" />
      <div className="p-4 space-y-4 flex-1">
        <Card className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">From</span><span>{state.from}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">To</span><span>{state.to}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Date & Time</span><span>{fmt(state.departure)}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Passengers</span><span>{state.passengers}</span></div>
        </Card>
        <Card className="space-y-2 text-sm">
          <div className="font-semibold text-slate-700 mb-1">Fare Details</div>
          <div className="flex justify-between"><span className="text-slate-500">Base Fare</span><span>Calculated at booking</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Toll & Parking</span><span>₹300</span></div>
        </Card>
        <div className="text-xs text-slate-400 text-center">You can cancel till 10 mins before pickup.</div>
      </div>
      <div className="p-4">
        <Button onClick={confirm} disabled={submitting}>{submitting ? 'Confirming…' : 'Confirm Booking'}</Button>
      </div>
    </div>
  );
}

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}
