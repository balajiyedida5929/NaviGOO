const express = require('express');
const db = require('../db');
const { uuid, save } = db;

const router = express.Router();

router.get('/vehicles', (req, res) => {
  const { category, search } = req.query;
  let rows = db.data.vehicles;
  if (category && category !== 'All') rows = rows.filter((v) => v.category === category);
  if (search) rows = rows.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));
  res.json(rows);
});

router.get('/vehicles/:id', (req, res) => {
  const v = db.data.vehicles.find((v) => v.id === req.params.id);
  if (!v) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(v);
});

router.post('/bookings/self-drive', (req, res) => {
  const { vehicle_id, pickup_location, pickup_datetime, return_datetime } = req.body;
  const vehicle = db.data.vehicles.find((v) => v.id === vehicle_id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

  const base = vehicle.price_per_day;
  const taxes = Math.round(base * 0.18);
  const deposit = 2000;
  const total = base + taxes + deposit;

  const id = uuid();
  const payload = {
    booking_id: 'SD' + Date.now(),
    vehicle: { id: vehicle.id, name: vehicle.name, transmission: vehicle.transmission, fuel: vehicle.fuel, seats: vehicle.seats, color: 'White', plate: 'TS10 AB ' + Math.floor(1000 + Math.random() * 9000) },
    pickup_location, pickup_datetime, return_datetime,
    fare: { base, taxes, deposit, total },
    owner: { name: 'Ramesh Kumar', phone: '+91 98765 43210' },
  };
  const booking = { id, type: 'self_drive', status: 'confirmed', created_at: new Date().toISOString(), ...payload };
  db.data.bookings.unshift(booking);
  save();
  res.status(201).json(booking);
});

router.get('/driver-vehicles', (req, res) => res.json(db.data.driverVehicles));

router.post('/bookings/cars-with-driver', (req, res) => {
  const { vehicle_id, from_location, to_location, departure_time, passengers, trip_type } = req.body;
  const vehicle = db.data.driverVehicles.find((v) => v.id === vehicle_id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  const driver = db.data.drivers[Math.floor(Math.random() * db.data.drivers.length)];

  const base = vehicle.price_one_way * (trip_type === 'round_trip' ? 2 : 1);
  const toll = 300;
  const total = base + toll;

  const id = uuid();
  const payload = {
    booking_id: 'WD' + Date.now(),
    vehicle: { name: vehicle.name, category: vehicle.category, seats: vehicle.seats },
    driver,
    from_location, to_location, departure_time, passengers, trip_type,
    fare: { base, toll, total },
  };
  const booking = { id, type: 'cars_with_driver', status: 'confirmed', created_at: new Date().toISOString(), ...payload };
  db.data.bookings.unshift(booking);
  save();
  res.status(201).json(booking);
});

module.exports = router;
