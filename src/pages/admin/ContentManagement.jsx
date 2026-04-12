import { useState, useEffect } from 'react';
import { FaSave, FaEdit, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

export default function ContentManagement() {
    const [museums, setMuseums] = useState([]);
    const [editingSection, setEditingSection] = useState(null);
    const [museumName, setMuseumName] = useState('');
    const [museumDesc, setMuseumDesc] = useState('');
    const [galleries, setGalleries] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/museums').then(r => r.json()).then(data => {
            setMuseums(data);
            if (data.length > 0) {
                setMuseumName(data[0].name);
                setMuseumDesc(data[0].description);
                setGalleries(data[0].galleries);
                setEvents(data[0].events);
            }
        }).catch(console.error);
    }, []);

    const defaultMuseum = museums[0] || {};

    if (museums.length === 0) return <div className="flex items-center justify-center py-20"><p className="text-lgray-dark">Loading...</p></div>;

    return (
        <div className="space-y-6">
            {/* Museum Info */}
            <div className="admin-card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-navy">Museum Information</h3>
                    <button
                        onClick={() => setEditingSection(editingSection === 'info' ? null : 'info')}
                        className="flex items-center gap-2 px-3 py-1.5 bg-navy/5 hover:bg-navy hover:text-gold rounded-lg text-sm transition-all cursor-pointer"
                    >
                        <FaEdit size={12} /> {editingSection === 'info' ? 'Cancel' : 'Edit'}
                    </button>
                </div>
                {editingSection === 'info' ? (
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm text-lgray-dark mb-1 block">Museum Name</label>
                            <input value={museumName} onChange={(e) => setMuseumName(e.target.value)} className="input-field" />
                        </div>
                        <div>
                            <label className="text-sm text-lgray-dark mb-1 block">Description</label>
                            <textarea value={museumDesc} onChange={(e) => setMuseumDesc(e.target.value)} rows={4} className="input-field resize-none" />
                        </div>
                        <button className="btn-gold flex items-center gap-2 text-sm">
                            <FaSave size={12} /> Save Changes
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-lg font-heading font-bold text-navy mb-1">{museumName}</p>
                        <p className="text-sm text-lgray-dark leading-relaxed">{museumDesc}</p>
                    </div>
                )}
            </div>

            {/* Galleries */}
            <div className="admin-card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-navy">Galleries ({galleries.length})</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gold text-navy rounded-lg text-sm font-medium hover:bg-gold-light transition-all cursor-pointer">
                        <FaPlus size={12} /> Add Gallery
                    </button>
                </div>
                <div className="space-y-3">
                    {galleries.map((g) => (
                        <div key={g.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gold/5 transition-colors">
                            <span className="text-3xl">{g.image}</span>
                            <div className="flex-1">
                                <p className="font-medium text-navy">{g.name}</p>
                                <p className="text-xs text-lgray-dark">{g.items} items</p>
                            </div>
                            <div className="flex gap-1">
                                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-royal hover:bg-royal hover:text-white transition-all cursor-pointer">
                                    <FaEdit size={11} />
                                </button>
                                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                    <FaTrash size={11} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Events */}
            <div className="admin-card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-navy">Events ({events.length})</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gold text-navy rounded-lg text-sm font-medium hover:bg-gold-light transition-all cursor-pointer">
                        <FaPlus size={12} /> Add Event
                    </button>
                </div>
                <div className="space-y-3">
                    {events.map((e) => (
                        <div key={e.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gold/5 transition-colors">
                            <div className="flex-1">
                                <p className="font-medium text-navy">{e.title}</p>
                                <p className="text-xs text-lgray-dark">{e.date} • {e.time}</p>
                            </div>
                            <span className="text-sm font-bold text-gold">{e.price}</span>
                            <div className="flex gap-1">
                                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-royal hover:bg-royal hover:text-white transition-all cursor-pointer">
                                    <FaEdit size={11} />
                                </button>
                                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                    <FaTrash size={11} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visiting Hours */}
            <div className="admin-card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-navy">Visiting Hours</h3>
                    <button
                        onClick={() => setEditingSection(editingSection === 'hours' ? null : 'hours')}
                        className="flex items-center gap-2 px-3 py-1.5 bg-navy/5 hover:bg-navy hover:text-gold rounded-lg text-sm transition-all cursor-pointer"
                    >
                        <FaEdit size={12} /> {editingSection === 'hours' ? 'Cancel' : 'Edit'}
                    </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    {Object.entries(defaultMuseum.visitingHours).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-2.5 bg-gray-50 rounded-lg">
                            <span className="text-lgray-dark capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-medium text-navy">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
