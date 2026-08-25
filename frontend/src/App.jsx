import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import MyServices from './pages/MyServices.jsx';
import Profile from './pages/Profile.jsx';

import SelfDriveHub from './pages/SelfDrive/Hub.jsx';
import RentalsList from './pages/SelfDrive/RentalsList.jsx';
import CarDetails from './pages/SelfDrive/CarDetails.jsx';
import BookingSummary from './pages/SelfDrive/BookingSummary.jsx';
import TrackingSelfDrive from './pages/SelfDrive/TrackingSelfDrive.jsx';

import RequestRide from './pages/CarsWithDriver/RequestRide.jsx';
import RideConfirmation from './pages/CarsWithDriver/RideConfirmation.jsx';
import TrackingDriver from './pages/CarsWithDriver/TrackingDriver.jsx';

import SelectVehicle from './pages/Roadside/SelectVehicle.jsx';
import SelectProblem from './pages/Roadside/SelectProblem.jsx';
import FindingMechanics from './pages/Roadside/FindingMechanics.jsx';
import MechanicsList from './pages/Roadside/MechanicsList.jsx';
import MechanicDetails from './pages/Roadside/MechanicDetails.jsx';
import ConfirmRequest from './pages/Roadside/ConfirmRequest.jsx';
import TrackingMechanic from './pages/Roadside/TrackingMechanic.jsx';
import HelpArrived from './pages/Roadside/HelpArrived.jsx';

import RouteDelivery from './pages/Delivery/RouteDelivery.jsx';
import DeliveryTracking from './pages/Delivery/DeliveryTracking.jsx';
import DeliveryComplete from './pages/Delivery/DeliveryComplete.jsx';

import SOSHome from './pages/SOS/SOSHome.jsx';
import SelectEmergencyType from './pages/SOS/SelectEmergencyType.jsx';
import FindingAmbulance from './pages/SOS/FindingAmbulance.jsx';
import TrackingAmbulance from './pages/SOS/TrackingAmbulance.jsx';
import TripCompleted from './pages/SOS/TripCompleted.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-services" element={<MyServices />} />
      <Route path="/profile" element={<Profile />} />

      {/* Self-Drive Rentals & Cars With Driver */}
      <Route path="/self-drive" element={<SelfDriveHub />} />
      <Route path="/self-drive/rentals" element={<RentalsList />} />
      <Route path="/self-drive/:id" element={<CarDetails />} />
      <Route path="/self-drive/:id/book" element={<BookingSummary />} />
      <Route path="/self-drive/track/:id" element={<TrackingSelfDrive />} />

      <Route path="/self-drive/cars-with-driver" element={<RequestRide />} />
      <Route path="/self-drive/cars-with-driver/confirm" element={<RideConfirmation />} />
      <Route path="/self-drive/cars-with-driver/track/:id" element={<TrackingDriver />} />

      {/* Roadside Assistance */}
      <Route path="/roadside" element={<SelectVehicle />} />
      <Route path="/roadside/problem" element={<SelectProblem />} />
      <Route path="/roadside/finding" element={<FindingMechanics />} />
      <Route path="/roadside/mechanics" element={<MechanicsList />} />
      <Route path="/roadside/mechanics/:id" element={<MechanicDetails />} />
      <Route path="/roadside/confirm" element={<ConfirmRequest />} />
      <Route path="/roadside/confirmed/:id" element={<TrackingMechanic />} />
      <Route path="/roadside/arrived/:id" element={<HelpArrived />} />

      {/* Route Based Delivery */}
      <Route path="/delivery" element={<RouteDelivery />} />
      <Route path="/delivery/tracking" element={<DeliveryTracking />} />
      <Route path="/delivery/complete/:id" element={<DeliveryComplete />} />

      {/* SOS Emergency */}
      <Route path="/sos" element={<SOSHome />} />
      <Route path="/sos/type" element={<SelectEmergencyType />} />
      <Route path="/sos/finding" element={<FindingAmbulance />} />
      <Route path="/sos/tracking/:id" element={<TrackingAmbulance />} />
      <Route path="/sos/complete/:id" element={<TripCompleted />} />
    </Routes>
  );
}
