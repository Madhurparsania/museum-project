const mongoose = require('mongoose');

const slotAvailabilitySchema = new mongoose.Schema({
  museumId: String,
  date: String,
  slots: {
    type: Map,
    of: Number
  }
});

slotAvailabilitySchema.index({ museumId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('SlotAvailability', slotAvailabilitySchema);
