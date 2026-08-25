import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/UI.jsx';

const checklist = ['Finding available mechanics', 'Checking location & distance', 'Connecting to best mechanic', 'Confirming your request'];

export default function FindingMechanics() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= checklist.length) {
      const t = setTimeout(() => navigate('/roadside/mechanics', { state }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="app-shell">
      <TopBar title="Roadside Assistance" subtitle="We are finding the best mechanic near you" />
      <div className="p-6 flex-1 flex flex-col items-center">
        <div className="w-40 h-40 rounded-full bg-blue-50 flex items-center justify-center text-6xl my-8 animate-pulse">👷</div>
        <div className="font-semibold text-slate-700 mb-4">Searching for nearby mechanics…</div>
        <div className="w-full space-y-3">
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
