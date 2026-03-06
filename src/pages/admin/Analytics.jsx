import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { analyticsData } from '../../data/mockAnalytics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const chartBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF' } },
    },
    scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 }, color: '#9CA3AF' } },
        y: { grid: { color: '#E5E7EB40' }, ticks: { font: { family: 'Inter', size: 10 }, color: '#9CA3AF' } },
    },
};

export default function Analytics() {
    const monthlyVisitorData = {
        labels: analyticsData.monthlyVisitors.labels,
        datasets: [{
            label: 'Monthly Visitors',
            data: analyticsData.monthlyVisitors.data,
            borderColor: '#1E3A8A',
            backgroundColor: 'rgba(30, 58, 138, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#1E3A8A',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
        }],
    };

    const revenueData = {
        labels: analyticsData.revenueMonthly.labels,
        datasets: [{
            label: 'Revenue (₹)',
            data: analyticsData.revenueMonthly.data,
            backgroundColor: '#D4AF37',
            borderRadius: 6,
        }],
    };

    const languageData = {
        labels: analyticsData.languagePreference.labels,
        datasets: [{
            data: analyticsData.languagePreference.data,
            backgroundColor: analyticsData.languagePreference.colors,
            borderWidth: 0,
        }],
    };

    const paymentData = {
        labels: analyticsData.paymentMethods.labels,
        datasets: [{
            data: analyticsData.paymentMethods.data,
            backgroundColor: analyticsData.paymentMethods.colors,
            borderWidth: 0,
        }],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: { position: 'bottom', labels: { padding: 12, font: { size: 10, family: 'Inter' }, color: '#9CA3AF' } },
        },
    };

    return (
        <div className="space-y-6">
            {/* Row 1 */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="admin-card">
                    <h3 className="font-heading font-bold text-navy mb-4">Monthly Visitor Trend</h3>
                    <div className="h-72">
                        <Line data={monthlyVisitorData} options={chartBase} />
                    </div>
                </div>
                <div className="admin-card">
                    <h3 className="font-heading font-bold text-navy mb-4">Revenue Trend (Monthly)</h3>
                    <div className="h-72">
                        <Bar data={revenueData} options={chartBase} />
                    </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="admin-card">
                    <h3 className="font-heading font-bold text-navy mb-4">Language Preferences</h3>
                    <div className="h-72 flex items-center justify-center">
                        <Doughnut data={languageData} options={doughnutOptions} />
                    </div>
                </div>
                <div className="admin-card">
                    <h3 className="font-heading font-bold text-navy mb-4">Payment Methods</h3>
                    <div className="h-72 flex items-center justify-center">
                        <Pie data={paymentData} options={doughnutOptions} />
                    </div>
                </div>
            </div>

            {/* Summary Stats Table */}
            <div className="admin-card">
                <h3 className="font-heading font-bold text-navy mb-4">Key Metrics Summary</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Avg. Daily Visitors', value: '391', change: '+5.2%' },
                        { label: 'Avg. Revenue/Day', value: '₹13,900', change: '+8.1%' },
                        { label: 'Avg. Rating', value: '4.6/5', change: '+0.1' },
                        { label: 'Repeat Visitors', value: '23%', change: '+2.3%' },
                    ].map((metric, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-navy">{metric.value}</p>
                            <p className="text-xs text-lgray-dark mt-1">{metric.label}</p>
                            <p className="text-xs text-green-500 font-medium mt-1">{metric.change}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
