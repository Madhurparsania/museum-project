import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaGlobe, FaQrcode, FaClock, FaShieldAlt, FaChartLine, FaArrowRight, FaStar } from 'react-icons/fa';

const features = [
    { icon: FaRobot, title: 'AI Chatbot', desc: 'Book tickets through an intelligent conversational assistant' },
    { icon: FaGlobe, title: '13 Languages', desc: 'Interact in English, Hindi, Tamil, Telugu, Bengali, and more' },
    { icon: FaQrcode, title: 'QR Payments', desc: 'Secure cashless payments with instant QR code generation' },
    { icon: FaClock, title: '24/7 Available', desc: 'Book anytime, anywhere — no queues, no waiting' },
    { icon: FaShieldAlt, title: 'Secure', desc: 'End-to-end encrypted transactions and data protection' },
    { icon: FaChartLine, title: 'Smart Analytics', desc: 'Data-driven insights for better museum management' },
];

const testimonials = [
    { name: 'Priya M.', text: 'Booked tickets for Visvesvaraya Museum in Kannada — the chatbot made it so easy! No more standing in queues.', rating: 5 },
    { name: 'Rahul S.', text: 'Found all Bangalore museums in one place. QR payment was instant and we explored three museums in one day!', rating: 5 },
    { name: 'Deepa K.', text: 'My kids loved the HAL Aerospace Museum. Booking in Tamil was so convenient for my parents visiting from Chennai.', rating: 4 },
];

export default function Home() {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        const runId = 'museum-visibility';
        // #region agent log
        fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H1-H2',location:'src/pages/visitor/Home.jsx:25',message:'Home museums fetch started',data:{url:'/api/museums'},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        fetch('/api/museums')
            .then(async (r) => {
                const data = await r.json();
                // #region agent log
                fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H2-H3',location:'src/pages/visitor/Home.jsx:31',message:'Home museums fetch resolved',data:{status:r.status,ok:r.ok,count:Array.isArray(data)?data.length:-1},timestamp:Date.now()})}).catch(()=>{});
                // #endregion
                setMuseums(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                // #region agent log
                fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H1-H4',location:'src/pages/visitor/Home.jsx:37',message:'Home museums fetch failed',data:{errorName:error?.name,errorMessage:error?.message},timestamp:Date.now()})}).catch(()=>{});
                // #endregion
                console.error(error);
            });
    }, []);

    const featuredMuseums = museums.slice(0, 6);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-hero min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute w-96 h-96 border border-gold/30 rounded-full -top-20 -right-20 animate-pulse-soft"></div>
                    <div className="absolute w-64 h-64 border border-gold/20 rounded-full bottom-20 -left-10 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute w-48 h-48 border border-royal/30 rounded-full top-1/3 right-1/3 animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
                                <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                                <span className="text-gold text-sm font-medium">{museums.length} Museums Now Open for Booking</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-soft-white leading-tight mb-6">
                                Discover{' '}
                                <span className="text-gradient-gold">Bangalore's</span>
                                <br />Best Museums
                            </h1>
                            <p className="text-lg text-lgray max-w-xl mb-8 leading-relaxed">
                                Your one-stop platform to explore and book tickets for {museums.length} incredible museums in Bangalore. Use our AI chatbot in 13 Indian languages — skip the queues and dive into history, science, and art.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/museums" className="btn-gold flex items-center gap-2 text-lg">
                                    Explore Museums <FaArrowRight />
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-12">
                                {[
                                    { value: `${museums.length}`, label: 'Museums' },
                                    { value: '13', label: 'Languages' },
                                    { value: '24/7', label: 'Booking' },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <p className="text-2xl md:text-3xl font-bold text-gold">{stat.value}</p>
                                        <p className="text-sm text-lgray-dark">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="hidden lg:flex justify-center animate-slide-up">
                            <div className="relative">
                                <div className="w-80 h-96 bg-gradient-to-br from-royal/30 to-gold/10 rounded-3xl border border-gold/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-8">
                                    <div className="flex gap-3 text-5xl">
                                        <span>🏛️</span><span>🔬</span><span>✈️</span>
                                    </div>
                                    <h3 className="text-soft-white font-heading text-xl text-center">Science · Art · Heritage</h3>
                                    <p className="text-lgray-dark text-sm text-center">All of Bangalore's museums in one platform</p>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="text-gold text-sm" />
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-2xl border border-gold/30 flex items-center justify-center animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                                    <span className="text-4xl">🎫</span>
                                </div>
                                <div className="absolute -top-4 -left-4 w-20 h-20 bg-royal/30 rounded-2xl border border-royal/40 flex items-center justify-center animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                                    <span className="text-3xl">🤖</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center pt-2">
                        <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-soft-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Why Choose <span className="text-gradient-gold">MuseumPass</span>?</h2>
                        <p className="section-subtitle">
                            The smartest way to explore Bangalore's museums — powered by AI and built for India
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group p-6 rounded-2xl bg-white border border-lgray/50 hover:border-gold/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                            >
                                <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gold group-hover:scale-110 transition-all duration-500">
                                    <feature.icon className="text-gold text-xl group-hover:text-navy transition-colors duration-500" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-navy mb-2">{feature.title}</h3>
                                <p className="text-sm text-lgray-dark leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Museums */}
            <section className="py-20 bg-gradient-hero">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-soft-white mb-4">
                            Featured <span className="text-gradient-gold">Museums</span>
                        </h2>
                        <p className="text-lg text-lgray-dark max-w-2xl mx-auto">
                            From aerospace wonders to royal palaces — explore Bangalore's finest cultural destinations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredMuseums.map((museum) => (
                            <Link
                                key={museum.id}
                                to={`/museum/${museum.id}`}
                                className="relative glass-card p-6 hover:bg-white/15 hover:-translate-y-1 transition-all duration-500 group cursor-pointer overflow-hidden"
                            >
                                {museum.image && (
                                    <>
                                        <img src={museum.image} alt={museum.shortName} className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
                                    </>
                                )}
                                <div className="relative z-10">
                                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                                        {museum.emoji}
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-soft-white mb-1">{museum.shortName}</h3>
                                    <p className="text-gold text-xs font-medium mb-2">{museum.tagline}</p>
                                    <p className="text-sm text-lgray leading-relaxed mb-3 line-clamp-2">{museum.description}</p>
                                    <div className="flex items-center gap-2 text-gold text-sm font-medium">
                                        <FaStar className="text-xs" />
                                        <span>{museum.rating}</span>
                                        <span className="text-lgray-dark">•</span>
                                        <span className="text-lgray-dark text-xs">{museum.totalVisitors} visitors</span>
                                        <FaArrowRight className="ml-auto group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/museums" className="btn-outline inline-flex items-center gap-2">
                            View All Museums <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-soft-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">
                            What Our <span className="text-gradient-gold">Visitors</span> Say
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-lgray/50 p-6 hover:shadow-xl transition-all duration-500">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <FaStar key={j} className="text-gold text-sm" />
                                    ))}
                                </div>
                                <p className="text-navy text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                                <p className="text-royal font-medium text-sm">{t.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-hero">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-soft-white mb-4">
                        Ready to Explore <span className="text-gradient-gold">Bangalore</span>?
                    </h2>
                    <p className="text-lg text-lgray max-w-2xl mx-auto mb-8">
                        Browse {museums.length} museums, book tickets in your language, and skip the queues with MuseumPass
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/museums" className="btn-gold flex items-center gap-2 text-lg">
                            Explore Museums <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
