import { useNavigate } from 'react-router-dom';
import { TopBar, Card } from '../../components/UI.jsx';

const vehicleTypes = [
  { id: 'two_wheeler', label: 'Two Wheeler', icon: '🏍️' },
  { id: 'three_wheeler', label: 'Three Wheeler', icon: '🛺' },
  { id: 'car_suv', label: 'Car / SUV', icon: '🚗' },
  { id: 'truck_lcv', label: 'Truck / LCV', icon: '🚚' },
  { id: 'bus', label: 'Bus', icon: '🚌' },
];

export default function SelectVehicle() {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <TopBar title="Roadside Assistance" subtitle="Choose your vehicle to continue" />
      <div className="p-4 space-y-3 flex-1">
        {vehicleTypes.map((v) => (
          <Card key={v.id} onClick={() => navigate('/roadside/problem', { state: { vehicle_type: v.label } })} className="flex items-center gap-4">
            <div className="text-2xl">{v.icon}</div>
            <div className="flex-1 font-medium">{v.label}</div>
            <span className="text-slate-400">›</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
