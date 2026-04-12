import { useState, useEffect } from 'react';
import { FaEdit, FaGlobe, FaTimes, FaSave, FaRobot } from 'react-icons/fa';

const intentCategories = [
    { key: 'greeting', label: 'Greeting' },
    { key: 'mainMenu', label: 'Main Menu' },
    { key: 'fallback', label: 'Fallback Response' },
    { key: 'thanks', label: 'Thank You / Goodbye' },
];

const bookingIntents = [
    { key: 'start', label: 'Booking Start' },
    { key: 'selectDate', label: 'Select Date' },
    { key: 'selectTimeSlot', label: 'Select Time Slot' },
    { key: 'selectCategory', label: 'Select Category' },
    { key: 'selectQuantity', label: 'Select Quantity' },
    { key: 'paymentRedirect', label: 'Payment Redirect' },
    { key: 'success', label: 'Booking Success' },
    { key: 'cancelled', label: 'Booking Cancelled' },
    { key: 'slotFull', label: 'Slot Full' },
];

const infoIntents = [
    { key: 'menu', label: 'Info Menu' },
    { key: 'history', label: 'Museum History' },
    { key: 'hours', label: 'Visiting Hours' },
    { key: 'rules', label: 'Rules & Guidelines' },
    { key: 'location', label: 'Location & Contact' },
];

export default function ChatbotManagement() {
    const [activeLang, setActiveLang] = useState('en');
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [languageOptions, setLanguageOptions] = useState([]);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        fetch('/api/chatbot/languages').then(r => r.json()).then(setLanguageOptions).catch(console.error);
    }, []);

    useEffect(() => {
        fetch(`/api/chatbot/responses/${activeLang}`)
            .then(r => r.json())
            .then(setResponses)
            .catch(console.error);
    }, [activeLang]);

    function startEdit(key, value) {
        setEditingField(key);
        setEditValue(typeof value === 'function' ? 'Dynamic response (template function)' : value);
    }

    function cancelEdit() {
        setEditingField(null);
        setEditValue('');
    }

    function renderResponseRow(key, label, value) {
        const displayValue = typeof value === 'function' ? '⚡ Dynamic template function' : value;
        const isEditing = editingField === key;

        return (
            <div key={key} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gold/5 transition-colors">
                <div className="flex-1">
                    <p className="text-sm font-medium text-navy mb-1">{label}</p>
                    {isEditing ? (
                        <div className="space-y-2">
                            <textarea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                rows={3}
                                className="input-field text-xs resize-none"
                            />
                            <div className="flex gap-2">
                                <button className="flex items-center gap-1 px-3 py-1.5 bg-gold text-navy rounded-lg text-xs font-medium cursor-pointer">
                                    <FaSave size={10} /> Save
                                </button>
                                <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 bg-lgray text-navy rounded-lg text-xs font-medium cursor-pointer">
                                    <FaTimes size={10} /> Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs text-lgray-dark whitespace-pre-line leading-relaxed">{displayValue}</p>
                    )}
                </div>
                {!isEditing && typeof value !== 'function' && (
                    <button
                        onClick={() => startEdit(key, value)}
                        className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-royal hover:bg-royal hover:text-white transition-all flex-shrink-0 cursor-pointer"
                    >
                        <FaEdit size={11} />
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Language Tabs */}
            <div className="admin-card">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <FaGlobe className="text-royal text-xl" />
                        <h3 className="font-heading font-bold text-navy">Language Selection</h3>
                    </div>
                </div>
                <div className="flex gap-2">
                    {languageOptions.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => { setActiveLang(lang.code); cancelEdit(); }}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeLang === lang.code
                                    ? 'bg-navy text-gold'
                                    : 'bg-lgray/30 text-lgray-dark hover:bg-lgray/50'
                                }`}
                        >
                            {lang.flag} {lang.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* General Responses */}
            <div className="admin-card">
                <h3 className="font-heading font-bold text-navy mb-4 flex items-center gap-2">
                    <FaRobot className="text-royal" /> General Responses
                </h3>
                <div className="space-y-2">
                    {intentCategories.map((intent) =>
                        renderResponseRow(intent.key, intent.label, responses[intent.key])
                    )}
                </div>
            </div>

            {/* Booking Responses */}
            <div className="admin-card">
                <h3 className="font-heading font-bold text-navy mb-4">🎫 Booking Flow Responses</h3>
                <div className="space-y-2">
                    {bookingIntents.map((intent) =>
                        renderResponseRow(`booking.${intent.key}`, intent.label, responses.booking?.[intent.key])
                    )}
                </div>
            </div>

            {/* Info Responses */}
            <div className="admin-card">
                <h3 className="font-heading font-bold text-navy mb-4">ℹ️ Information Responses</h3>
                <div className="space-y-2">
                    {infoIntents.map((intent) =>
                        renderResponseRow(`info.${intent.key}`, intent.label, responses.info?.[intent.key])
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="admin-card">
                <h3 className="font-heading font-bold text-navy mb-4">📊 Chatbot Statistics</h3>
                <div className="grid sm:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Conversations', value: '3,847' },
                        { label: 'Booking via Chat', value: '892' },
                        { label: 'Avg. Response Time', value: '0.8s' },
                        { label: 'Resolution Rate', value: '94%' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-xl font-bold text-navy">{stat.value}</p>
                            <p className="text-xs text-lgray-dark mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
