import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar, Card, Button } from '../../components/UI.jsx';

const types = [
  { id: 'medical', label: 'Medical Emergency', desc: 'Accident, injury, illness', icon: '🚑' },
  { id: 'road', label: 'Road Accident', desc: 'Vehicle collision or accident', icon: '🚗' },
  { id: 'unconscious', label: 'Unconscious Person', desc: 'Person is not responding', icon: '😵' },
  { id: 'heart', label: 'Heart Related', desc: 'Chest pain, breathing issue', icon: '❤️' },
  { id: 'other', label: 'Other Emergency', desc: 'Other medical or safety issue', icon: '⚠️' },
];

export default function SelectEmergencyType() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('medical');

  return (
    <div className="app-shell">
      <TopBar title="Select Emergency Type" />
      <div className="p-4 space-y-3 flex-1">
        <div className="font-semibold text-slate-700 text-sm">What do you need help with?</div>
        {types.map((t) => (
          <Card key={t.id} onClick={() => setSelected(t.id)} className={`flex items-center gap-3 ${selected === t.id ? 'ring-2 ring-red-500' : ''}`}>
            <div className="text-2xl">{t.icon}</div>
            <div className="flex-1">
              <div className="font-medium text-sm">{t.label}</div>
              <div className="text-xs text-slate-500">{t.desc}</div>
            </div>
            {selected === t.id && <span className="text-red-500">✓</span>}
          </Card>
        ))}
        <div className="text-xs text-slate-400 text-center pt-2">We will connect you with the nearest ambulance</div>
      </div>
      <div className="p-4">
        <Button variant="danger" onClick={() => navigate('/sos/finding', { state: { emergency_type: types.find((t) => t.id === selected).label } })}>
          Continue
        </Button>
      </div>
    </div>
  );
}
