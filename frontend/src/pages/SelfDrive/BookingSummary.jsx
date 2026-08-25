import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function BookingSummary() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [booking, setBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { api.getVehicle(id).then(setVehicle); }, [id]);

  const confirm = async () => {
    setSubmitting(true);
    const res = await api.bookSelfDrive({
      vehicle_id: id,
      pickup_location: 'Hyderabad',
      pickup_datetime: state?.pickup,
      return_datetime: state?.ret,
    });
    setBooking(res);
    setSubmitting(false);
    navigate(`/self-drive/track/${res.id}`);
  };

  if (!vehicle) return <div className="app-shell"><TopBar title="Booking Summary" /><Loading /></div>;

  const base = vehicle.price_per_day;
  const taxes = Math.round(base * 0.18);
  const deposit = 2000;
  const total = base + taxes + deposit;

  return (
    <div className="app-shell">
      <TopBar title="Booking Summary" />
      <div className="p-4 space-y-4 flex-1">
        <Card className="flex items-center gap-3">
          <div className="text-4xl">{vehicle.image_emoji}</div>
          <div>
            <div className="font-semibold">{vehicle.name}</div>
            <div className="text-xs text-slate-500">{vehicle.transmission} • {vehicle.fuel} • {vehicle.seats} Seats</div>
          </div>
        </Card>

        <Card className="space-y-2 text-sm">
          <Row label="Pickup Location" value="Hyderabad" />
          <Row label="Pickup Date & Time" value={fmt(state?.pickup)} />
          <Row label="Return Date & Time" value={fmt(state?.ret)} />
        </Card>

        <Card className="space-y-2 text-sm">
          <Row label="Base Price (1 Day)" value={`₹${base}`} />
          <Row label="Taxes & Fees" value={`₹${taxes}`} />
          <Row label="Security Deposit (Refundable)" value={`₹${deposit}`} />
          <div className="border-t border-slate-100 pt-2">
            <Row label="Total Amount" value={`₹${total}`} bold />
          </div>
        </Card>

        <div className="bg-amber-50 text-amber-700 text-xs rounded-xl px-4 py-3">
          Advance payment of ₹{Math.round(total * 0.5)} is required to confirm your booking.
        </div>
      </div>
      <div className="p-4">
        <Button onClick={confirm} disabled={submitting}>{submitting ? 'Confirming…' : 'Continue to Pay'}</Button>
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={bold ? 'font-bold text-slate-800' : 'text-slate-700'}>{value}</span>
    </div>
  );
}

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}
