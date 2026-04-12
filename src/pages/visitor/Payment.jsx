import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaClock, FaCheckCircle, FaCreditCard } from 'react-icons/fa';

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingDetails = location.state;
    const [timeLeft, setTimeLeft] = useState(600); // 10 min timer
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!bookingDetails) {
            navigate('/museums');
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [bookingDetails, navigate]);

    // Load Razorpay Script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setProcessing(true);
        setError(null);

        try {
            const res = await loadRazorpayScript();
            if (!res) {
                setError('Failed to load payment gateway. Please check your internet connection.');
                setProcessing(false);
                return;
            }

            // 1. Create Order on Backend
            const orderRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/payments/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: bookingDetails.totalAmount || bookingDetails.total,
                    bookingId: bookingDetails.bookingId,
                    receipt: `receipt_${bookingDetails.bookingId}`
                })
            });

            const orderData = await orderRes.json();
            if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order');

            // 2. Initialize Razorpay Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_id_here', // Use env variable
                amount: orderData.amount,
                currency: orderData.currency,
                name: "MuseumPass Bangalore",
                description: `Tickets for ${bookingDetails.museumName}`,
                order_id: orderData.id,
                handler: async function (response) {
                    // 3. Verify Payment on Backend
                    const verifyRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/payments/verify`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingId: bookingDetails.bookingId,
                            amount: bookingDetails.totalAmount || bookingDetails.total
                        })
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyRes.ok) {
                        navigate('/confirmation', { state: { ...bookingDetails, paymentId: response.razorpay_payment_id } });
                    } else {
                        setError(verifyData.message || 'Payment verification failed');
                    }
                },
                prefill: {
                    name: bookingDetails.visitor || '',
                    email: bookingDetails.email || '',
                    contact: bookingDetails.mobile || ''
                },
                theme: {
                    color: "#0B1F3A"
                },
                modal: {
                    ondismiss: function() {
                        setProcessing(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                setError(response.error.description);
                setProcessing(false);
            });
            rzp.open();

        } catch (err) {
            console.error('Payment Error:', err);
            setError(err.message || 'An unexpected error occurred during payment.');
            setProcessing(false);
        }
    };

    if (!bookingDetails) return null;

    const museumName = bookingDetails.museumName || 'Museum';
    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    return (
        <div className="min-h-screen bg-soft-white pt-20">
            <div className="bg-gradient-hero py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-soft-white mb-2">
                        Secure <span className="text-gradient-gold">Payment</span>
                    </h1>
                    <p className="text-lgray">Complete your payment for <strong>{museumName}</strong></p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-5 gap-8">
                    {/* Payment Action Section */}
                    <div className="md:col-span-3 admin-card text-center flex flex-col justify-center py-12">
                        <div className="mb-6">
                            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold shadow-sm ${timeLeft > 120 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                <FaClock className="animate-pulse" />
                                Payment window expires in: {formatTime(timeLeft)}
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                                ⚠️ {error}
                            </div>
                        )}

                        <div className="mb-10">
                            <div className="text-lgray-dark text-sm uppercase tracking-widest mb-2 font-bold">Total Amount Payable</div>
                            <div className="text-5xl font-heading font-bold text-navy flex items-center justify-center gap-2">
                                <span className="text-gold">₹</span>
                                {(bookingDetails.totalAmount || bookingDetails.total)?.toLocaleString()}
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={processing || timeLeft === 0}
                            className="btn-gold w-full py-4 text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:transform-none"
                        >
                            {processing ? (
                                <>
                                    <div className="w-6 h-6 border-3 border-navy/40 border-t-navy rounded-full animate-spin" />
                                    Initialising Secure Gateway...
                                </>
                            ) : (
                                <>
                                    <FaCreditCard /> Proceed to Secure Payment
                                </>
                            )}
                        </button>

                        <div className="mt-8 flex flex-col gap-3">
                            <div className="flex items-center justify-center gap-2 text-xs text-lgray font-medium">
                                <FaShieldAlt className="text-green-500 text-sm" />
                                Secured by 256-bit SSL encryption
                            </div>
                            <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Visa_2014_logo_detail.svg" alt="Visa" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Card" className="h-4" />
                                <span className="text-[10px] font-bold text-navy self-center">UPI & NET BANKING</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-2 admin-card h-fit sticky top-24">
                        <h3 className="font-heading font-bold text-navy text-xl mb-6 pb-2 border-b-2 border-gold/20">Booking Summary</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Booking ID', value: bookingDetails.bookingId, mono: true },
                                { label: 'Museum', value: museumName },
                                { label: 'Visit Date', value: bookingDetails.date },
                                { label: 'Time Slot', value: bookingDetails.timeSlotLabel || bookingDetails.timeSlot }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase tracking-wider text-lgray font-bold">{item.label}</span>
                                    <span className={`text-navy font-semibold ${item.mono ? 'font-mono text-xs bg-navy/5 p-1 rounded w-fit' : ''}`}>{item.value}</span>
                                </div>
                            ))}
                            
                            <div className="pt-4 border-t border-lgray/20">
                                <span className="text-[10px] uppercase tracking-wider text-lgray font-bold mb-2 block">Ticket Breakdown</span>
                                {bookingDetails.breakdown ? (
                                    bookingDetails.breakdown.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-soft-white p-2 rounded-lg mb-2">
                                            <span className="text-sm font-medium text-navy">{item.category} × {item.quantity}</span>
                                            <span className="text-sm font-bold text-navy">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex justify-between items-center bg-soft-white p-2 rounded-lg">
                                        <span className="text-sm font-medium text-navy">{bookingDetails.category} × {bookingDetails.totalTickets || bookingDetails.quantity}</span>
                                        <span className="text-sm font-bold text-navy">₹{bookingDetails.totalAmount || bookingDetails.total}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 p-4 bg-navy rounded-2xl shadow-inner text-white flex justify-between items-center">
                                <span className="text-xs font-bold opacity-70">PAYABLE AMOUNT</span>
                                <span className="text-2xl font-heading font-bold text-gold">₹{(bookingDetails.totalAmount || bookingDetails.total)?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
