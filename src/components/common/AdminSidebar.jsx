import { Link } from 'react-router-dom';
import { FaLandmark, FaTicketAlt, FaChartBar, FaComments, FaCog, FaSignOutAlt, FaHome, FaCreditCard } from 'react-icons/fa';
import { HiViewGrid } from 'react-icons/hi';

const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: HiViewGrid },
    { path: '/admin/bookings', label: 'Bookings', icon: FaTicketAlt },
    { path: '/admin/payments', label: 'Payments', icon: FaCreditCard },
    { path: '/admin/analytics', label: 'Analytics', icon: FaChartBar },
    { path: '/admin/content', label: 'Content', icon: FaCog },
    { path: '/admin/chatbot', label: 'Chatbot Mgmt', icon: FaComments },
];

export default function AdminSidebar({ currentPath }) {
    return (
        <aside className="w-64 h-screen bg-navy fixed left-0 top-0 flex flex-col border-r border-royal/30 z-40">
            {/* Logo */}
            <div className="p-6 border-b border-royal/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                        <FaLandmark className="text-navy text-xl" />
                    </div>
                    <div>
                        <h2 className="text-soft-white font-heading font-bold text-sm">Admin Portal</h2>
                        <p className="text-gold text-[10px] tracking-wider font-medium">NATIONAL MUSEUM</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 overflow-y-auto">
                <p className="px-3 text-[10px] font-semibold text-lgray-dark tracking-widest uppercase mb-3">
                    Management
                </p>
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'bg-gold text-navy'
                                            : 'text-lgray-dark hover:bg-white/5 hover:text-soft-white'
                                        }`}
                                >
                                    <item.icon className={`text-base ${isActive ? 'text-navy' : 'text-lgray-dark'}`} />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-royal/20 space-y-1">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-lgray-dark hover:bg-white/5 hover:text-soft-white transition-all duration-300"
                >
                    <FaHome className="text-base" />
                    View Site
                </Link>
                <Link
                    to="/admin/login"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-300"
                >
                    <FaSignOutAlt className="text-base" />
                    Logout
                </Link>
            </div>
        </aside>
    );
}
