import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { Navigation } from './components/Navigation';
import { HoneyChatbot } from './components/HoneyChatbot';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { InnovationPage } from './pages/InnovationPage';
import { DesignImpactPage } from './pages/DesignImpactPage';
import { ShopPage } from './pages/ShopPage';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-primary font-display" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Ecopha</span>
                <span className="text-secondary font-display" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>World</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Australia's pioneer in PHA bioplastics — packaging that returns to the earth.
            </p>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Discover</div>
            <div className="space-y-2">
              {['About', 'Technology', 'Innovation', 'Design & Impact'].map(link => (
                <a key={link} href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Certifications</div>
            <div className="space-y-2">
              {['EN 13432', 'AS 4736', 'TÜV OK Compost HOME', 'FSANZ Food Grade', 'Australian Made'].map(cert => (
                <div key={cert} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary text-[10px]">✓</span>
                  </div>
                  {cert}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Contact</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>📍 Brisbane, Queensland, Australia</div>
              <div>📧 hello@ecophaworld.com.au</div>
              <div>🌐 ecophaworld.com.au</div>
              <div className="mt-4 flex gap-2">
                {['LinkedIn', 'Instagram', 'Twitter'].map(s => (
                  <a
                    key={s}
                    href="#"
                    className="px-3 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 EcophaWorld Pty Ltd. All rights reserved. ABN: XX XXX XXX XXX</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-foreground transition-colors">Sustainability Report</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/innovation" element={<InnovationPage />} />
          <Route path="/impact" element={<DesignImpactPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
      <AnimatedRoutes />
      <HoneyChatbot />
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AppShell darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  );
}
