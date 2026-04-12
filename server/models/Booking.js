const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  museumId: String,
  visitor: String,
  email: String,
  mobile: String,
  date: String,
  timeSlot: String,
  category: String,
  quantity: Number,
  total: Number,
  status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Pending' },
  paymentId: String,
  bookedOn: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
