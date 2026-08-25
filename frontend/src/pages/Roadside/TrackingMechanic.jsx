import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function TrackingMechanic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [b, setB] = useState(null);

  useEffect(() => { api.getBooking(id).then(setB); }, [id]);

  if (!b) return <div className="app-shell"><TopBar title="Request Confirmed" /><Loading /></div>;

  const markArrived = async () => {
    await api.advanceRoadsideStatus(id, 'in_progress');
    navigate(`/roadside/arrived/${id}`);
  };

  return (
    <div className="app-shell">
      <TopBar title="Request Confirmed" />
      <div className="p-6 flex-1 flex flex-col items-center text-center">
        <div className="text-6xl my-4">✅</div>
        <div className="font-bold text-lg">Your request is confirmed!</div>
        <div className="text-sm text-slate-500 mb-4">{b.mechanic.name} is on the way</div>

        <Card className="w-full flex items-center gap-3 text-left">
          <div className="text-3xl">🧑‍🔧</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{b.mechanic.name} <span className="text-amber-500 text-xs">⭐ {b.mechanic.rating}</span></div>
            <div className="text-xs text-slate-500">{b.mechanic.experience_years} Years Experience</div>
          </div>
          <div className="text-sm text-brand-blue font-medium">{b.eta_min} min away</div>
        </Card>

        <div className="w-full text-left text-xs text-slate-500 mt-4">Booking ID<br /><span className="text-slate-800 font-medium">{b.booking_id}</span></div>

        <div className="bg-slate-200 rounded-xl h-40 w-full flex items-center justify-center text-slate-400 text-sm my-4">
          🗺️ Live map preview
        </div>
      </div>
      <div className="p-4 space-y-2">
        <Button onClick={markArrived}>Track Mechanic</Button>
        <button className="w-full text-center text-red-500 font-medium text-sm py-1" onClick={() => api.cancelBooking(id).then(() => navigate('/'))}>Cancel Request</button>
      </div>
    </div>
  );
}
