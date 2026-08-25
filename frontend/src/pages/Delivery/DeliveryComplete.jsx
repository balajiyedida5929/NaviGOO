import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function DeliveryComplete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [b, setB] = useState(null);
  const [rating, setRating] = useState(5);

  useEffect(() => { api.getBooking(id).then(setB); }, [id]);

  if (!b) return <div className="app-shell"><TopBar title="Delivered" /><Loading /></div>;

  return (
    <div className="app-shell">
      <div className="hero-gradient text-white text-center px-6 py-10 rounded-b-3xl">
        <div className="text-6xl mb-3">✅</div>
        <div className="font-bold text-xl">Delivered Successfully!</div>
        <div className="text-sm text-white/70 mt-1">Your request has been completed.</div>
      </div>
      <div className="p-4 space-y-4 flex-1">
        <Card className="space-y-2 text-sm">
          {b.items.map((it) => (
            <div key={it.id} className="flex justify-between"><span>{it.name}</span><span>₹{it.price * it.qty}</span></div>
          ))}
        </Card>
        <Card className="flex items-center gap-2 text-sm">
          <span>📍</span>
          <span>{b.junction_point} (Towards {b.to_location})</span>
        </Card>
        <Card>
          <div className="font-semibold text-sm mb-2">Rate Delivery Partner</div>
          <div className="flex gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRating(n)}>{n <= rating ? '⭐' : '☆'}</button>
            ))}
          </div>
        </Card>
        <div className="bg-green-50 text-brand-greenDark text-sm rounded-xl px-4 py-3 text-center">
          👍 Thank you for choosing NaviGoo! Safe Travel Ahead 🚗
        </div>
      </div>
      <div className="p-4">
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  );
}
