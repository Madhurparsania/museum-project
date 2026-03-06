import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaLandmark } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/museums', label: 'Museums' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-royal/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FaLandmark className="text-navy text-xl" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-soft-white font-heading font-bold text-lg leading-tight">
                                MuseumPass
                            </h1>
                            <p className="text-gold text-xs font-medium tracking-wider">
                                BANGALORE MUSEUMS
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(link.path)
                                    ? 'bg-gold text-navy'
                                    : 'text-soft-white hover:bg-white/10 hover:text-gold'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to="/admin/login"
                            className="ml-4 px-4 py-2 rounded-xl text-sm font-medium border border-gold/50 text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-soft-white hover:bg-white/10 transition-colors"
                    >
                        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pb-4 space-y-1 bg-navy-light/95 backdrop-blur-md border-t border-royal/20">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(link.path)
                                ? 'bg-gold text-navy'
                                : 'text-soft-white hover:bg-white/10'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/admin/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-xl text-sm font-medium text-gold border border-gold/30 hover:bg-gold hover:text-navy transition-all duration-300 text-center mt-2"
                    >
                        Admin Portal
                    </Link>
                </div>
            </div>
        </nav>
    );
}
