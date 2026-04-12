const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String,
  flag: String
});

module.exports = mongoose.model('Language', languageSchema);
