const express = require('express');
const db = require('../db');
const { uuid, save } = db;

const router = express.Router();

router.get('/ambulances', (req, res) => res.json(db.data.ambulances));

router.post('/sos-requests', (req, res) => {
  const { emergency_type, location, hospital } = req.body;
  const ambulance = db.data.ambulances[Math.floor(Math.random() * db.data.ambulances.length)];

  const id = uuid();
  const payload = {
    booking_id: 'AMB' + Date.now(),
    emergency_type, location,
    ambulance,
    hospital: hospital || 'Government General Hospital',
    stages: ['Requested', 'Ambulance Found', 'On The Way', 'Arrived', 'En Route to Hospital', 'Arrived at Hospital', 'Completed'],
    current_stage: 0,
  };
  const booking = { id, type: 'sos', status: 'confirmed', created_at: new Date().toISOString(), ...payload };
  db.data.bookings.unshift(booking);
  save();
  res.status(201).json(booking);
});

router.patch('/sos-requests/:id/advance', (req, res) => {
  const booking = db.data.bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Not found' });
  booking.current_stage = Math.min(booking.current_stage + 1, booking.stages.length - 1);
  booking.status = booking.current_stage === booking.stages.length - 1 ? 'completed' : 'in_progress';
  save();
  res.json(booking);
});

module.exports = router;
