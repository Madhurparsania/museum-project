const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Museum = require('../models/Museum');
const seedMuseums = require('../seed/data/museums');

function normalizeMuseum(museum) {
  const obj = museum?.toObject ? museum.toObject() : museum;
  if (!obj) return null;
  return { ...obj, id: obj._id || obj.id };
}

function getSeedMuseums() {
  return seedMuseums.map(normalizeMuseum).filter(Boolean);
}

// GET /api/museums — all museums
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getSeedMuseums());
    }
    const museums = await Museum.find();
    if (!museums.length) {
      return res.json(getSeedMuseums());
    }
    res.json(museums.map(normalizeMuseum));
  } catch (err) {
    console.error('Museums list query failed, using seed fallback:', err.message);
    res.json(getSeedMuseums());
  }
});

// GET /api/museums/:id — one museum by ID
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const museum = getSeedMuseums().find((m) => m.id === req.params.id);
      if (!museum) return res.status(404).json({ error: 'Museum not found' });
      return res.json(museum);
    }
    const museum = await Museum.findById(req.params.id);
    if (!museum) {
      const fallbackMuseum = getSeedMuseums().find((m) => m.id === req.params.id);
      if (!fallbackMuseum) return res.status(404).json({ error: 'Museum not found' });
      return res.json(fallbackMuseum);
    }
    res.json(normalizeMuseum(museum));
  } catch (err) {
    console.error(`Museum ${req.params.id} query failed, using seed fallback:`, err.message);
    const museum = getSeedMuseums().find((m) => m.id === req.params.id);
    if (!museum) return res.status(404).json({ error: 'Museum not found' });
    res.json(museum);
  }
});

// PUT /api/museums/:id — update museum
router.put('/:id', async (req, res) => {
  try {
    const museum = await Museum.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!museum) return res.status(404).json({ error: 'Museum not found' });
    res.json(museum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
