const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// GET /api/payments — all payments
router.get('/', async (req, res) => {
  try {
    const { status, method } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (method) filter.method = method;
    const payments = await Payment.find(filter).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/payments — create payment
router.post('/', async (req, res) => {
  try {
    const count = await Payment.countDocuments();
    const paymentId = `PAY${String(count + 1).padStart(3, '0')}`;
    const now = new Date();
    const payment = new Payment({
      ...req.body,
      paymentId,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
