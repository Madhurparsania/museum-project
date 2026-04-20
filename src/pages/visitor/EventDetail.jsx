import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaInfoCircle, FaUsers, FaArrowRight } from 'react-icons/fa';

export default function EventDetail() {
    const { id: museumId, eventId } = useParams();
    const [museum, setMuseum] = useState(null);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/museums/${museumId}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) {
                    setMuseum(data);
                    const item = data.events?.find(e => e.id.toString() === eventId);
                    setEvent(item);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [museumId, eventId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-soft-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div></div>;
    if (!museum || !event) return <div className="min-h-screen flex flex-col items-center justify-center bg-soft-white p-4">
        <h2 className="text-2xl font-bold text-navy mb-4">Event Not Found</h2>
        <Link to={`/museum/${museumId}/events`} className="btn-gold">Back to Events</Link>
    </div>;

    return (
        <div className="min-h-screen bg-soft-white pb-20">
            {/* Header */}
            <header className="bg-white border-b border-lgray/50 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-navy font-bold hover:text-gold transition-colors cursor-pointer"
                    >
                        <FaArrowLeft /> All Events
                    </button>
                    <div className="text-lgray-dark text-sm font-bold uppercase tracking-widest">{museum.shortName}</div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left: Event Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
                                <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                                Upcoming Event
                            </div>
                            <h1 className="text-4xl md:text-6xl font-heading font-black text-navy mb-8 leading-tight">
                                {event.title}
                            </h1>
                            <div className="flex flex-wrap gap-8 py-8 border-y border-lgray/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center text-navy shadow-sm">
                                        <FaCalendarAlt className="text-gold text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-lgray uppercase tracking-widest">Date</p>
                                        <p className="text-navy font-black text-lg">{event.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center text-navy shadow-sm">
                                        <FaClock className="text-gold text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-lgray uppercase tracking-widest">Time</p>
                                        <p className="text-navy font-black text-lg">{event.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center text-navy shadow-sm">
                                        <FaMapMarkerAlt className="text-gold text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-lgray uppercase tracking-widest">Location</p>
                                        <p className="text-navy font-black text-lg">{museum.shortName}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="prose prose-slate max-w-none">
                                <h3 className="text-2xl font-heading font-bold text-navy flex items-center gap-3">
                                    <FaInfoCircle className="text-gold" /> About the Event
                                </h3>
                                <p className="text-xl text-lgray-dark leading-loose mt-4">
                                    {event.description}
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-[2.5rem] p-8 border border-lgray/50 shadow-sm">
                                <h4 className="text-xl font-heading font-bold text-navy mb-6 flex items-center gap-3">
                                    <FaUsers className="text-gold" /> Who should attend?
                                </h4>
                                <p className="text-lgray-dark leading-relaxed">
                                    This event is open to all museum visitors. Whether you are a student, a family, or a dedicated history buff, our {event.title.toLowerCase()} is designed to be engaging, educational, and inspiring. No prior registration is required for "Included" events, while special workshops may have limited seating.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right: Booking Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-navy/10 border border-lgray/30 sticky top-28 overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-[3rem] -mr-4 -mt-4"></div>
                            
                            <div className="mb-10">
                                <p className="text-lgray-dark font-bold text-sm uppercase tracking-widest mb-2">Event Price</p>
                                <div className="text-5xl font-black text-navy mb-2">
                                    {event.price.includes('₹') ? event.price : <span className="text-gold">FREE</span>}
                                </div>
                                {event.price === 'Included with entry' && (
                                    <p className="text-xs text-lgray-dark font-medium italic">*Included with your regular museum entry ticket</p>
                                )}
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 p-4 bg-navy/5 rounded-2xl border border-navy/10">
                                    <FaInfoCircle className="text-gold flex-shrink-0" />
                                    <p className="text-sm text-navy font-medium leading-tight">Limited capacity. Arrive 15 minutes early.</p>
                                </div>
                            </div>

                            <Link 
                                to={`/museum/${museumId}/book`} 
                                className="btn-gold w-full flex items-center justify-center gap-3 py-5 text-lg shadow-xl shadow-gold/20 mb-4"
                            >
                                <FaTicketAlt /> {event.price === 'Included with entry' ? 'Book Entry Ticket' : 'Register Now'}
                            </Link>
                            
                            <p className="text-center text-xs text-lgray-dark font-bold hover:text-navy transition-colors">
                                Need help? Contact us at {museum.contact.phone}
                            </p>
                        </div>
                        
                        <div className="bg-navy rounded-[2.5rem] p-8 text-soft-white flex items-center justify-between group hover:bg-gold transition-all duration-500 cursor-pointer">
                            <div>
                                <h4 className="font-bold text-lg group-hover:text-navy transition-colors">View Museum Info</h4>
                                <p className="text-sm text-lgray group-hover:text-navy/70 transition-colors">Learn more about {museum.shortName}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-navy/10 transition-all">
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
