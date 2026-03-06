import { useLocation, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { FaCheckCircle, FaDownload, FaHome, FaTicketAlt } from 'react-icons/fa';

export default function Confirmation() {
    const location = useLocation();
    const booking = location.state;

    if (!booking) {
        return (
            <div className="min-h-screen bg-soft-white pt-20 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lgray-dark mb-4">No booking data found.</p>
                    <Link to="/book-tickets" className="btn-gold">Book Tickets</Link>
                </div>
            </div>
        );
    }

    const ticketQR = JSON.stringify({
        id: booking.bookingId,
        museum: 'National Museum',
        date: booking.date,
        time: booking.timeSlotLabel,
        tickets: booking.totalTickets,
    });

    return (
        <div className="min-h-screen bg-soft-white pt-20">
            <div className="bg-gradient-hero py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="animate-bounce-in">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="text-white text-4xl" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-soft-white mb-2 animate-fade-in">
                        Booking <span className="text-gradient-gold">Confirmed!</span>
                    </h1>
                    <p className="text-lgray animate-fade-in">Your tickets have been booked successfully</p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Ticket Card */}
                <div className="admin-card animate-slide-up overflow-hidden">
                    {/* Ticket Header */}
                    <div className="bg-navy -mx-6 -mt-6 px-6 py-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FaTicketAlt className="text-gold text-xl" />
                            <div>
                                <h2 className="text-soft-white font-heading font-bold">National Museum</h2>
                                <p className="text-gold text-xs">E-Ticket</p>
                            </div>
                        </div>
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            CONFIRMED
                        </span>
                    </div>

                    {/* Ticket Details */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-xs text-lgray-dark mb-1">Booking ID</p>
                            <p className="font-mono font-bold text-navy">{booking.bookingId}</p>
                        </div>
                        <div>
                            <p className="text-xs text-lgray-dark mb-1">Visit Date</p>
                            <p className="font-medium text-navy">
                                {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-lgray-dark mb-1">Time Slot</p>
                            <p className="font-medium text-navy">{booking.timeSlotLabel}</p>
                        </div>
                        <div>
                            <p className="text-xs text-lgray-dark mb-1">Total Tickets</p>
                            <p className="font-medium text-navy">{booking.totalTickets}</p>
                        </div>
                    </div>

                    {/* Divider (perforated line effect) */}
                    <div className="relative my-6">
                        <div className="border-t-2 border-dashed border-lgray"></div>
                        <div className="absolute -left-9 top-1/2 -translate-y-1/2 w-6 h-6 bg-soft-white rounded-full"></div>
                        <div className="absolute -right-9 top-1/2 -translate-y-1/2 w-6 h-6 bg-soft-white rounded-full"></div>
                    </div>

                    {/* QR Code */}
                    <div className="text-center">
                        <p className="text-sm text-lgray-dark mb-3">Show this QR code at the museum entrance</p>
                        <div className="inline-block p-3 bg-white rounded-xl border-2 border-navy/10 shadow-sm">
                            <QRCodeSVG value={ticketQR} size={160} fgColor="#0B1F3A" level="H" />
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="mt-6 bg-gold/10 rounded-xl p-4 flex justify-between items-center">
                        <span className="text-navy font-medium">Amount Paid</span>
                        <span className="text-2xl font-bold text-gold">₹{booking.totalAmount?.toLocaleString()}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <button className="btn-gold flex items-center gap-2">
                        <FaDownload /> Download Ticket
                    </button>
                    <Link to="/" className="btn-outline flex items-center gap-2">
                        <FaHome /> Back to Home
                    </Link>
                </div>

                {/* Guidelines */}
                <div className="mt-8 admin-card">
                    <h3 className="font-heading font-bold text-navy mb-3">Important Information</h3>
                    <ul className="space-y-2 text-sm text-lgray-dark">
                        <li>• Please arrive 15 minutes before your time slot</li>
                        <li>• Carry a valid photo ID along with this e-ticket</li>
                        <li>• Cancellation is free up to 24 hours before visit</li>
                        <li>• For any queries, contact: +91-11-2301-9272</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
