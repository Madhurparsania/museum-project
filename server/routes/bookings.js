const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET /api/bookings — all bookings (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { museumId, status, date } = req.query;
    const filter = {};
    if (museumId) filter.museumId = museumId;
    if (status) filter.status = status;
    if (date) filter.date = date;
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/:id — one booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings — create new booking
router.post('/', async (req, res) => {
  try {
    // Auto-generate bookingId
    const count = await Booking.countDocuments();
    const bookingId = `BK${String(count + 1).padStart(3, '0')}`;
    const booking = new Booking({
      ...req.body,
      bookingId,
      bookedOn: new Date().toISOString().split('T')[0]
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/bookings/:id — update booking status
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.id },
      req.body,
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
