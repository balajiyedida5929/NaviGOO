const express = require('express');
const db = require('../db');
const { uuid, save } = db;

const router = express.Router();

router.get('/delivery-items', (req, res) => {
  const { category } = req.query;
  let rows = db.data.deliveryItems;
  if (category) rows = rows.filter((i) => i.category === category);
  res.json(rows);
});

router.post('/delivery-requests', (req, res) => {
  const { from_location, to_location, junction_point, items } = req.body;
  const partner = db.data.deliveryPartners[Math.floor(Math.random() * db.data.deliveryPartners.length)];

  const total = (items || []).reduce((sum, it) => sum + it.price * (it.qty || 1), 0);
  const id = uuid();
  const payload = {
    booking_id: 'DEL' + Date.now(),
    from_location, to_location, junction_point, items, total,
    partner,
    stages: ['Order Received', 'Packing', 'On the Way', 'Delivered'],
    current_stage: 0,
  };
  const booking = { id, type: 'delivery', status: 'confirmed', created_at: new Date().toISOString(), ...payload };
  db.data.bookings.unshift(booking);
  save();
  res.status(201).json(booking);
});

router.patch('/delivery-requests/:id/advance', (req, res) => {
  const booking = db.data.bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Not found' });
  booking.current_stage = Math.min(booking.current_stage + 1, booking.stages.length - 1);
  booking.status = booking.current_stage === booking.stages.length - 1 ? 'completed' : 'in_progress';
  save();
  res.json(booking);
});

module.exports = router;
