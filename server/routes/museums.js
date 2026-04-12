const express = require('express');
const router = express.Router();
const Museum = require('../models/Museum');

// GET /api/museums — all museums
router.get('/', async (req, res) => {
  try {
    const museums = await Museum.find();
    res.json(museums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/museums/:id — one museum by ID
router.get('/:id', async (req, res) => {
  try {
    const museum = await Museum.findById(req.params.id);
    if (!museum) return res.status(404).json({ error: 'Museum not found' });
    res.json(museum);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
