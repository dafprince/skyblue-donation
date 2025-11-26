import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhySupportPage from './pages/WhySupportPage';
import DonatePage from './pages/DonatePage';
import DonationSuccessPage from './pages/DonationSuccessPage';

// Admin imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import DonationsPage from './pages/admin/DonationsPage';
import MessagesPage from './pages/admin/MessagesPage';
import StatsPage from './pages/admin/StatsPage';
import SettingsPage from './pages/admin/SettingsPage';

import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={
          <>
            <Header />
            <HomePage />
            <Footer />
            <WhatsAppButton />
          </>
        } />
        
        <Route path="/qui-sommes-nous" element={
          <>
            <Header />
            <AboutPage />
            <Footer />
            <WhatsAppButton />
          </>
        } />
        
        <Route path="/pourquoi-soutenir" element={
          <>
            <Header />
            <WhySupportPage />
            <Footer />
            <WhatsAppButton />
          </>
        } />
        
        <Route path="/faire-un-don" element={
          <>
            <Header />
            <DonatePage />
            <Footer />
            <WhatsAppButton />
          </>
        } />
        
        <Route path="/don-success" element={
          <>
            <Header />
            <DonationSuccessPage />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        {/* Routes Admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/donations" element={
          <ProtectedRoute>
            <DonationsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/messages" element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/stats" element={
          <ProtectedRoute>
            <StatsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;