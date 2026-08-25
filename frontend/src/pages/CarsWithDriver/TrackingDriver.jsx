import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function TrackingDriver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [b, setB] = useState(null);

  useEffect(() => { api.getBooking(id).then(setB); }, [id]);

  if (!b) return <div className="app-shell"><TopBar title="Tracking – With Driver" /><Loading /></div>;

  const cancel = async () => { await api.cancelBooking(id); navigate('/'); };

  return (
    <div className="app-shell">
      <TopBar title="Tracking – With Driver" />
      <div className="p-4 space-y-4 flex-1">
        <span className="inline-block bg-brand-blue text-white text-xs px-3 py-1 rounded-full font-semibold">On Trip</span>
        <div className="text-xs text-slate-500">Booking ID: {b.booking_id}</div>

        <Card className="flex items-center gap-3">
          <div className="text-3xl">🧑‍✈️</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{b.driver.name} <span className="text-amber-500 text-xs">⭐ {b.driver.rating}</span></div>
            <div className="text-xs text-slate-500">{b.driver.phone}</div>
          </div>
          <span className="text-xl">📞</span>
          <span className="text-xl">💬</span>
        </Card>

        <Card className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Vehicle</span><span>{b.vehicle.name}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Plate</span><span>{b.driver.vehicle_no}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Pickup</span><span>{b.from_location}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Drop</span><span>{b.to_location}</span></div>
        </Card>

        <div className="bg-slate-200 rounded-xl h-40 flex items-center justify-center text-slate-400 text-sm">
          🗺️ Live map preview
        </div>

        <Card className="flex justify-between text-sm">
          <span className="text-slate-500">Total Fare</span>
          <span className="font-bold text-slate-800">₹{b.fare.total}</span>
        </Card>
      </div>
      <div className="p-4 space-y-2">
        <button className="w-full text-center text-brand-blue font-semibold text-sm py-1">Share Trip</button>
        <Button variant="danger" onClick={cancel}>Cancel Trip</Button>
      </div>
    </div>
  );
}
