import { useOutletContext, Link, useParams } from 'react-router-dom';
import { FaArrowRight, FaLandmark } from 'react-icons/fa';

export default function MuseumGalleries() {
    const { museum } = useOutletContext();
    const { id: museumId } = useParams();

    return (
        <div className="animate-fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-heading font-bold text-navy mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-gold rounded-full"></span>
                    Galleries & Exhibition Halls
                </h2>
                <p className="text-lgray-dark text-lg">Explore our curated collections across multiple thematic halls.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {museum.galleries.map((g) => (
                    <Link 
                        key={g.id} 
                        to={`/museum/${museumId}/gallery/${g.id}`}
                        className="group bg-white rounded-3xl border border-lgray/50 p-8 hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-2 transition-all duration-500 flex flex-col"
                    >
                        <div className="text-6xl mb-6 bg-soft-white w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                            {g.image}
                        </div>
                        <h3 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-gold transition-colors">{g.name}</h3>
                        <p className="text-lgray-dark leading-relaxed mb-6 flex-1 line-clamp-3">{g.description}</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-lgray/30">
                            {g.items > 0 && (
                                <span className="bg-navy/5 text-navy text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                                    <FaLandmark size={10} className="text-gold" />
                                    {g.items.toLocaleString()} Exhibits
                                </span>
                            )}
                            <span className="text-gold font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                Explore <FaArrowRight />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
