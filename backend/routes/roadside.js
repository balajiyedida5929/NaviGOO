const express = require('express');
const db = require('../db');
const { uuid, save } = db;

const router = express.Router();

router.get('/mechanics', (req, res) => {
  const rows = [...db.data.mechanics].sort((a, b) => a.distance_km - b.distance_km);
  res.json(rows);
});

router.get('/mechanics/:id', (req, res) => {
  const m = db.data.mechanics.find((m) => m.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Mechanic not found' });
  res.json(m);
});

router.post('/roadside-requests', (req, res) => {
  const { vehicle_type, problem, location, mechanic_id } = req.body;
  const mechanic = db.data.mechanics.find((m) => m.id === mechanic_id);
  if (!mechanic) return res.status(404).json({ error: 'Mechanic not found' });

  const id = uuid();
  const payload = {
    booking_id: 'RA' + Date.now(),
    vehicle_type, problem, location,
    mechanic,
    charges_estimate: mechanic.price,
    eta_min: mechanic.eta_min,
  };
  const booking = { id, type: 'roadside', status: 'confirmed', created_at: new Date().toISOString(), ...payload };
  db.data.bookings.unshift(booking);
  save();
  res.status(201).json(booking);
});

router.patch('/roadside-requests/:id/status', (req, res) => {
  const { status } = req.body;
  const booking = db.data.bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Not found' });
  booking.status = status;
  save();
  res.json({ id: req.params.id, status });
});

module.exports = router;
