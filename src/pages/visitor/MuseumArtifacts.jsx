import { useOutletContext, Link, useParams } from 'react-router-dom';
import { FaGem, FaArrowRight, FaSearch } from 'react-icons/fa';
import { useState } from 'react';

export default function MuseumArtifacts() {
    const { museum } = useOutletContext();
    const { id: museumId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArtifacts = museum.artifacts?.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.era.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-navy mb-4 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-gold rounded-full"></span>
                        Featured Artifacts
                    </h2>
                    <p className="text-lgray-dark text-lg">A closer look at the most significant items in our collection.</p>
                </div>
                
                <div className="relative max-w-md w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lgray-dark" />
                    <input 
                        type="text" 
                        placeholder="Search artifacts or eras..." 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-lgray/50 focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredArtifacts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredArtifacts.map((artifact) => (
                        <Link 
                            key={artifact.id} 
                            to={`/museum/${museumId}/artifact/${artifact.id}`}
                            className="group bg-white rounded-[2rem] border border-lgray/50 overflow-hidden hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="h-64 overflow-hidden relative">
                                {artifact.image ? (
                                    <img
                                        src={artifact.image}
                                        alt={artifact.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-navy/5 flex items-center justify-center text-navy/20">
                                        <FaGem size={64} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-navy/80 backdrop-blur-md text-gold text-xs font-bold px-4 py-2 rounded-full border border-white/10">
                                        {artifact.era}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <span className="text-soft-white font-bold flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        View Details <FaArrowRight />
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-gold transition-colors">{artifact.name}</h3>
                                <p className="text-lgray-dark text-sm leading-relaxed line-clamp-2">{artifact.details}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-lgray/50">
                    <div className="text-6xl mb-4 opacity-20">🔍</div>
                    <p className="text-lgray-dark text-xl font-medium">No artifacts found matching your search.</p>
                </div>
            )}
        </div>
    );
}
