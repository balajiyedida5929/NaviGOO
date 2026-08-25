import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Pill, Loading } from '../../components/UI.jsx';

const categories = ['All', 'Hatchback', 'Sedan', 'SUV', 'Luxury'];

export default function RentalsList() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getVehicles({ category, search }).then(setVehicles).finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="app-shell">
      <TopBar title="Self-Drive Rentals" />
      <div className="p-4 space-y-3">
        <button className="w-full bg-white rounded-full px-4 py-2.5 flex items-center justify-between text-brand-blue font-semibold text-sm border border-slate-200">
          <span>📍 Hyderabad</span>
          <span className="text-brand-green">Change</span>
        </button>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cars, e.g., Swift, Creta..."
          className="w-full bg-white rounded-full px-4 py-2.5 border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-blueLight"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <Pill key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Pill>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-3 flex-1">
        {loading && <Loading label="Finding cars near you…" />}
        {!loading && vehicles.length === 0 && (
          <div className="text-center text-slate-400 text-sm py-8">No cars match that search.</div>
        )}
        {vehicles.map((v) => (
          <Card key={v.id} onClick={() => navigate(`/self-drive/${v.id}`)} className="flex items-center gap-3">
            <div className="text-4xl w-16 text-center">{v.image_emoji}</div>
            <div className="flex-1">
              <div className="font-semibold text-slate-800">{v.name}</div>
              <div className="text-xs text-slate-500">{v.transmission} • {v.fuel}</div>
              <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5">⭐ {v.rating}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-800">₹{v.price_per_day}<span className="text-xs font-normal text-slate-400">/day</span></div>
              <div className="text-xs text-brand-green font-medium mt-1">{v.available ? 'Available' : 'Booked'}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-4 text-center text-sm text-slate-500">
        Can't find what you're looking for?{' '}
        <span className="text-brand-blue font-semibold">Tell us →</span>
      </div>
    </div>
  );
}
