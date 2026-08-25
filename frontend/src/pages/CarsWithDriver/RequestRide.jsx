import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function RequestRide() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [from, setFrom] = useState('Hyderabad');
  const [to, setTo] = useState('Vijayawada');
  const [tripType, setTripType] = useState('one_way');
  const [passengers, setPassengers] = useState(1);
  const [departure, setDeparture] = useState('2026-08-05T10:00');
  const [selected, setSelected] = useState(null);

  useEffect(() => { api.getDriverVehicles().then(setVehicles); }, []);

  if (!vehicles.length) return <div className="app-shell"><TopBar title="Cars With Driver" /><Loading /></div>;

  return (
    <div className="app-shell">
      <TopBar title="Cars With Driver" />
      <div className="p-4 space-y-4 flex-1">
        <Card className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-brand-blue">●</span>
            <input value={from} onChange={(e) => setFrom(e.target.value)} className="flex-1 outline-none" placeholder="From" />
          </div>
          <div className="border-t border-dashed border-slate-200" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-brand-green">📍</span>
            <input value={to} onChange={(e) => setTo(e.target.value)} className="flex-1 outline-none" placeholder="To" />
          </div>
        </Card>

        <div className="flex gap-2">
          <button onClick={() => setTripType('one_way')} className={`flex-1 py-2 rounded-full text-sm font-medium ${tripType === 'one_way' ? 'bg-brand-blue text-white' : 'bg-white border border-slate-300 text-slate-600'}`}>One Way</button>
          <button onClick={() => setTripType('round_trip')} className={`flex-1 py-2 rounded-full text-sm font-medium ${tripType === 'round_trip' ? 'bg-brand-blue text-white' : 'bg-white border border-slate-300 text-slate-600'}`}>Round Trip</button>
        </div>

        <Card className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-500">
            Departure Time
            <input type="datetime-local" value={departure} onChange={(e) => setDeparture(e.target.value)} className="w-full mt-1 border border-slate-200 rounded-lg px-2 py-1.5 text-sm" />
          </label>
          <label className="text-xs text-slate-500">
            Passengers
            <select value={passengers} onChange={(e) => setPassengers(+e.target.value)} className="w-full mt-1 border border-slate-200 rounded-lg px-2 py-1.5 text-sm">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </Card>

        <div className="font-semibold text-slate-700 text-sm">Select Vehicle Type</div>
        <div className="space-y-2">
          {vehicles.map((v) => (
            <Card key={v.id} onClick={() => setSelected(v.id)} className={`flex items-center gap-3 ${selected === v.id ? 'ring-2 ring-brand-blue' : ''}`}>
              <div className="text-2xl">🚐</div>
              <div className="flex-1">
                <div className="font-medium text-sm">{v.name}</div>
                <div className="text-xs text-slate-500">{v.category} • {v.seats} Seater</div>
              </div>
              <div className="text-sm font-semibold">₹{v.price_one_way}</div>
            </Card>
          ))}
        </div>
      </div>
      <div className="p-4">
        <Button
          disabled={!selected}
          onClick={() => navigate('/self-drive/cars-with-driver/confirm', { state: { from, to, tripType, passengers, departure, vehicle_id: selected } })}
        >
          See Prices
        </Button>
      </div>
    </div>
  );
}
