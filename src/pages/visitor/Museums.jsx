import { Link } from 'react-router-dom';
import { FaStar, FaArrowRight, FaMapMarkerAlt, FaClock, FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Museums() {
    const [search, setSearch] = useState('');
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        fetch('/api/museums').then(r => r.json()).then(setMuseums).catch(console.error);
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
                                <div className="bg-gradient-to-br from-navy to-royal p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-500">
                                        {museum.emoji}
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-soft-white mb-1 leading-tight">
                                        {museum.shortName}
                                    </h3>
                                    <p className="text-gold text-sm font-medium">{museum.tagline}</p>
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
