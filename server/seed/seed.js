const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const Museum = require('../models/Museum');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const SlotAvailability = require('../models/SlotAvailability');
const ChatbotResponse = require('../models/ChatbotResponse');
const Language = require('../models/Language');

const museums = require('./data/museums');
const bookings = require('./data/bookings');
const payments = require('./data/payments');
const slotAvailability = require('./data/slotAvailability');
const chatbotResponses = require('./data/chatbotResponses');
const languages = require('./data/languages');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Museum.deleteMany({});
    await Booking.deleteMany({});
    await Payment.deleteMany({});
    await SlotAvailability.deleteMany({});
    await ChatbotResponse.deleteMany({});
    await Language.deleteMany({});
    console.log('🗑️  Cleared existing collections');

    // Seed
    await Museum.insertMany(museums);
    console.log(`✅ Seeded ${museums.length} museums`);

    await Booking.insertMany(bookings);
    console.log(`✅ Seeded ${bookings.length} bookings`);

    await Payment.insertMany(payments);
    console.log(`✅ Seeded ${payments.length} payments`);

    await SlotAvailability.insertMany(slotAvailability);
    console.log(`✅ Seeded ${slotAvailability.length} slot availability records`);

    await ChatbotResponse.insertMany(chatbotResponses);
    console.log(`✅ Seeded ${chatbotResponses.length} chatbot responses`);

    await Language.insertMany(languages);
    console.log(`✅ Seeded ${languages.length} languages`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
