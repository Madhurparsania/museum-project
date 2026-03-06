import { FaLandmark, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-navy text-soft-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                                <FaLandmark className="text-navy text-xl" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-lg">MuseumPass</h3>
                                <p className="text-gold text-xs tracking-wider">BANGALORE MUSEUMS</p>
                            </div>
                        </div>
                        <p className="text-lgray-dark text-sm leading-relaxed">
                            Your gateway to Bangalore's finest museums. Browse, book tickets, and explore rich cultural heritage — all in one place, in your language.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-gold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/museums', label: 'Explore Museums' },
                                { to: '/admin/login', label: 'Admin Portal' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-lgray-dark text-sm hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-semibold text-gold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-lgray-dark">
                                <HiLocationMarker className="text-gold mt-0.5 flex-shrink-0" />
                                Bengaluru, Karnataka, India
                            </li>
                            <li className="flex items-center gap-3 text-sm text-lgray-dark">
                                <HiMail className="text-gold flex-shrink-0" />
                                support@museumpass.in
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-heading font-semibold text-gold mb-4">Follow Us</h4>
                        <div className="flex gap-3">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 bg-royal/30 rounded-xl flex items-center justify-center text-lgray-dark hover:bg-gold hover:text-navy transition-all duration-300"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                        <div className="mt-6">
                            <h5 className="text-sm font-medium mb-2">8 Museums to Explore</h5>
                            <p className="text-lgray-dark text-xs">Science · Art · History · Music</p>
                            <p className="text-gold text-xs font-medium">Book tickets in 13 languages</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-royal/20 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-lgray-dark text-xs">
                        © 2026 MuseumPass. All rights reserved. Smart Museum Ticket Booking Platform.
                    </p>
                    <div className="flex gap-6 text-xs text-lgray-dark">
                        <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-gold transition-colors">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
