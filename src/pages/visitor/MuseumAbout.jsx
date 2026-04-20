import { useOutletContext, Link } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';

export default function MuseumAbout() {
    const { museum } = useOutletContext();

    return (
        <div className="grid lg:grid-cols-3 gap-12 animate-fade-in">
            <div className="lg:col-span-2 space-y-10">
                <section>
                    <h2 className="text-3xl font-heading font-bold text-navy mb-6 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-gold rounded-full"></span>
                        About the Museum
                    </h2>
                    <p className="text-lgray-dark text-lg leading-relaxed">{museum.description}</p>
                </section>
                
                <section>
                    <h3 className="text-2xl font-heading font-bold text-navy mb-6 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-gold rounded-full"></span>
                        History & Heritage
                    </h3>
                    <div className="bg-white rounded-3xl p-8 border border-lgray/50 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                        <p className="text-lgray-dark leading-relaxed relative z-10">{museum.history}</p>
                    </div>
                </section>
            </div>

            <div className="space-y-6">
                <div className="bg-navy rounded-3xl p-8 text-soft-white shadow-2xl shadow-navy/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                    <h4 className="font-heading font-bold text-gold text-xl mb-6">Quick Information</h4>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaClock className="text-gold" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-lgray font-bold mb-1">Hours Today</p>
                                <p className="text-soft-white font-medium">{museum.visitingHours.regular}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaMapMarkerAlt className="text-gold" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-lgray font-bold mb-1">Location</p>
                                <p className="text-soft-white font-medium">{museum.contact.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaPhone className="text-gold" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-lgray font-bold mb-1">Phone</p>
                                <p className="text-soft-white font-medium">{museum.contact.phone}</p>
                            </div>
                        </div>
                        {museum.contact.email && (
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="text-gold" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-lgray font-bold mb-1">Email</p>
                                    <p className="text-soft-white font-medium break-all">{museum.contact.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to={`/museum/${museum.id}/book`} className="btn-gold w-full flex items-center justify-center gap-2 mt-10 py-4 shadow-xl shadow-gold/20">
                        Book Tickets Now <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}
