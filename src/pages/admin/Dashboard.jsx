import { useState, useEffect } from 'react';
import { FaUsers, FaMoneyBillWave, FaCalendarCheck, FaClock, FaArrowUp, FaStar } from 'react-icons/fa';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        fetch('/api/analytics').then(r => r.json()).then(setAnalyticsData).catch(console.error);
    }, []);

    if (!analyticsData) return <div className="flex items-center justify-center py-20"><p className="text-lgray-dark">Loading analytics...</p></div>;

    const stats = [
        { label: 'Total Bookings', value: analyticsData.overview.totalBookings.toLocaleString(), change: `+${analyticsData.overview.monthlyGrowth}%`, icon: FaCalendarCheck, color: 'bg-royal' },
        { label: 'Revenue', value: `₹${analyticsData.overview.totalRevenue.toLocaleString()}`, change: '+8.3%', icon: FaMoneyBillWave, color: 'bg-green-600' },
        { label: 'Visitors Today', value: String(analyticsData.overview.visitorsToday), change: '+15%', icon: FaUsers, color: 'bg-gold' },
        { label: 'Active Slots', value: `${analyticsData.overview.activeSlots}/6`, change: '', icon: FaClock, color: 'bg-navy' },
    ];
    const lineData = {
        labels: analyticsData.dailyVisitors.labels,
        datasets: [{
            label: 'Daily Visitors',
            data: analyticsData.dailyVisitors.data,
            borderColor: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#D4AF37',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
        }],
    };

    const doughnutData = {
        labels: analyticsData.ticketCategories.labels,
        datasets: [{
            data: analyticsData.ticketCategories.data,
            backgroundColor: analyticsData.ticketCategories.colors,
            borderWidth: 0,
            hoverOffset: 8,
        }],
    };

    const barData = {
        labels: analyticsData.peakHours.labels,
        datasets: [
            {
                label: 'Weekday',
                data: analyticsData.peakHours.weekday,
                backgroundColor: '#1E3A8A',
                borderRadius: 6,
            },
            {
                label: 'Weekend',
                data: analyticsData.peakHours.weekend,
                backgroundColor: '#D4AF37',
                borderRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF' },
            },
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF' } },
            y: { grid: { color: '#E5E7EB40' }, ticks: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF' } },
        },
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="text-white text-lg" />
                            </div>
                            {stat.change && (
                                <span className="flex items-center gap-1 text-green-500 text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                                    <FaArrowUp size={8} /> {stat.change}
                                </span>
                            )}
                        </div>
                        <p className="text-2xl font-bold text-navy">{stat.value}</p>
                        <p className="text-xs text-lgray-dark mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Line Chart */}
                <div className="lg:col-span-2 admin-card">
                    <h3 className="font-heading font-bold text-navy mb-4">Visitor Trend (This Week)</h3>
                    <div className="h-64">
                        <Line data={lineData} options={chartOptions} />
                    </div>
                </div>

                {/* Doughnut */}
                <div className="admin-card">
                    <h3 className="font-heading font-bold text-navy mb-4">Ticket Categories</h3>
                    <div className="h-64 flex items-center justify-center">
                        <Doughnut data={doughnutData} options={{
                            ...chartOptions,
                            scales: undefined,
                            cutout: '65%',
                            plugins: {
                                ...chartOptions.plugins,
                                legend: { position: 'bottom', labels: { padding: 12, font: { size: 10, family: 'Inter' }, color: '#9CA3AF' } },
                            },
                        }} />
                    </div>
                </div>
            </div>

            {/* Peak Hours + Popular Exhibits */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="admin-card">
                    <h3 className="font-heading font-bold text-navy mb-4">Peak Hours Comparison</h3>
                    <div className="h-64">
                        <Bar data={barData} options={chartOptions} />
                    </div>
                </div>

                <div className="admin-card">
                    <h3 className="font-heading font-bold text-navy mb-4">Popular Exhibits</h3>
                    <div className="space-y-3">
                        {analyticsData.popularExhibits.map((exhibit, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gold/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center text-gold font-bold text-sm">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-navy">{exhibit.name}</p>
                                        <p className="text-xs text-lgray-dark">{exhibit.visitors.toLocaleString()} visitors</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-gold text-sm">
                                    <FaStar size={12} />
                                    <span className="font-medium">{exhibit.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
