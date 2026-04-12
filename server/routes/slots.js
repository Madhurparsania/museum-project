const express = require('express');
const router = express.Router();
const SlotAvailability = require('../models/SlotAvailability');

// GET /api/slots/:museumId/:date — get availability for a museum on a date
router.get('/:museumId/:date', async (req, res) => {
  try {
    const { museumId, date } = req.params;
    let slotData = await SlotAvailability.findOne({ museumId, date });
    if (!slotData) {
      // Return default full capacity if no record exists for this date
      const Museum = require('../models/Museum');
      const museum = await Museum.findById(museumId);
      if (!museum) return res.status(404).json({ error: 'Museum not found' });
      const defaultSlots = {};
      museum.timeSlots.forEach(ts => {
        defaultSlots[ts.id] = ts.maxCapacity;
      });
      slotData = { museumId, date, slots: defaultSlots };
    }
    res.json(slotData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/slots/:museumId/:date — decrement availability after booking
router.patch('/:museumId/:date', async (req, res) => {
  try {
    const { museumId, date } = req.params;
    const { slotId, quantity } = req.body;

    let slotData = await SlotAvailability.findOne({ museumId, date });
    if (!slotData) {
      const Museum = require('../models/Museum');
      const museum = await Museum.findById(museumId);
      const defaultSlots = {};
      museum.timeSlots.forEach(ts => {
        defaultSlots[ts.id] = ts.maxCapacity;
      });
      slotData = new SlotAvailability({ museumId, date, slots: defaultSlots });
    }

    const current = slotData.slots.get(slotId) || 0;
    if (current < quantity) {
      return res.status(400).json({ error: 'Not enough slots available' });
    }
    slotData.slots.set(slotId, current - quantity);
    await slotData.save();
    res.json(slotData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
