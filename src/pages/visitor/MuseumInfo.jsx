import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getMuseumById } from '../../data/mockMuseumInfo';
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaInfoCircle, FaLandmark, FaCalendarAlt, FaArrowRight, FaStar, FaTicketAlt } from 'react-icons/fa';

const tabs = [
    { id: 'about', label: 'About', icon: FaInfoCircle },
    { id: 'galleries', label: 'Galleries', icon: FaLandmark },
    { id: 'events', label: 'Events', icon: FaCalendarAlt },
    { id: 'visit', label: 'Plan Visit', icon: FaClock },
];

export default function MuseumInfo() {
    const { id } = useParams();
    const museum = getMuseumById(id);
    const [activeTab, setActiveTab] = useState('about');

    if (!museum) return <Navigate to="/museums" replace />;

    return (
        <div className="min-h-screen bg-soft-white pt-20">
            {/* Hero */}
            <section className="bg-gradient-hero py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/museums" className="text-lgray-dark hover:text-gold text-sm mb-4 inline-block transition-colors">← Back to Museums</Link>
                    <div className="flex items-start gap-6">
                        <div className="text-7xl">{museum.emoji}</div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-soft-white mb-2">{museum.name}</h1>
                            <p className="text-gold font-medium mb-3">{museum.tagline}</p>
                            <div className="flex items-center gap-4 text-lgray text-sm">
                                <span className="flex items-center gap-1"><FaStar className="text-gold" /> {museum.rating}</span>
                                <span>•</span>
                                <span>{museum.totalVisitors} visitors</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-gold" /> {museum.contact.address.split(',').pop().trim()}</span>
                            </div>
                            <Link to={`/museum/${museum.id}/book`} className="btn-gold inline-flex items-center gap-2 mt-4">
                                <FaTicketAlt /> Book Tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-lgray/50 -mt-6 relative z-10 max-w-fit mx-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${activeTab === tab.id ? 'bg-navy text-gold shadow-md' : 'text-lgray-dark hover:bg-lgray/30'}`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {activeTab === 'about' && <AboutSection museum={museum} />}
                {activeTab === 'galleries' && <GalleriesSection museum={museum} />}
                {activeTab === 'events' && <EventsSection museum={museum} />}
                {activeTab === 'visit' && <VisitSection museum={museum} />}
            </div>
        </div>
    );
}

function AboutSection({ museum }) {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-heading font-bold text-navy mb-4">About the Museum</h2>
                <p className="text-lgray-dark leading-relaxed mb-6">{museum.description}</p>
                <h3 className="text-xl font-heading font-bold text-navy mb-3">History</h3>
                <p className="text-lgray-dark leading-relaxed">{museum.history}</p>
            </div>
            <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-lgray/50 p-6">
                    <h4 className="font-heading font-bold text-navy mb-3">Quick Info</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3"><FaClock className="text-gold mt-0.5" /><div><p className="font-medium text-navy">Hours</p><p className="text-lgray-dark">{museum.visitingHours.regular}</p></div></div>
                        <div className="flex items-start gap-3"><FaMapMarkerAlt className="text-gold mt-0.5" /><div><p className="font-medium text-navy">Location</p><p className="text-lgray-dark">{museum.contact.address}</p></div></div>
                        <div className="flex items-start gap-3"><FaPhone className="text-gold mt-0.5" /><div><p className="font-medium text-navy">Phone</p><p className="text-lgray-dark">{museum.contact.phone}</p></div></div>
                        {museum.contact.email && <div className="flex items-start gap-3"><FaEnvelope className="text-gold mt-0.5" /><div><p className="font-medium text-navy">Email</p><p className="text-lgray-dark">{museum.contact.email}</p></div></div>}
                    </div>
                </div>
                <Link to={`/museum/${museum.id}/book`} className="btn-gold w-full flex items-center justify-center gap-2">
                    Book Tickets <FaArrowRight />
                </Link>
            </div>
        </div>
    );
}

function GalleriesSection({ museum }) {
    return (
        <div>
            <h2 className="text-2xl font-heading font-bold text-navy mb-6">Galleries & Exhibits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {museum.galleries.map((g) => (
                    <div key={g.id} className="bg-white rounded-2xl border border-lgray/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{g.image}</div>
                        <h3 className="font-heading font-bold text-navy mb-2">{g.name}</h3>
                        <p className="text-sm text-lgray-dark leading-relaxed mb-2">{g.description}</p>
                        {g.items > 0 && <span className="text-gold text-sm font-medium">{g.items.toLocaleString()} exhibits</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function EventsSection({ museum }) {
    return (
        <div>
            <h2 className="text-2xl font-heading font-bold text-navy mb-6">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {museum.events.map((e) => (
                    <div key={e.id} className="bg-white rounded-2xl border border-lgray/50 p-6 hover:shadow-xl transition-all duration-500">
                        <div className="text-3xl mb-3">🎪</div>
                        <h4 className="font-heading font-bold text-navy mb-1">{e.title}</h4>
                        <p className="text-xs text-gold font-medium mb-2">{e.date} • {e.time}</p>
                        <p className="text-sm text-lgray-dark mb-3 leading-relaxed">{e.description}</p>
                        <span className="inline-block bg-navy text-gold text-sm font-bold px-3 py-1 rounded-lg">{e.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function VisitSection({ museum }) {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Hours */}
            <div className="bg-white rounded-2xl border border-lgray/50 p-6">
                <h3 className="font-heading font-bold text-navy mb-4 flex items-center gap-2"><FaClock className="text-gold" /> Visiting Hours</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-lgray-dark">Weekdays</span><span className="font-medium text-navy">{museum.visitingHours.regular}</span></div>
                    <div className="flex justify-between"><span className="text-lgray-dark">Weekends</span><span className="font-medium text-navy">{museum.visitingHours.weekend}</span></div>
                    <div className="flex justify-between"><span className="text-lgray-dark">Closed</span><span className="font-medium text-red-500">{museum.visitingHours.closed}</span></div>
                    <div className="flex justify-between"><span className="text-lgray-dark">Last Entry</span><span className="font-medium text-navy">{museum.visitingHours.lastEntry}</span></div>
                    {museum.visitingHours.specialNote && <p className="text-gold text-xs font-medium mt-2">{museum.visitingHours.specialNote}</p>}
                </div>
            </div>

            {/* Tickets */}
            <div className="bg-white rounded-2xl border border-lgray/50 p-6">
                <h3 className="font-heading font-bold text-navy mb-4 flex items-center gap-2"><FaTicketAlt className="text-gold" /> Ticket Prices</h3>
                <div className="space-y-3">
                    {museum.ticketCategories.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between py-2 border-b border-lgray/30 last:border-0">
                            <div>
                                <p className="font-medium text-navy text-sm">{cat.name}</p>
                                <p className="text-xs text-lgray-dark">{cat.description}</p>
                            </div>
                            <span className="font-bold text-gold">{cat.price === 0 ? 'Free' : `₹${cat.price}`}</span>
                        </div>
                    ))}
                </div>
                <Link to={`/museum/${museum.id}/book`} className="btn-gold w-full flex items-center justify-center gap-2 mt-4">
                    Book Now <FaArrowRight />
                </Link>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-2xl border border-lgray/50 p-6">
                <h3 className="font-heading font-bold text-navy mb-4">📋 Museum Rules</h3>
                <ul className="space-y-2">
                    {museum.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-lgray-dark">
                            <span className="text-gold mt-0.5">•</span>{rule}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl border border-lgray/50 p-6">
                <h3 className="font-heading font-bold text-navy mb-4">📍 Contact & Location</h3>
                <div className="space-y-3 text-sm">
                    <p className="flex items-start gap-2 text-lgray-dark"><FaMapMarkerAlt className="text-gold mt-0.5" /> {museum.contact.address}</p>
                    <p className="flex items-center gap-2 text-lgray-dark"><FaPhone className="text-gold" /> {museum.contact.phone}</p>
                    {museum.contact.email && <p className="flex items-center gap-2 text-lgray-dark"><FaEnvelope className="text-gold" /> {museum.contact.email}</p>}
                    {museum.contact.website && <p className="flex items-center gap-2 text-lgray-dark"><FaGlobe className="text-gold" /> {museum.contact.website}</p>}
                </div>
            </div>
        </div>
    );
}
