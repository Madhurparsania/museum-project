import { mockPayments } from '../../data/mockBookings';
import { FaMoneyBillWave, FaCheckCircle, FaUndo } from 'react-icons/fa';

const statusIcons = {
    Success: { icon: FaCheckCircle, color: 'text-green-500 bg-green-50' },
    Refunded: { icon: FaUndo, color: 'text-orange-500 bg-orange-50' },
};

export default function Payments() {
    const totalRevenue = mockPayments.filter(p => p.status === 'Success').reduce((sum, p) => sum + p.amount, 0);
    const totalRefunded = mockPayments.filter(p => p.status === 'Refunded').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
                <div className="stat-card">
                    <FaMoneyBillWave className="text-green-500 text-2xl mb-2" />
                    <p className="text-2xl font-bold text-navy">₹{totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-lgray-dark">Total Revenue</p>
                </div>
                <div className="stat-card">
                    <p className="text-2xl font-bold text-navy">{mockPayments.filter(p => p.status === 'Success').length}</p>
                    <p className="text-sm text-lgray-dark">Successful Payments</p>
                </div>
                <div className="stat-card">
                    <p className="text-2xl font-bold text-orange-500">₹{totalRefunded.toLocaleString()}</p>
                    <p className="text-xs text-lgray-dark">Total Refunded</p>
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-navy text-soft-white">
                                <th className="text-left px-4 py-3 font-medium">Payment ID</th>
                                <th className="text-left px-4 py-3 font-medium">Booking ID</th>
                                <th className="text-right px-4 py-3 font-medium">Amount</th>
                                <th className="text-left px-4 py-3 font-medium">Method</th>
                                <th className="text-left px-4 py-3 font-medium">Date & Time</th>
                                <th className="text-center px-4 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockPayments.map((p) => {
                                const statusInfo = statusIcons[p.status] || statusIcons.Success;
                                return (
                                    <tr key={p.id} className="border-b border-lgray/30 hover:bg-gold/5 transition-colors">
                                        <td className="px-4 py-3 font-mono font-medium text-royal">{p.id}</td>
                                        <td className="px-4 py-3 font-mono text-lgray-dark">{p.bookingId}</td>
                                        <td className="px-4 py-3 text-right font-bold text-gold">₹{p.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2.5 py-1 bg-lgray/30 rounded-lg text-xs font-medium text-navy">
                                                {p.method}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-lgray-dark">
                                            {p.date} <span className="text-xs text-lgray-dark ml-1">{p.time}</span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                                                <statusInfo.icon size={10} />
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
