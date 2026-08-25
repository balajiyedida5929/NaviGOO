import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { BottomNav, Card, Loading } from '../components/UI.jsx';

const typeMeta = {
  self_drive: { label: 'Self-Drive Rental', icon: '🚗', track: (b) => `/self-drive/track/${b.id}` },
  cars_with_driver: { label: 'Cars With Driver', icon: '🧑\u200d✈️', track: (b) => `/self-drive/cars-with-driver/track/${b.id}` },
  roadside: { label: 'Roadside Assistance', icon: '🧰', track: (b) => `/roadside/confirmed/${b.id}` },
  delivery: { label: 'Route Delivery', icon: '🛵', track: (b) => `/delivery/complete/${b.id}` },
  sos: { label: 'SOS Emergency', icon: '🚑', track: (b) => `/sos/tracking/${b.id}` },
};

const statusColor = {
  pending: 'bg-slate-100 text-slate-500',
  confirmed: 'bg-blue-100 text-brand-blue',
  in_progress: 'bg-amber-100 text-amber-600',
  completed: 'bg-green-100 text-brand-greenDark',
  cancelled: 'bg-red-100 text-red-500',
};

export default function MyServices() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(null);

  useEffect(() => { api.getBookings().then(setBookings); }, []);

  return (
    <div className="app-shell">
      <div className="hero-gradient text-white px-4 pt-6 pb-4">
        <div className="font-semibold text-lg">My Services</div>
        <div className="text-xs text-white/70">All your bookings in one place</div>
      </div>
      <div className="p-4 space-y-3 flex-1">
        {!bookings && <Loading />}
        {bookings && bookings.length === 0 && (
          <div className="text-center text-slate-400 text-sm py-12">No bookings yet. Start a journey from Home.</div>
        )}
        {bookings?.map((b) => {
          const meta = typeMeta[b.type];
          return (
            <Card key={b.id} onClick={() => navigate(meta.track(b))} className="flex items-center gap-3">
              <div className="text-2xl">{meta.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-sm">{meta.label}</div>
                <div className="text-xs text-slate-400">{b.booking_id}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${statusColor[b.status]}`}>{b.status.replace('_', ' ')}</span>
            </Card>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}
