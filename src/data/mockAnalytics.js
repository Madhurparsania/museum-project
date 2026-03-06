export const analyticsData = {
    overview: {
        totalBookings: 1247,
        totalRevenue: 485600,
        visitorsToday: 342,
        activeSlots: 5,
        monthlyGrowth: 12.5,
        avgRating: 4.6,
    },

    dailyVisitors: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [280, 310, 245, 390, 420, 580, 510],
    },

    monthlyVisitors: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [4200, 3800, 5100, 4600, 5800, 6200, 7100, 6800, 5400, 4900, 4100, 5500],
    },

    ticketCategories: {
        labels: ['Adult', 'Child', 'Senior Citizen', 'Student', 'Foreign National'],
        data: [480, 220, 150, 280, 117],
        colors: ['#1E3A8A', '#2B4FA3', '#D4AF37', '#E0C35A', '#0B1F3A'],
    },

    languagePreference: {
        labels: ['English', 'Hindi', 'Arabic', 'French', 'Spanish', 'Other'],
        data: [45, 30, 10, 5, 5, 5],
        colors: ['#1E3A8A', '#D4AF37', '#0B1F3A', '#2B4FA3', '#E0C35A', '#9CA3AF'],
    },

    peakHours: {
        labels: ['10-11:30', '11:30-1', '1-2:30', '2:30-4', '4-5:30', '5:30-7'],
        weekday: [180, 150, 90, 160, 190, 120],
        weekend: [200, 195, 140, 185, 200, 150],
    },

    revenueMonthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [125000, 112000, 158000, 140000, 175000, 192000, 218000, 205000, 168000, 152000, 128000, 170000],
    },

    paymentMethods: {
        labels: ['UPI', 'Card', 'Net Banking', 'Wallet'],
        data: [55, 25, 12, 8],
        colors: ['#1E3A8A', '#D4AF37', '#0B1F3A', '#2B4FA3'],
    },

    popularExhibits: [
        { name: 'Ancient Civilizations', visitors: 4800, rating: 4.8 },
        { name: 'Natural History', visitors: 3900, rating: 4.7 },
        { name: 'Modern Art Gallery', visitors: 3500, rating: 4.5 },
        { name: 'Science & Innovation', visitors: 3200, rating: 4.6 },
        { name: 'Medieval Art', visitors: 2800, rating: 4.4 },
        { name: 'Cultural Heritage', visitors: 2500, rating: 4.3 },
    ],
};
