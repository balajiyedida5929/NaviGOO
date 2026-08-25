import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar } from '../../components/UI.jsx';

const checklist = ['Sending your location', 'Searching nearby ambulances', 'Checking availability', 'Connecting to ambulance', 'Alerting ambulance crew'];

export default function FindingAmbulance() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    api.createSOSRequest({ emergency_type: state?.emergency_type || 'Medical Emergency', location: 'Amalapuram, Andhra Pradesh' }).then(setBooking);
  }, []);

  useEffect(() => {
    if (!booking) return;
    if (step >= checklist.length) {
      const t = setTimeout(() => navigate(`/sos/tracking/${booking.id}`), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 600);
    return () => clearTimeout(t);
  }, [step, booking]);

  return (
    <div className="app-shell">
      <TopBar title="Finding Ambulance" />
      <div className="p-6 flex-1 flex flex-col items-center">
        <div className="text-6xl my-6">🚑</div>
        <div className="font-bold text-slate-800 mb-1">Finding nearest ambulance…</div>
        <div className="w-full space-y-3 mt-4">
          {checklist.map((c, i) => (
            <div key={c} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
              <span className={`text-sm ${i <= step ? 'text-slate-800' : 'text-slate-400'}`}>{c}</span>
              <span>{i < step ? '✅' : i === step ? '🔄' : '⚪'}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-400 text-center mt-6">This may take a few seconds. Please stay on this screen.</div>
      </div>
    </div>
  );
}
