const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, unique: true },
  bookingId: String,
  amount: Number,
  method: { type: String, enum: ['UPI', 'Card', 'Net Banking', 'Wallet'] },
  status: { type: String, enum: ['Success', 'Failed', 'Refunded'], default: 'Success' },
  date: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
