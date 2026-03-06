import { useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { FaBell, FaUserCircle } from 'react-icons/fa';

export default function AdminLayout({ children }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar currentPath={location.pathname} />
            <div className="ml-64">
                {/* Admin Header */}
                <header className="h-16 bg-white border-b border-lgray flex items-center justify-between px-6 sticky top-0 z-30">
                    <div>
                        <h1 className="text-navy font-heading font-bold text-lg">
                            {getPageTitle(location.pathname)}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lgray-dark hover:bg-gold/10 hover:text-gold transition-all duration-300">
                            <FaBell size={16} />
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                                3
                            </span>
                        </button>
                        <div className="flex items-center gap-2 pl-4 border-l border-lgray">
                            <FaUserCircle className="text-royal text-2xl" />
                            <div>
                                <p className="text-sm font-medium text-navy">Admin</p>
                                <p className="text-[10px] text-lgray-dark">Museum Staff</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

function getPageTitle(path) {
    const titles = {
        '/admin/dashboard': 'Dashboard Overview',
        '/admin/bookings': 'Booking Management',
        '/admin/payments': 'Payment Transactions',
        '/admin/analytics': 'Visitor Analytics',
        '/admin/content': 'Content Management',
        '/admin/chatbot': 'Chatbot Management',
    };
    return titles[path] || 'Admin Portal';
}
