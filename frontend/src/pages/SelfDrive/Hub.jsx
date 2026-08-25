import { useNavigate } from 'react-router-dom';
import { TopBar, Card } from '../../components/UI.jsx';

export default function Hub() {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <TopBar title="Self-Drive Rentals & Cars With Drivers" />
      <div className="p-4 space-y-4 flex-1">
        <Card onClick={() => navigate('/self-drive/rentals')} className="flex items-center gap-4">
          <div className="text-4xl">🚗</div>
          <div>
            <div className="font-semibold">Self-Drive Rentals</div>
            <div className="text-xs text-slate-500">Pick a car, drive it yourself</div>
          </div>
        </Card>
        <Card onClick={() => navigate('/self-drive/cars-with-driver')} className="flex items-center gap-4">
          <div className="text-4xl">🧑‍✈️</div>
          <div>
            <div className="font-semibold">Cars With Driver</div>
            <div className="text-xs text-slate-500">Book a car with a driver, one way or round trip</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
