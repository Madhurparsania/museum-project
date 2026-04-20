import { Link } from 'react-router-dom';
import { FaStar, FaArrowRight, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Museums() {
    const [search, setSearch] = useState('');
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        const runId = 'museum-visibility';
        // #region agent log
        fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H1-H2',location:'src/pages/visitor/Museums.jsx:12',message:'Museums page fetch started',data:{url:'/api/museums'},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        fetch('/api/museums')
            .then(async (r) => {
                const data = await r.json();
                // #region agent log
                fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H2-H3',location:'src/pages/visitor/Museums.jsx:18',message:'Museums page fetch resolved',data:{status:r.status,ok:r.ok,count:Array.isArray(data)?data.length:-1},timestamp:Date.now()})}).catch(()=>{});
                // #endregion
                setMuseums(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                // #region agent log
                fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H1-H4',location:'src/pages/visitor/Museums.jsx:24',message:'Museums page fetch failed',data:{errorName:error?.name,errorMessage:error?.message},timestamp:Date.now()})}).catch(()=>{});
                // #endregion
                console.error(error);
            });
    }, []);

    const filtered = museums.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-soft-white pt-20">
            {/* Header */}
            <section className="bg-gradient-hero py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-soft-white mb-4">
                        Explore <span className="text-gradient-gold">Bangalore's Museums</span>
                    </h1>
                    <p className="text-lg text-lgray max-w-2xl mx-auto mb-8">
                        Discover {museums.length} incredible museums across the city — from science and aerospace to art, music, and royal heritage
                    </p>
                    <div className="max-w-md mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lgray-dark" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search museums..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-gold/30 text-soft-white placeholder-lgray-dark focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Museum Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filtered.length === 0 && (
                        <p className="text-center text-lgray-dark text-lg py-12">No museums found matching "{search}"</p>
                    )}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((museum) => (
                            <Link
                                key={museum.id}
                                to={`/museum/${museum.id}`}
                                className="group bg-white rounded-2xl border border-lgray/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                            >
                                {/* Card Header */}
                                <div className="relative bg-gradient-to-br from-navy to-royal p-6 overflow-hidden h-48">
                                    {museum.image && (
                                        <>
                                            <img src={museum.image} alt={museum.shortName} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent"></div>
                                        </>
                                    )}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="relative z-10 flex flex-col justify-end h-full">
                                        <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-500">
                                            {museum.emoji}
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-soft-white mb-1 leading-tight">
                                            {museum.shortName}
                                        </h3>
                                        <p className="text-gold text-sm font-medium">{museum.tagline}</p>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <p className="text-sm text-lgray-dark leading-relaxed mb-4 line-clamp-3">
                                        {museum.description}
                                    </p>

                                    <div className="flex items-center gap-4 mb-4 text-xs text-lgray-dark">
                                        <span className="flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-gold" />
                                            {museum.contact.address.split(',').slice(-2).join(',').trim()}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <FaStar className="text-gold text-sm" />
                                            <span className="text-navy font-bold text-sm">{museum.rating}</span>
                                            <span className="text-lgray-dark text-xs">• {museum.totalVisitors} visitors</span>
                                        </div>
                                        <span className="flex items-center gap-1 text-royal text-sm font-medium group-hover:text-gold transition-colors">
                                            Explore <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
