import { useOutletContext, Link } from 'react-router-dom';
import { FaClock, FaTicketAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

export default function MuseumVisit() {
    const { museum } = useOutletContext();

    return (
        <div className="animate-fade-in space-y-12">
            <div className="mb-10">
                <h2 className="text-3xl font-heading font-bold text-navy mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-gold rounded-full"></span>
                    Plan Your Visit
                </h2>
                <p className="text-lgray-dark text-lg">Everything you need to know for a seamless and enjoyable experience.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Hours & Timing */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-lgray/50 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6">
                        <FaClock className="text-gold text-2xl" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-navy mb-6">Opening Hours</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-lgray/20">
                            <span className="text-lgray-dark font-medium">Weekdays</span>
                            <span className="text-navy font-bold">{museum.visitingHours.regular}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-lgray/20">
                            <span className="text-lgray-dark font-medium">Weekends</span>
                            <span className="text-navy font-bold">{museum.visitingHours.weekend}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-lgray/20">
                            <span className="text-lgray-dark font-medium">Closed</span>
                            <span className="text-red-500 font-bold">{museum.visitingHours.closed}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-lgray-dark font-medium">Last Entry</span>
                            <span className="text-navy font-bold">{museum.visitingHours.lastEntry}</span>
                        </div>
                    </div>
                    {museum.visitingHours.specialNote && (
                        <div className="mt-6 p-4 bg-navy/5 rounded-xl border border-navy/10">
                            <p className="text-navy text-sm italic">{museum.visitingHours.specialNote}</p>
                        </div>
                    )}
                </div>

                {/* Ticket Pricing */}
                <div className="bg-navy rounded-[2.5rem] p-10 text-soft-white shadow-2xl shadow-navy/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                        <FaTicketAlt className="text-gold text-2xl" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gold mb-6">Ticket Prices</h3>
                    <div className="space-y-4 mb-8">
                        {museum.ticketCategories.map((cat) => (
                            <div key={cat.id} className="flex justify-between items-start py-4 border-b border-white/10 last:border-0">
                                <div>
                                    <p className="font-bold text-lg">{cat.name}</p>
                                    <p className="text-sm text-lgray font-medium">{cat.description}</p>
                                </div>
                                <span className="text-gold font-black text-xl">{cat.price === 0 ? 'Free' : `₹${cat.price}`}</span>
                            </div>
                        ))}
                    </div>
                    <Link to={`/museum/${museum.id}/book`} className="btn-gold w-full flex items-center justify-center gap-2 py-4 shadow-xl shadow-gold/20">
                        Book Tickets Now <FaArrowRight />
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Guidelines */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-lgray/50 shadow-sm">
                    <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mb-6">
                        <FaShieldAlt className="text-navy text-2xl" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-navy mb-6">Visitor Guidelines</h3>
                    <ul className="space-y-4">
                        {museum.rules.map((rule, i) => (
                            <li key={i} className="flex items-start gap-3 text-lgray-dark leading-relaxed">
                                <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Map & Contact */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-lgray/50 shadow-sm">
                    <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mb-6">
                        <FaMapMarkerAlt className="text-navy text-2xl" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-navy mb-6">Location & Contact</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-gold mt-1" />
                            <p className="text-lgray-dark font-medium">{museum.contact.address}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaPhone className="text-gold" />
                            <p className="text-lgray-dark font-medium">{museum.contact.phone}</p>
                        </div>
                        {museum.contact.email && (
                            <div className="flex items-center gap-4">
                                <FaEnvelope className="text-gold" />
                                <p className="text-lgray-dark font-medium break-all">{museum.contact.email}</p>
                            </div>
                        )}
                        {museum.contact.website && (
                            <div className="flex items-center gap-4">
                                <FaGlobe className="text-gold" />
                                <a href={`https://${museum.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-navy font-bold hover:text-gold transition-colors underline underline-offset-4">
                                    Official Website
                                </a>
                            </div>
                        )}
                    </div>
                    
                    {/* Placeholder for Map */}
                    <div className="mt-8 h-48 bg-lgray/20 rounded-2xl flex items-center justify-center border border-dashed border-lgray/50">
                        <div className="text-center">
                            <FaMapMarkerAlt className="text-lgray mx-auto mb-2 text-3xl" />
                            <p className="text-lgray text-sm font-bold">Interactive Map Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
