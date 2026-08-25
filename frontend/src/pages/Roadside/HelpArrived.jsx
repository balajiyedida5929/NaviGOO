import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Button, Loading } from '../../components/UI.jsx';

export default function HelpArrived() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [b, setB] = useState(null);

  useEffect(() => { api.getBooking(id).then(setB); }, [id]);

  if (!b) return <div className="app-shell"><TopBar title="Help on the way" /><Loading /></div>;

  const complete = async () => {
    await api.advanceRoadsideStatus(id, 'completed');
    navigate('/my-services');
  };

  return (
    <div className="app-shell">
      <TopBar title="Help on the way" />
      <div className="p-4 space-y-4 flex-1">
        <div className="bg-green-50 text-green-700 rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-medium">
          ✅ Mechanic has arrived — {b.mechanic.name} has reached your location
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-200 rounded-xl h-28 flex items-center justify-center text-3xl">🧑‍🔧</div>
          <div className="bg-slate-200 rounded-xl h-28 flex items-center justify-center text-3xl">🚗</div>
        </div>

        <Card className="space-y-1 text-sm">
          <div className="font-semibold text-slate-700">Job in Progress</div>
          <div>{b.problem}</div>
          <div className="text-xs text-slate-500">Est. Time: 20 min</div>
        </Card>
      </div>
      <div className="p-4 space-y-2">
        <Button onClick={complete}>Mark Job Complete</Button>
        <button className="w-full text-center text-brand-blue font-medium text-sm py-1">Chat with Mechanic</button>
      </div>
    </div>
  );
}
