const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('node:crypto');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Initialize Razorpay
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const razorpayConfigured = Boolean(razorpayKeyId && razorpayKeySecret);

const razorpay = razorpayConfigured
  ? new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })
  : null;

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

// POST /api/payments/create-order — create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    if (!razorpayConfigured || !razorpay) {
      return res.status(503).json({ error: 'Payment gateway is not configured' });
    }

    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('Razorpay Order Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/payments/verify — verify Razorpay signature
router.post('/verify', async (req, res) => {
  try {
    if (!razorpayConfigured || !razorpay) {
      return res.status(503).json({ error: 'Payment gateway is not configured' });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
      amount
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment Verified!
      const now = new Date();
      
      // 1. Create Payment record
      const payment = new Payment({
        paymentId: razorpay_payment_id,
        bookingId: bookingId,
        amount: amount,
        method: req.body.method || 'Card',
        status: 'Success',
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      });
      await payment.save();

      // 2. Update Booking status
      if (bookingId) {
        await Booking.findOneAndUpdate(
          { bookingId: bookingId },
          { status: 'Confirmed', paymentId: razorpay_payment_id }
        );
      }

      return res.json({ status: 'success', message: 'Payment verified successfully', paymentId: razorpay_payment_id });
    } else {
      return res.status(400).json({ status: 'error', message: 'Invalid signature' });
    }
  } catch (err) {
    console.error('Verification Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
