import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Leadership from './pages/Leadership';
import Teachers from './pages/Teachers';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import { LanguageProvider } from './i18n';
import Maintenance from './pages/Maintenance';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const isMaintenanceMode = true && !isLocalhost; // Toggle to false to launch the full website globally

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  if (isMaintenanceMode) {
    return (
      <HelmetProvider>
        <LanguageProvider>
          <Maintenance />
        </LanguageProvider>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#FAFBFD] relative antialiased selection:bg-brand-gold selection:text-brand-dark overflow-x-hidden">
            {/* Ambient background blur circles */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-navy/5 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Noise texture overlay */}
            <div className="noise-overlay" />
            
            <Navbar />
            <div className="flex-grow relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leadership" element={<Leadership />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/news" element={<News />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
