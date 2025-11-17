import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhySupportPage from './pages/WhySupportPage';
import DonatePage from './pages/DonatePage';
import DonationSuccessPage from './pages/DonationSuccessPage';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/qui-sommes-nous" element={<AboutPage />} />
          <Route path="/pourquoi-soutenir" element={<WhySupportPage />} />
          <Route path="/faire-un-don" element={<DonatePage />} />
          <Route path="/don-success" element={<DonationSuccessPage />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;