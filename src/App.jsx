import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AdminLayout from './components/common/AdminLayout';
import ChatWidget from './components/chatbot/ChatWidget';

// Visitor Pages
import Home from './pages/visitor/Home';
import Museums from './pages/visitor/Museums';
import MuseumInfo from './pages/visitor/MuseumInfo';
import BookTickets from './pages/visitor/BookTickets';
import Payment from './pages/visitor/Payment';
import Confirmation from './pages/visitor/Confirmation';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Bookings from './pages/admin/Bookings';
import Payments from './pages/admin/Payments';
import Analytics from './pages/admin/Analytics';
import ContentManagement from './pages/admin/ContentManagement';
import ChatbotManagement from './pages/admin/ChatbotManagement';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAdminLogin = location.pathname === '/admin/login';

  // Admin login page has its own full layout
  if (isAdminLogin) {
    return <AdminLogin />;
  }

  // Admin pages use AdminLayout
  if (isAdmin) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/content" element={<ContentManagement />} />
          <Route path="/admin/chatbot" element={<ChatbotManagement />} />
        </Routes>
      </AdminLayout>
    );
  }

  // Visitor pages
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/museums" element={<Museums />} />
          <Route path="/museum/:id" element={<MuseumInfo />} />
          <Route path="/museum/:id/book" element={<BookTickets />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
