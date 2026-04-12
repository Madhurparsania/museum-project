const mongoose = require('mongoose');

const chatbotResponseSchema = new mongoose.Schema({
  lang: { type: String, unique: true },
  greeting: String,
  languageSelected: String,
  mainMenu: String,
  booking: {
    start: String,
    selectDate: String,
    selectTimeSlot: String,
    selectCategory: String,
    selectQuantity: String,
    paymentRedirect: String,
    success: String,
    cancelled: String,
    slotFull: String
  },
  info: {
    menu: String,
    history: String,
    hours: String,
    rules: String,
    location: String
  },
  faq: {
    menu: String,
    cancel: String,
    parking: String,
    wheelchair: String,
    cafe: String,
    guidedTour: String
  },
  fallback: String,
  thanks: String,
  backToMenu: String
});

module.exports = mongoose.model('ChatbotResponse', chatbotResponseSchema);
