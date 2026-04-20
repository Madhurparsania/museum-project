import { useState, useEffect } from 'react';
import { useParams, Link, NavLink, Outlet, Navigate } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt, FaInfoCircle, FaLandmark, FaCalendarAlt, FaStar, FaTicketAlt, FaGem } from 'react-icons/fa';

const tabs = [
    { id: '', label: 'About', icon: FaInfoCircle },
    { id: 'galleries', label: 'Galleries', icon: FaLandmark },
    { id: 'artifacts', label: 'Artifacts', icon: FaGem },
    { id: 'events', label: 'Events', icon: FaCalendarAlt },
    { id: 'visit', label: 'Plan Visit', icon: FaClock },
];

export default function MuseumLayout() {
    const { id } = useParams();
    const [museum, setMuseum] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/museums/${id}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => { setMuseum(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-soft-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div></div>;
    if (!museum) return <Navigate to="/museums" replace />;

    return (
        <div className="min-h-screen bg-soft-white pt-20">
            {/* Hero Section */}
            <section className="relative bg-gradient-hero py-16 overflow-hidden">
                {museum.image && (
                    <div className="absolute inset-0">
                        <img src={museum.image} alt={museum.name} className="w-full h-full object-cover opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70"></div>
                    </div>
                )}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/museums" className="text-lgray-dark hover:text-gold text-sm mb-4 inline-block transition-colors">← Back to Museums</Link>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="text-7xl bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10">{museum.emoji}</div>
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-soft-white mb-2 leading-tight">{museum.name}</h1>
                            <p className="text-gold text-lg font-medium mb-4">{museum.tagline}</p>
                            <div className="flex flex-wrap items-center gap-6 text-lgray text-sm">
                                <span className="flex items-center gap-1.5"><FaStar className="text-gold" /> <span className="text-soft-white font-bold">{museum.rating}</span> Rating</span>
                                <span className="w-1.5 h-1.5 bg-lgray/30 rounded-full"></span>
                                <span className="font-medium">{museum.totalVisitors} annual visitors</span>
                                <span className="w-1.5 h-1.5 bg-lgray/30 rounded-full"></span>
                                <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-gold" /> {museum.contact.address.split(',').pop().trim()}</span>
                            </div>
                            <Link to={`/museum/${museum.id}/book`} className="btn-gold inline-flex items-center gap-2 mt-6 px-8 py-3 shadow-lg shadow-gold/20">
                                <FaTicketAlt /> Book Tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-2 bg-white rounded-2xl p-2 shadow-xl shadow-navy/5 border border-lgray/50 -mt-8 relative z-10 max-w-fit mx-auto">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.id}
                            to={tab.id === '' ? `/museum/${id}` : `/museum/${id}/${tab.id}`}
                            end={tab.id === ''}
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    isActive 
                                    ? 'bg-navy text-gold shadow-lg shadow-navy/20 scale-105' 
                                    : 'text-lgray-dark hover:bg-lgray/40 hover:text-navy'
                                }`
                            }
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Outlet context={{ museum }} />
            </div>
        </div>
    );
}
