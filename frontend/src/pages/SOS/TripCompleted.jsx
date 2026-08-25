import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function TripCompleted() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [b, setB] = useState(null);

  useEffect(() => { api.getBooking(id).then(setB); }, [id]);

  if (!b) return <div className="app-shell"><TopBar title="Trip Completed" /><Loading /></div>;

  return (
    <div className="app-shell">
      <div className="hero-gradient text-white text-center px-6 py-10 rounded-b-3xl">
        <div className="text-6xl mb-3">✅</div>
        <div className="font-bold text-xl">Thank You!</div>
        <div className="text-sm text-white/70 mt-1">Your emergency trip has been completed.</div>
      </div>
      <div className="p-4 space-y-4 flex-1">
        <Card>
          <div className="font-semibold text-sm mb-3">Trip Summary</div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">From</span><span>{b.location}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">To</span><span>{b.hospital}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Completed On</span><span>{new Date(b.created_at).toLocaleString('en-IN')}</span></div>
          </div>
        </Card>
        <div className="bg-blue-50 text-brand-blue text-sm rounded-xl px-4 py-3 text-center">
          Payment will be settled by the hospital. No payment is required now.
        </div>
      </div>
      <div className="p-4">
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    </div>
  );
}
