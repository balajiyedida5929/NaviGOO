import { useLocation, useNavigate } from 'react-router-dom';
import { TopBar, Card } from '../../components/UI.jsx';

const problems = [
  { id: 'battery', label: 'Battery Down', icon: '🔋' },
  { id: 'tyre', label: 'Tyre Puncture', icon: '🛞' },
  { id: 'engine', label: 'Engine Problem', icon: '⚙️' },
  { id: 'overheat', label: 'Overheating', icon: '🌡️' },
  { id: 'fuel', label: 'Fuel Assistance', icon: '⛽' },
  { id: 'accident', label: 'Accident Help', icon: '⚠️' },
  { id: 'other', label: 'Other Issues', icon: '⋯', full: true },
];

export default function SelectProblem() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const choose = (label) => navigate('/roadside/finding', { state: { ...state, problem: label } });

  return (
    <div className="app-shell">
      <TopBar title="Roadside Assistance" subtitle="Select the type of assistance you need" />
      <div className="p-4 flex-1">
        <div className="font-semibold text-slate-700 mb-3">What's the Problem?</div>
        <div className="grid grid-cols-2 gap-3">
          {problems.map((p) => (
            <Card key={p.id} onClick={() => choose(p.label)} className={`flex flex-col items-center justify-center gap-2 py-6 ${p.full ? 'col-span-2' : ''}`}>
              <div className="text-3xl">{p.icon}</div>
              <div className="text-sm font-medium text-slate-700">{p.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
