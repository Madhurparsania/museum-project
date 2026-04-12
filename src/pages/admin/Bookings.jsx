import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye } from 'react-icons/fa';

const statusColors = {
    Confirmed: 'bg-green-50 text-green-600 border-green-200',
    Pending: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    Cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export default function Bookings() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('/api/bookings').then(r => r.json()).then(setBookings).catch(console.error);
    }, []);

    const filtered = bookings.filter((b) => {
        const matchSearch = b.visitor.toLowerCase().includes(search.toLowerCase()) ||
            b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
            b.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || b.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lgray-dark text-sm" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, ID, or email..."
                        className="input-field pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${statusFilter === status
                                    ? 'bg-navy text-gold'
                                    : 'bg-white border border-lgray text-lgray-dark hover:border-navy/30'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-navy text-soft-white">
                                <th className="text-left px-4 py-3 font-medium">Booking ID</th>
                                <th className="text-left px-4 py-3 font-medium">Visitor</th>
                                <th className="text-left px-4 py-3 font-medium">Date</th>
                                <th className="text-left px-4 py-3 font-medium">Time Slot</th>
                                <th className="text-left px-4 py-3 font-medium">Category</th>
                                <th className="text-center px-4 py-3 font-medium">Qty</th>
                                <th className="text-right px-4 py-3 font-medium">Total</th>
                                <th className="text-center px-4 py-3 font-medium">Status</th>
                                <th className="text-center px-4 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((b) => (
                                <tr key={b.bookingId} className="border-b border-lgray/30 hover:bg-gold/5 transition-colors">
                                    <td className="px-4 py-3 font-mono font-medium text-royal">{b.bookingId}</td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-navy">{b.visitor}</p>
                                        <p className="text-xs text-lgray-dark">{b.email}</p>
                                    </td>
                                    <td className="px-4 py-3 text-lgray-dark">{b.date}</td>
                                    <td className="px-4 py-3 text-lgray-dark text-xs">{b.timeSlot}</td>
                                    <td className="px-4 py-3 text-lgray-dark">{b.category}</td>
                                    <td className="px-4 py-3 text-center font-medium text-navy">{b.quantity}</td>
                                    <td className="px-4 py-3 text-right font-bold text-gold">₹{b.total.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[b.status]}`}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => setSelectedBooking(b)}
                                            className="w-8 h-8 bg-navy/5 hover:bg-navy hover:text-gold rounded-lg flex items-center justify-center mx-auto transition-all cursor-pointer"
                                        >
                                            <FaEye size={12} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="p-8 text-center text-lgray-dark">
                        No bookings found matching your criteria
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedBooking(null)}>
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-heading font-bold text-navy text-lg">Booking Details</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[selectedBooking.status]}`}>
                                {selectedBooking.status}
                            </span>
                        </div>
                        <div className="space-y-3 text-sm">
                            {[
                                ['Booking ID', selectedBooking.bookingId],
                                ['Visitor', selectedBooking.visitor],
                                ['Email', selectedBooking.email],
                                ['Visit Date', selectedBooking.date],
                                ['Time Slot', selectedBooking.timeSlot],
                                ['Category', selectedBooking.category],
                                ['Quantity', selectedBooking.quantity],
                                ['Total Amount', `₹${selectedBooking.total.toLocaleString()}`],
                                ['Payment ID', selectedBooking.paymentId || 'N/A'],
                                ['Booked On', selectedBooking.bookedOn],
                            ].map(([label, value]) => (
                                <div key={label} className="flex justify-between py-2 border-b border-lgray/20">
                                    <span className="text-lgray-dark">{label}</span>
                                    <span className="font-medium text-navy">{value}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="btn-gold w-full mt-6"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
