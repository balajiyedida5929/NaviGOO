import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Stepper, Loading } from '../../components/UI.jsx';

export default function TrackingAmbulance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [b, setB] = useState(null);

  useEffect(() => { api.getBooking(id).then(setB); }, [id]);

  if (!b) return <div className="app-shell"><TopBar title="Tracking Ambulance" /><Loading /></div>;

  const advance = async () => {
    const res = await api.advanceSOS(id);
    setB((prev) => ({ ...prev, ...res }));
    if (res.status === 'completed') navigate(`/sos/complete/${id}`);
  };

  const stageLabel = b.stages[b.current_stage];

  return (
    <div className="app-shell">
      <TopBar title="Tracking Ambulance" subtitle={stageLabel} />
      <div className="p-4 space-y-4 flex-1">
        <Card className="flex items-center gap-3">
          <div className="text-3xl">🧑‍⚕️</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{b.ambulance.driver_name} <span className="text-amber-500 text-xs">⭐ {b.ambulance.rating}</span></div>
            <div className="text-xs text-slate-500">{b.ambulance.provider_name} • {b.ambulance.ambulance_no}</div>
          </div>
          <span className="text-xl">📞</span>
        </Card>

        <div className="bg-slate-200 rounded-xl h-40 flex items-center justify-center text-slate-400 text-sm">
          🗺️ Live map preview
        </div>

        <Card className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Type</span><span>{b.ambulance.type}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Distance</span><span>{b.ambulance.distance_km} km away</span></div>
          <div className="flex justify-between"><span className="text-slate-500">ETA</span><span>{b.ambulance.eta_min} min</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Hospital</span><span>{b.hospital}</span></div>
        </Card>

        <Card>
          <Stepper steps={b.stages} current={b.current_stage} />
        </Card>
      </div>
      <div className="p-4 space-y-2">
        <Button variant="danger" onClick={advance}>
          {b.current_stage >= b.stages.length - 2 ? 'Mark as Reached' : 'Update Status'}
        </Button>
        <button className="w-full text-center text-brand-blue font-medium text-sm py-1">Share Live Location</button>
      </div>
    </div>
  );
}
