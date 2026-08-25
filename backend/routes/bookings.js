const express = require('express');
const db = require('../db');
const { save } = db;

const router = express.Router();

router.get('/bookings', (req, res) => {
  const { type } = req.query;
  let rows = db.data.bookings;
  if (type) rows = rows.filter((b) => b.type === type);
  res.json(rows);
});

router.get('/bookings/:id', (req, res) => {
  const b = db.data.bookings.find((b) => b.id === req.params.id);
  if (!b) return res.status(404).json({ error: 'Booking not found' });
  res.json(b);
});

router.patch('/bookings/:id/cancel', (req, res) => {
  const b = db.data.bookings.find((b) => b.id === req.params.id);
  if (!b) return res.status(404).json({ error: 'Booking not found' });
  b.status = 'cancelled';
  save();
  res.json({ id: req.params.id, status: 'cancelled' });
});

module.exports = router;
