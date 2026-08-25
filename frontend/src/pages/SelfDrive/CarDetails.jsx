import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [pickup, setPickup] = useState('2026-08-05T10:00');
  const [ret, setRet] = useState('2026-08-06T10:00');

  useEffect(() => { api.getVehicle(id).then(setVehicle); }, [id]);

  if (!vehicle) return <div className="app-shell"><TopBar title="Car Details" /><Loading /></div>;

  return (
    <div className="app-shell">
      <TopBar title="Car Details" />
      <div className="p-4 space-y-4 flex-1">
        <Card className="text-center">
          <div className="text-7xl py-4">{vehicle.image_emoji}</div>
        </Card>

        <div>
          <div className="text-xl font-bold text-slate-800">{vehicle.name}</div>
          <div className="text-sm text-amber-500">⭐ {vehicle.rating} ({vehicle.reviews_count}+ Reviews)</div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="bg-slate-100 px-3 py-1 rounded-full">⚙️ {vehicle.transmission}</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">⛽ {vehicle.fuel}</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">👥 {vehicle.seats} Seats</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">❄️ AC</span>
        </div>

        <div className="text-2xl font-extrabold text-slate-800">
          ₹{vehicle.price_per_day} <span className="text-sm font-normal text-slate-400">/ day + Taxes & Security Deposit</span>
        </div>

        <Card>
          <div className="font-semibold text-slate-700 mb-2">Car Features</div>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((f) => (
              <span key={f} className="bg-slate-100 text-xs px-3 py-1 rounded-full text-slate-600">{f}</span>
            ))}
          </div>
        </Card>

        <Card className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Pickup Location</span>
            <span className="text-brand-blue font-medium">Hyderabad</span>
          </div>
          <label className="block text-sm text-slate-500">
            Pickup Date & Time
            <input type="datetime-local" value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-slate-800" />
          </label>
          <label className="block text-sm text-slate-500">
            Return Date & Time
            <input type="datetime-local" value={ret} onChange={(e) => setRet(e.target.value)} className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-slate-800" />
          </label>
        </Card>
      </div>
      <div className="p-4">
        <Button onClick={() => navigate(`/self-drive/${id}/book`, { state: { pickup, ret } })}>Book Now</Button>
      </div>
    </div>
  );
}
