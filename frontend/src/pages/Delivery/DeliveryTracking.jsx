import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Stepper, Loading } from '../../components/UI.jsx';

export default function DeliveryTracking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [creating, setCreating] = useState(true);

  useEffect(() => {
    if (!state?.items?.length) { navigate('/delivery'); return; }
    api.createDeliveryRequest({
      from_location: 'Amalapuram',
      to_location: 'Hyderabad',
      junction_point: 'Vijayawada Highway Junction',
      items: state.items,
    }).then((res) => { setBooking(res); setCreating(false); });
  }, []);

  const advance = async () => {
    const res = await api.advanceDelivery(booking.id);
    setBooking((b) => ({ ...b, ...res }));
    if (res.status === 'completed') navigate(`/delivery/complete/${booking.id}`);
  };

  if (creating || !booking) return <div className="app-shell"><TopBar title="Delivery in Progress" /><Loading label="Placing your request…" /></div>;

  return (
    <div className="app-shell">
      <TopBar title="Delivery in Progress" />
      <div className="p-4 space-y-4 flex-1">
        <Card className="flex items-center gap-3">
          <div className="text-3xl">🛵</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{booking.partner.name} <span className="text-amber-500 text-xs">⭐ {booking.partner.rating}</span></div>
            <div className="text-xs text-slate-500">Delivery Partner • {booking.partner.phone}</div>
          </div>
          <span className="text-xl">📞</span>
        </Card>

        <Card className="bg-amber-50 border-amber-100 text-amber-700 text-sm">
          Your items are being packed and will be delivered soon.
        </Card>

        <div className="font-semibold text-slate-700 text-sm">Live Tracking</div>
        <div className="bg-slate-200 rounded-xl h-40 flex items-center justify-center text-slate-400 text-sm">
          🗺️ Live map preview
        </div>

        <Card>
          <div className="text-sm font-medium mb-1">📍 Delivery Location</div>
          <div className="text-xs text-slate-500 mb-4">{booking.junction_point} (Towards {booking.to_location})</div>
          <Stepper steps={booking.stages} current={booking.current_stage} />
        </Card>

        <Card className="space-y-2 text-sm">
          {booking.items.map((it) => (
            <div key={it.id} className="flex justify-between">
              <span>{it.name} x{it.qty}</span>
              <span>₹{it.price * it.qty}</span>
            </div>
          ))}
          <div className="border-t border-slate-100 pt-2 flex justify-between font-semibold">
            <span>Total</span><span>₹{booking.total}</span>
          </div>
        </Card>
      </div>
      <div className="p-4">
        <Button onClick={advance}>
          {booking.current_stage >= booking.stages.length - 2 ? 'Mark as Delivered' : 'Track Live Location'}
        </Button>
      </div>
    </div>
  );
}
