import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGem, FaLandmark, FaHistory, FaMapMarkerAlt, FaTicketAlt, FaShareAlt } from 'react-icons/fa';

export default function ArtifactDetail() {
    const { id: museumId, artifactId } = useParams();
    const [museum, setMuseum] = useState(null);
    const [artifact, setArtifact] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/museums/${museumId}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) {
                    setMuseum(data);
                    const item = data.artifacts?.find(a => a.id.toString() === artifactId);
                    setArtifact(item);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [museumId, artifactId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-soft-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div></div>;
    if (!museum || !artifact) return <div className="min-h-screen flex flex-col items-center justify-center bg-soft-white p-4">
        <h2 className="text-2xl font-bold text-navy mb-4">Artifact Not Found</h2>
        <Link to={`/museum/${museumId}/artifacts`} className="btn-gold">Back to Artifacts</Link>
    </div>;

    return (
        <div className="min-h-screen bg-soft-white pb-20">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-lgray/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-navy font-bold hover:text-gold transition-colors cursor-pointer"
                    >
                        <FaArrowLeft /> Back
                    </button>
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-lgray-dark text-sm font-medium">{museum.shortName}</span>
                        <span className="text-lgray">/</span>
                        <span className="text-navy text-sm font-bold truncate max-w-[200px]">{artifact.name}</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-all cursor-pointer">
                        <FaShareAlt />
                    </button>
                </div>
            </header>

            <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <div className="space-y-6">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                            {artifact.image ? (
                                <img 
                                    src={artifact.image} 
                                    alt={artifact.name} 
                                    className="w-full aspect-[4/5] object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-[4/5] bg-navy/5 flex items-center justify-center text-navy/10">
                                    <FaGem size={120} />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-white p-6 rounded-3xl border border-lgray/50 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                                    <FaHistory />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-lgray-dark uppercase">Historical Era</p>
                                    <p className="text-navy font-bold">{artifact.era}</p>
                                </div>
                            </div>
                            <div className="flex-1 bg-white p-6 rounded-3xl border border-lgray/50 flex items-center gap-4">
                                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center text-navy">
                                    <FaLandmark />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-lgray-dark uppercase">Location</p>
                                    <p className="text-navy font-bold truncate">{museum.shortName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Information Section */}
                    <div className="py-6">
                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-heading font-black text-navy mb-6 leading-tight">
                                {artifact.name}
                            </h1>
                            <div className="h-1 w-20 bg-gold rounded-full mb-8"></div>
                            <p className="text-xl text-lgray-dark leading-relaxed italic border-l-4 border-gold/30 pl-6 mb-10">
                                {artifact.details}
                            </p>
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h2 className="text-2xl font-heading font-bold text-navy mb-6 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                                    Historical Context
                                </h2>
                                <div className="prose prose-slate max-w-none text-lgray-dark">
                                    <p className="leading-loose text-lg">
                                        This remarkable piece from the <strong>{artifact.era}</strong> provides a unique window into the artistic and cultural advancements of its time. 
                                        As a key highlight of the <strong>{museum.name}</strong> collection, it demonstrates the intricate craftsmanship and symbolic significance that defines the heritage of this region.
                                    </p>
                                    <p className="leading-loose text-lg mt-4">
                                        Visitors are often captivated by the preservation of detail and the narrative it carries about life, belief, and technology during its period of origin.
                                    </p>
                                </div>
                            </section>

                            <div className="bg-navy rounded-[3rem] p-10 text-soft-white relative overflow-hidden shadow-2xl shadow-navy/20">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16"></div>
                                <h3 className="text-2xl font-heading font-bold text-gold mb-6">See it in person</h3>
                                <p className="text-lgray text-lg mb-8 leading-relaxed">
                                    Book your visit to the {museum.shortName} to experience the scale and beauty of this artifact firsthand.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to={`/museum/${museumId}/book`} className="btn-gold flex-1 flex items-center justify-center gap-2 py-4">
                                        <FaTicketAlt /> Book Tickets
                                    </Link>
                                    <Link to={`/museum/${museumId}`} className="bg-white/10 hover:bg-white/20 text-soft-white font-bold flex-1 flex items-center justify-center gap-2 py-4 rounded-xl transition-all">
                                        <FaMapMarkerAlt /> Plan Visit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
