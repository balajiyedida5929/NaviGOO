import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Loading } from '../../components/UI.jsx';

export default function TrackingSelfDrive() {
  const { id } = useParams();
  const [b, setB] = useState(null);

  useEffect(() => { api.getBooking(id).then(setB); }, [id]);

  if (!b) return <div className="app-shell"><TopBar title="Tracking – Self-Drive" /><Loading /></div>;

  return (
    <div className="app-shell">
      <TopBar title="Tracking – Self-Drive" />
      <div className="p-4 space-y-4 flex-1">
        <span className="inline-block bg-brand-green text-white text-xs px-3 py-1 rounded-full font-semibold">Active</span>
        <div className="text-xs text-slate-500">Booking ID: {b.booking_id}</div>

        <Card className="flex items-center gap-3">
          <div className="text-3xl">🚗</div>
          <div>
            <div className="font-semibold">{b.vehicle.name}</div>
            <div className="text-xs text-slate-500">{b.vehicle.color} • {b.vehicle.plate}</div>
          </div>
        </Card>

        <Card className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Pickup Location</span><span>{b.pickup_location}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Pickup Time</span><span>{fmt(b.pickup_datetime)}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Return Time</span><span>{fmt(b.return_datetime)}</span></div>
        </Card>

        <div className="font-semibold text-sm text-slate-700">Owner Details</div>
        <Card className="flex items-center gap-3">
          <div className="text-2xl">🧑</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{b.owner.name}</div>
            <div className="text-xs text-slate-500">{b.owner.phone}</div>
          </div>
          <span className="text-xl">📞</span>
          <span className="text-xl">💬</span>
        </Card>

        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-slate-700">Live Location</span>
          <span className="text-xs text-brand-green">Updated just now</span>
        </div>
        <div className="bg-slate-200 rounded-xl h-40 flex items-center justify-center text-slate-400 text-sm">
          🗺️ Live map preview
        </div>
      </div>
      <div className="p-4">
        <button className="w-full text-center text-brand-blue font-semibold text-sm py-2">Extend Booking</button>
      </div>
    </div>
  );
}

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}
