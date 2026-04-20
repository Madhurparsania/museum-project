const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema({
  _id: String,
  name: String,
  shortName: String,
  tagline: String,
  emoji: String,
  image: String,
  description: String,
  history: String,
  galleries: [{
    id: Number,
    name: String,
    description: String,
    image: String,
    items: Number
  }],
  artifacts: [{
    id: Number,
    name: String,
    era: String,
    details: String,
    image: String
  }],
  events: [{
    id: Number,
    title: String,
    date: String,
    time: String,
    description: String,
    price: String
  }],
  visitingHours: {
    regular: String,
    weekend: String,
    closed: String,
    lastEntry: String,
    specialNote: String
  },
  rules: [String],
  ticketCategories: [{
    id: String,
    name: String,
    price: Number,
    description: String
  }],
  timeSlots: [{
    id: String,
    time: String,
    maxCapacity: Number
  }],
  contact: {
    address: String,
    phone: String,
    email: String,
    website: String
  },
  aliases: [String],
  rating: Number,
  totalVisitors: String
});

module.exports = mongoose.model('Museum', museumSchema);
