const express = require('express');
const router = express.Router();
const ChatbotResponse = require('../models/ChatbotResponse');
const Language = require('../models/Language');

// GET /api/chatbot/languages — all supported languages
router.get('/languages', async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chatbot/responses — all responses (for admin)
router.get('/responses', async (req, res) => {
  try {
    const responses = await ChatbotResponse.find();
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chatbot/responses/:lang — responses for a specific language
router.get('/responses/:lang', async (req, res) => {
  try {
    const response = await ChatbotResponse.findOne({ lang: req.params.lang });
    if (!response) return res.status(404).json({ error: 'Language not found' });
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/chatbot/responses/:lang — update responses for a language
router.put('/responses/:lang', async (req, res) => {
  try {
    const response = await ChatbotResponse.findOneAndUpdate(
      { lang: req.params.lang },
      req.body,
      { new: true }
    );
    if (!response) return res.status(404).json({ error: 'Language not found' });
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
