import { useOutletContext, Link, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaArrowRight, FaTicketAlt } from 'react-icons/fa';

export default function MuseumEvents() {
    const { museum } = useOutletContext();
    const { id: museumId } = useParams();

    return (
        <div className="animate-fade-in">
            <div className="mb-12">
                <h2 className="text-3xl font-heading font-bold text-navy mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-gold rounded-full"></span>
                    Upcoming Events & Programs
                </h2>
                <p className="text-lgray-dark text-lg">Join our interactive workshops, shows, and special exhibitions.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {museum.events.map((e) => (
                    <div 
                        key={e.id} 
                        className="group bg-white rounded-3xl border border-lgray/50 overflow-hidden hover:shadow-2xl hover:shadow-navy/10 transition-all duration-500 flex flex-col md:flex-row"
                    >
                        <div className="md:w-1/3 bg-gold/10 flex items-center justify-center p-8 relative overflow-hidden">
                            <div className="text-6xl group-hover:scale-125 transition-transform duration-500 relative z-10">🎪</div>
                            <div className="absolute inset-0 bg-gold/5 -rotate-12 translate-y-8"></div>
                        </div>
                        
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="bg-navy text-gold text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                    {e.price === 'Included with entry' ? 'Included' : 'Special Event'}
                                </span>
                                <span className="text-lgray-dark text-xs font-bold flex items-center gap-1">
                                    <FaCalendarAlt size={10} className="text-gold" /> {e.date}
                                </span>
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-navy mb-3 group-hover:text-gold transition-colors">{e.title}</h3>
                            <p className="text-lgray-dark text-sm leading-relaxed mb-6 flex-1">{e.description}</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-lgray/20">
                                <div className="flex items-center gap-2 text-navy font-bold">
                                    <FaClock className="text-gold" />
                                    <span className="text-sm">{e.time}</span>
                                </div>
                                <Link 
                                    to={`/museum/${museumId}/event/${e.id}`}
                                    className="text-gold font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    Learn More <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-navy rounded-[3rem] p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full -ml-32 -mt-32"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mb-32"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-soft-white mb-4">Planning a group visit for an event?</h3>
                    <p className="text-lgray text-lg mb-8 max-w-2xl mx-auto">We offer special discounts and guided experiences for school groups and large organizations.</p>
                    <Link to={`/museum/${museumId}/book`} className="btn-gold inline-flex items-center gap-2 px-10 py-4 shadow-xl shadow-gold/30">
                        <FaTicketAlt /> Group Booking Inquiry
                    </Link>
                </div>
            </div>
        </div>
    );
}
