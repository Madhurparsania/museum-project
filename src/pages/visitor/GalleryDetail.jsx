import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLandmark, FaGem, FaTicketAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

export default function GalleryDetail() {
    const { id: museumId, galleryId } = useParams();
    const [museum, setMuseum] = useState(null);
    const [gallery, setGallery] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/museums/${museumId}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) {
                    setMuseum(data);
                    const item = data.galleries?.find(g => g.id.toString() === galleryId);
                    setGallery(item);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [museumId, galleryId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-soft-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div></div>;
    if (!museum || !gallery) return <div className="min-h-screen flex flex-col items-center justify-center bg-soft-white p-4">
        <h2 className="text-2xl font-bold text-navy mb-4">Gallery Not Found</h2>
        <Link to={`/museum/${museumId}/galleries`} className="btn-gold">Back to Galleries</Link>
    </div>;

    return (
        <div className="min-h-screen bg-soft-white pb-20">
            {/* Immersive Header */}
            <div className="relative h-[50vh] min-h-[400px] bg-navy overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-[20rem] opacity-10 select-none pointer-events-none">
                    {gallery.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-soft-white via-navy/80 to-navy"></div>
                
                <div className="absolute top-0 left-0 right-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-soft-white font-bold hover:text-gold transition-colors cursor-pointer"
                        >
                            <FaArrowLeft /> Back
                        </button>
                    </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <div className="text-8xl mb-6 animate-bounce-slow">{gallery.image}</div>
                    <h1 className="text-4xl md:text-6xl font-heading font-black text-soft-white mb-4 drop-shadow-lg">
                        {gallery.name}
                    </h1>
                    <p className="text-gold text-xl font-medium tracking-wide uppercase">
                        {museum.shortName} • {gallery.items} Exhibits
                    </p>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-navy/10 border border-lgray/30 p-8 md:p-16">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-heading font-bold text-navy mb-8 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-gold rounded-full"></span>
                                Gallery Overview
                            </h2>
                            <p className="text-xl text-lgray-dark leading-loose mb-10">
                                {gallery.description}
                            </p>
                            
                            <div className="space-y-10">
                                <section>
                                    <h3 className="text-2xl font-heading font-bold text-navy mb-6 flex items-center gap-3">
                                        <FaInfoCircle className="text-gold" /> What to Expect
                                    </h3>
                                    <div className="prose prose-slate max-w-none text-lgray-dark">
                                        <p className="text-lg leading-relaxed">
                                            The <strong>{gallery.name}</strong> is designed to take visitors on a journey through thematic displays that combine education with artistic presentation. 
                                            Each of the <strong>{gallery.items}</strong> exhibits has been carefully selected to contribute to a larger narrative about {gallery.name.toLowerCase()} and its impact on our history and culture.
                                        </p>
                                    </div>
                                </section>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="bg-navy/5 p-8 rounded-[2rem] border border-navy/10 flex flex-col items-center text-center group hover:bg-navy hover:text-white transition-all duration-500">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-navy shadow-md mb-4 group-hover:scale-110 transition-transform">
                                            <FaClock className="text-gold" />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">Estimated Time</h4>
                                        <p className="text-sm opacity-80 font-medium">45 - 60 Minutes</p>
                                    </div>
                                    <div className="bg-gold/5 p-8 rounded-[2rem] border border-gold/10 flex flex-col items-center text-center group hover:bg-gold hover:text-navy transition-all duration-500">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-navy shadow-md mb-4 group-hover:scale-110 transition-transform">
                                            <FaGem className="text-gold" />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">Key Highlights</h4>
                                        <p className="text-sm opacity-80 font-medium">5 Signature Pieces</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-navy rounded-[2.5rem] p-8 text-soft-white shadow-xl shadow-navy/20 sticky top-28">
                                <h4 className="text-xl font-heading font-bold text-gold mb-6 flex items-center gap-2">
                                    <FaLandmark /> Visit Info
                                </h4>
                                <div className="space-y-6 mb-10">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gold"><FaClock size={14} /></span>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-lgray tracking-widest">Entry Hours</p>
                                            <p className="text-sm font-bold">{museum.visitingHours.regular}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gold"><FaTicketAlt size={14} /></span>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-lgray tracking-widest">Access</p>
                                            <p className="text-sm font-bold">Included in Ticket</p>
                                        </div>
                                    </div>
                                </div>
                                <Link to={`/museum/${museumId}/book`} className="btn-gold w-full flex items-center justify-center gap-2 py-4">
                                    Book Tickets Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
