import { useState } from 'react';
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom';
import { getMuseumById } from '../../data/mockMuseumInfo';
import { slotAvailability } from '../../data/mockBookings';
import { FaCalendarAlt, FaClock, FaTicketAlt, FaUsers, FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const STEPS = ['Date', 'Time Slot', 'Category', 'Review'];

export default function BookTickets() {
    const { id } = useParams();
    const museum = getMuseumById(id);
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [booking, setBooking] = useState({
        date: '',
        timeSlotId: '',
        timeSlotLabel: '',
        categories: {},
    });

    if (!museum) return <Navigate to="/museums" replace />;

    const totalTickets = Object.values(booking.categories).reduce((a, b) => a + b, 0);
    const totalAmount = museum.ticketCategories.reduce((sum, cat) => {
        return sum + (booking.categories[cat.id] || 0) * cat.price;
    }, 0);

    function getAvailability(slotId) {
        const dateKey = booking.date;
        if (slotAvailability[dateKey] && slotAvailability[dateKey][slotId] !== undefined) {
            return slotAvailability[dateKey][slotId];
        }
        return Math.floor(Math.random() * 150) + 50;
    }

    function handleNext() {
        if (step < STEPS.length - 1) setStep(step + 1);
    }

    function handleBack() {
        if (step > 0) setStep(step - 1);
    }

    function handleProceedToPayment() {
        const bookingDetails = {
            ...booking,
            museumName: museum.shortName,
            museumId: museum.id,
            totalTickets,
            totalAmount,
            bookingId: 'BK' + Date.now().toString().slice(-6),
        };
        navigate('/payment', { state: bookingDetails });
    }

    function canProceed() {
        switch (step) {
            case 0: return !!booking.date;
            case 1: return !!booking.timeSlotId;
            case 2: return totalTickets > 0;
            case 3: return true;
            default: return false;
        }
    }

    // Get tomorrow as min date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    // Max date (30 days from now)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-soft-white pt-20">
            {/* Header */}
            <div className="bg-gradient-hero py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Link to={`/museum/${museum.id}`} className="text-lgray-dark hover:text-gold text-sm mb-2 inline-block transition-colors">← Back to {museum.shortName}</Link>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-soft-white mb-2">
                        Book Tickets — <span className="text-gradient-gold">{museum.shortName}</span>
                    </h1>
                    <p className="text-lgray">Select your visit details and book instantly</p>
                </div>
            </div>

            {/* Stepper */}
            <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10">
                <div className="bg-white rounded-2xl shadow-lg border border-lgray/50 p-4">
                    <div className="flex items-center justify-between">
                        {STEPS.map((label, i) => (
                            <div key={i} className="flex items-center gap-2 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i < step ? 'bg-green-500 text-white' :
                                    i === step ? 'bg-gold text-navy' :
                                        'bg-lgray text-lgray-dark'
                                    }`}>
                                    {i < step ? '✓' : i + 1}
                                </div>
                                <span className={`text-xs font-medium hidden sm:block ${i <= step ? 'text-navy' : 'text-lgray-dark'
                                    }`}>{label}</span>
                                {i < STEPS.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-2 rounded transition-colors duration-300 ${i < step ? 'bg-green-500' : 'bg-lgray'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="admin-card animate-fade-in">
                    {/* Step 0: Date */}
                    {step === 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                                    <FaCalendarAlt className="text-gold" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-navy">Select Visit Date</h2>
                                    <p className="text-sm text-lgray-dark">Choose a date within the next 30 days</p>
                                </div>
                            </div>
                            <input
                                type="date"
                                value={booking.date}
                                min={minDate}
                                max={maxDateStr}
                                onChange={(e) => setBooking({ ...booking, date: e.target.value, timeSlotId: '', timeSlotLabel: '' })}
                                className="input-field text-lg"
                            />
                            {booking.date && (
                                <p className="mt-3 text-sm text-green-600 flex items-center gap-2">
                                    <FaCheckCircle /> Date selected: {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Step 1: Time Slot */}
                    {step === 1 && (
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                                    <FaClock className="text-gold" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-navy">Select Time Slot</h2>
                                    <p className="text-sm text-lgray-dark">Choose an available time slot for your visit</p>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {museum.timeSlots.map((slot) => {
                                    const available = getAvailability(slot.id);
                                    const isFull = available <= 0;
                                    const isSelected = booking.timeSlotId === slot.id;
                                    const fillPercent = Math.min(100, ((slot.maxCapacity - available) / slot.maxCapacity) * 100);

                                    return (
                                        <button
                                            key={slot.id}
                                            disabled={isFull}
                                            onClick={() => setBooking({ ...booking, timeSlotId: slot.id, timeSlotLabel: slot.time })}
                                            className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${isFull ? 'border-lgray bg-lgray/20 opacity-50 cursor-not-allowed' :
                                                isSelected ? 'border-gold bg-gold/5 shadow-md' :
                                                    'border-lgray/50 hover:border-royal/50 hover:shadow-sm cursor-pointer'
                                                }`}
                                        >
                                            <p className={`font-semibold text-sm ${isSelected ? 'text-gold' : 'text-navy'}`}>
                                                {slot.time}
                                            </p>
                                            <p className={`text-xs mt-1 ${isFull ? 'text-red-500' : available < 30 ? 'text-orange-500' : 'text-green-600'}`}>
                                                {isFull ? 'Fully Booked' : `${available} spots remaining`}
                                            </p>
                                            <div className="mt-2 h-1.5 bg-lgray/50 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${fillPercent > 80 ? 'bg-red-500' : fillPercent > 50 ? 'bg-orange-400' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${fillPercent}%` }}
                                                />
                                            </div>
                                            {isSelected && (
                                                <FaCheckCircle className="absolute top-3 right-3 text-gold" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Category */}
                    {step === 2 && (
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                                    <FaTicketAlt className="text-gold" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-navy">Select Tickets</h2>
                                    <p className="text-sm text-lgray-dark">Choose categories and quantity</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {museum.ticketCategories.map((cat) => {
                                    const qty = booking.categories[cat.id] || 0;
                                    return (
                                        <div key={cat.id} className="flex items-center justify-between p-4 rounded-xl border border-lgray/50 bg-white">
                                            <div>
                                                <p className="font-semibold text-navy">{cat.name}</p>
                                                <p className="text-xs text-lgray-dark">{cat.description}</p>
                                                <p className="text-sm font-bold text-gold mt-1">₹{cat.price}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBooking({
                                                        ...booking,
                                                        categories: { ...booking.categories, [cat.id]: Math.max(0, qty - 1) }
                                                    })}
                                                    disabled={qty === 0}
                                                    className="w-8 h-8 rounded-lg bg-lgray flex items-center justify-center text-navy font-bold hover:bg-gold hover:text-navy transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 text-center font-bold text-navy">{qty}</span>
                                                <button
                                                    onClick={() => setBooking({
                                                        ...booking,
                                                        categories: { ...booking.categories, [cat.id]: Math.min(10, qty + 1) }
                                                    })}
                                                    disabled={qty >= 10}
                                                    className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center text-gold font-bold hover:bg-gold hover:text-navy transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {totalTickets > 0 && (
                                <div className="mt-4 p-4 bg-navy/5 rounded-xl flex justify-between items-center">
                                    <span className="text-sm text-navy font-medium">Total: {totalTickets} ticket(s)</span>
                                    <span className="text-lg font-bold text-gold">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                                    <FaUsers className="text-gold" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-navy">Review Booking</h2>
                                    <p className="text-sm text-lgray-dark">Confirm your details before payment</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between py-3 border-b border-lgray/30">
                                    <span className="text-lgray-dark">📅 Visit Date</span>
                                    <span className="font-medium text-navy">
                                        {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-lgray/30">
                                    <span className="text-lgray-dark">⏰ Time Slot</span>
                                    <span className="font-medium text-navy">{booking.timeSlotLabel}</span>
                                </div>
                                {museum.ticketCategories
                                    .filter(cat => booking.categories[cat.id] > 0)
                                    .map(cat => (
                                        <div key={cat.id} className="flex justify-between py-3 border-b border-lgray/30">
                                            <span className="text-lgray-dark">🎫 {cat.name} × {booking.categories[cat.id]}</span>
                                            <span className="font-medium text-navy">₹{(booking.categories[cat.id] * cat.price).toLocaleString()}</span>
                                        </div>
                                    ))
                                }
                                <div className="flex justify-between py-4 bg-navy/5 rounded-xl px-4 mt-4">
                                    <span className="font-bold text-navy text-lg">Total Amount</span>
                                    <span className="font-bold text-gold text-xl">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-lgray/30">
                        <button
                            onClick={handleBack}
                            disabled={step === 0}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-lgray-dark hover:bg-lgray/30 transition-all disabled:opacity-0 cursor-pointer"
                        >
                            <FaArrowLeft /> Back
                        </button>
                        {step < STEPS.length - 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="btn-gold flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Next <FaArrowRight />
                            </button>
                        ) : (
                            <button
                                onClick={handleProceedToPayment}
                                className="btn-gold flex items-center gap-2 text-lg"
                            >
                                Proceed to Payment <FaArrowRight />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
