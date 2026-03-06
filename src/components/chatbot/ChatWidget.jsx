import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChatbotEngine } from '../../utils/chatbotEngine';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser, FaMinus } from 'react-icons/fa';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const engineRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        engineRef.current = createChatbotEngine();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    function openChat() {
        setIsOpen(true);
        setIsMinimized(false);
        if (messages.length === 0 && engineRef.current) {
            const initial = engineRef.current.getInitialMessages();
            setMessages(initial.map(msg => ({ ...msg, isBot: true, id: Date.now() + Math.random() })));
        }
    }

    function closeChat() {
        setIsOpen(false);
    }

    function sendMessage(text) {
        if (!text.trim()) return;
        const userMsg = { text: text.trim(), isBot: false, id: Date.now() + Math.random() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const responses = engineRef.current.processMessage(text.trim());
            const botMsgs = responses.map((r, i) => ({
                text: r.text,
                isBot: true,
                quickReplies: r.quickReplies,
                action: r.action,
                bookingData: r.bookingData,
                id: Date.now() + i + Math.random(),
            }));

            setIsTyping(false);
            setMessages(prev => [...prev, ...botMsgs]);

            // Handle payment redirect
            const paymentMsg = botMsgs.find(m => m.action === 'REDIRECT_PAYMENT');
            if (paymentMsg && paymentMsg.bookingData) {
                setTimeout(() => {
                    navigate('/payment', {
                        state: {
                            date: paymentMsg.bookingData.date,
                            timeSlotLabel: paymentMsg.bookingData.timeSlot,
                            totalTickets: paymentMsg.bookingData.quantity,
                            totalAmount: paymentMsg.bookingData.total,
                            bookingId: 'BK' + Date.now().toString().slice(-6),
                        },
                    });
                }, 1500);
            }
        }, 800 + Math.random() * 500);
    }

    function handleQuickReply(value) {
        sendMessage(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(input);
    }

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={openChat}
                    className="fixed bottom-6 right-6 z-[999] w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-2xl shadow-gold/30 hover:scale-110 hover:shadow-gold/50 active:scale-95 transition-all duration-300 group cursor-pointer"
                >
                    <FaComments className="text-navy text-2xl group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                        1
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={`fixed bottom-6 right-6 z-[999] w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-500 animate-slide-up ${isMinimized ? 'h-14' : 'h-[600px] max-h-[calc(100vh-3rem)]'
                    } flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-royal/30`}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-navy to-royal px-4 py-3 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gold rounded-xl flex items-center justify-center">
                                <FaRobot className="text-navy text-sm" />
                            </div>
                            <div>
                                <h3 className="text-soft-white font-bold text-sm">Museum Assistant</h3>
                                <p className="text-green-400 text-[10px] flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="w-8 h-8 rounded-lg text-lgray hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <FaMinus size={12} />
                            </button>
                            <button
                                onClick={closeChat}
                                className="w-8 h-8 rounded-lg text-lgray hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <FaTimes size={14} />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                {messages.map((msg) => (
                                    <div key={msg.id}>
                                        <div className={`flex items-end gap-2 ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                                            {msg.isBot && (
                                                <div className="w-7 h-7 bg-royal rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <FaRobot className="text-white text-xs" />
                                                </div>
                                            )}
                                            <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.isBot
                                                    ? 'bg-royal text-white rounded-bl-md'
                                                    : 'bg-lgray text-navy rounded-br-md'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            {!msg.isBot && (
                                                <div className="w-7 h-7 bg-lgray rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <FaUser className="text-navy text-xs" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Quick Replies */}
                                        {msg.isBot && msg.quickReplies && (
                                            <div className="mt-2 ml-9 flex flex-wrap gap-1.5">
                                                {msg.quickReplies.map((qr, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleQuickReply(qr.value)}
                                                        className="px-3 py-1.5 bg-white border border-royal/30 rounded-full text-xs text-royal font-medium hover:bg-royal hover:text-white transition-all duration-300 cursor-pointer"
                                                    >
                                                        {qr.text}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <div className="flex items-end gap-2">
                                        <div className="w-7 h-7 bg-royal rounded-lg flex items-center justify-center">
                                            <FaRobot className="text-white text-xs" />
                                        </div>
                                        <div className="bg-royal/10 px-4 py-3 rounded-2xl rounded-bl-md">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-royal/50 rounded-full animate-typing"></span>
                                                <span className="w-2 h-2 bg-royal/50 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></span>
                                                <span className="w-2 h-2 bg-royal/50 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-lgray/50 flex gap-2 flex-shrink-0">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-lgray/50 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-navy hover:bg-gold-light active:scale-95 transition-all disabled:opacity-30 cursor-pointer"
                                >
                                    <FaPaperPlane size={14} />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
