import { useNavigate } from 'react-router-dom';
import { TopBar, Card } from '../../components/UI.jsx';

export default function SOSHome() {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <TopBar title="SOS Emergency" />
      <div className="p-4 flex-1 flex flex-col items-center">
        <button
          onClick={() => navigate('/sos/type')}
          className="w-40 h-40 rounded-full bg-red-600 text-white font-extrabold text-2xl shadow-lg my-8 active:scale-95 transition"
        >
          SOS
        </button>
        <div className="text-red-600 font-semibold mb-6">Tap to request emergency help</div>

        <div className="font-semibold text-slate-700 text-sm self-start mb-2">Emergency Services</div>
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          <Card onClick={() => navigate('/sos/type')} className="flex flex-col items-center gap-1 py-4">
            <div className="text-2xl">🚑</div><div className="text-xs font-medium">Ambulance</div>
          </Card>
          <Card onClick={() => navigate('/sos/type')} className="flex flex-col items-center gap-1 py-4">
            <div className="text-2xl">👮</div><div className="text-xs font-medium">Police</div>
          </Card>
          <Card onClick={() => navigate('/sos/type')} className="flex flex-col items-center gap-1 py-4">
            <div className="text-2xl">🚒</div><div className="text-xs font-medium">Fire Brigade</div>
          </Card>
        </div>

        <Card className="w-full">
          <div className="text-sm font-medium mb-1">📍 Your Location</div>
          <div className="text-xs text-slate-500">Amalapuram, Andhra Pradesh, India</div>
          <div className="text-xs text-slate-400">16.5732° N, 82.0207° E</div>
          <button className="text-brand-blue text-xs font-semibold mt-2">Share Live Location</button>
        </Card>
      </div>
    </div>
  );
}
