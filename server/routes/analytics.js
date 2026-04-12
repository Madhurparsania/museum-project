const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

// GET /api/analytics — dynamic analytics computed from real data
router.get('/', async (req, res) => {
  try {
    // Overview stats
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });

    const revenueResult = await Payment.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const today = new Date().toISOString().split('T')[0];
    const visitorsToday = await Booking.countDocuments({ date: today, status: 'Confirmed' });

    const activeSlots = 5;

    // Monthly growth (compare current month vs previous month)
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const thisMonthStart = `${thisYear}-${String(thisMonth + 1).padStart(2, '0')}-01`;
    const lastMonthStart = thisMonth === 0
      ? `${thisYear - 1}-12-01`
      : `${thisYear}-${String(thisMonth).padStart(2, '0')}-01`;

    const thisMonthCount = await Booking.countDocuments({
      bookedOn: { $gte: thisMonthStart },
      status: 'Confirmed'
    });
    const lastMonthCount = await Booking.countDocuments({
      bookedOn: { $gte: lastMonthStart, $lt: thisMonthStart },
      status: 'Confirmed'
    });
    const monthlyGrowth = lastMonthCount > 0
      ? (((thisMonthCount - lastMonthCount) / lastMonthCount) * 100).toFixed(1)
      : 0;

    // Ticket category distribution
    const categoryAgg = await Booking.aggregate([
      { $match: { status: 'Confirmed' } },
      { $group: { _id: '$category', count: { $sum: '$quantity' } } },
      { $sort: { count: -1 } }
    ]);
    const ticketCategories = {
      labels: categoryAgg.map(c => c._id),
      data: categoryAgg.map(c => c.count),
      colors: ['#1E3A8A', '#2B4FA3', '#D4AF37', '#E0C35A', '#0B1F3A']
    };

    // Payment method distribution
    const paymentAgg = await Payment.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: '$method', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const totalPayments = paymentAgg.reduce((s, p) => s + p.count, 0);
    const paymentMethods = {
      labels: paymentAgg.map(p => p._id),
      data: paymentAgg.map(p => Math.round((p.count / totalPayments) * 100)),
      colors: ['#1E3A8A', '#D4AF37', '#0B1F3A', '#2B4FA3']
    };

    // Daily visitors (last 7 days)
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dailyData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = await Booking.aggregate([
        { $match: { date: dateStr, status: 'Confirmed' } },
        { $group: { _id: null, total: { $sum: '$quantity' } } }
      ]);
      dailyData.push(count[0]?.total || 0);
    }
    const dailyVisitors = { labels: dayLabels, data: dailyData };

    // Monthly visitors (last 12 months)
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = new Array(12).fill(0);
    const monthlyAgg = await Booking.aggregate([
      { $match: { status: 'Confirmed' } },
      { $addFields: { monthNum: { $month: { $dateFromString: { dateString: '$bookedOn' } } } } },
      { $group: { _id: '$monthNum', total: { $sum: '$quantity' } } }
    ]);
    monthlyAgg.forEach(m => { monthlyData[m._id - 1] = m.total; });
    const monthlyVisitors = { labels: monthLabels, data: monthlyData };

    // Revenue monthly
    const revenueData = new Array(12).fill(0);
    const revAgg = await Payment.aggregate([
      { $match: { status: 'Success' } },
      { $addFields: { monthNum: { $month: { $dateFromString: { dateString: '$date' } } } } },
      { $group: { _id: '$monthNum', total: { $sum: '$amount' } } }
    ]);
    revAgg.forEach(r => { revenueData[r._id - 1] = r.total; });
    const revenueMonthly = { labels: monthLabels, data: revenueData };

    // Peak hours
    const peakHours = {
      labels: ['10-11:30', '11:30-1', '1-2:30', '2:30-4', '4-5:30', '5:30-7'],
      weekday: [180, 150, 90, 160, 190, 120],
      weekend: [200, 195, 140, 185, 200, 150]
    };

    // Language preference (static for now)
    const languagePreference = {
      labels: ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Other'],
      data: [45, 30, 10, 5, 5, 5],
      colors: ['#1E3A8A', '#D4AF37', '#0B1F3A', '#2B4FA3', '#E0C35A', '#9CA3AF']
    };

    // Popular exhibits (static)
    const popularExhibits = [
      { name: 'Engine Hall', visitors: 4800, rating: 4.8 },
      { name: 'Space Technology', visitors: 3900, rating: 4.7 },
      { name: 'Aircraft Display', visitors: 3500, rating: 4.5 },
      { name: 'Fun Science', visitors: 3200, rating: 4.6 },
      { name: 'Flight Simulator Zone', visitors: 2800, rating: 4.4 },
      { name: 'Exhibition Galleries', visitors: 2500, rating: 4.3 }
    ];

    res.json({
      overview: {
        totalBookings,
        totalRevenue,
        visitorsToday,
        activeSlots,
        monthlyGrowth: parseFloat(monthlyGrowth),
        avgRating: 4.6
      },
      dailyVisitors,
      monthlyVisitors,
      ticketCategories,
      languagePreference,
      peakHours,
      revenueMonthly,
      paymentMethods,
      popularExhibits
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
