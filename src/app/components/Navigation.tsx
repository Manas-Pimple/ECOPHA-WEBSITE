import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/technology', label: 'Technology' },
  { to: '/innovation', label: 'Innovation' },
  { to: '/impact', label: 'Impact' },
  { to: '/shop', label: 'Shop' },
];

export function Navigation({ darkMode, setDarkMode }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 mx-4 mt-3 rounded-2xl shadow-2xl backdrop-blur-xl bg-card/85 border border-border'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-primary font-display font-700 text-lg leading-none">Ecopha</span>
              <span className="text-secondary font-display text-lg leading-none font-400">World</span>
              <div className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase leading-none">.com.au</div>
            </div>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-500 transition-all duration-200 relative ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-14 h-7 rounded-full transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: darkMode ? '#4BA6F0' : '#2E9E4F' }}
              aria-label="Toggle dark mode"
            >
              <motion.div
                animate={{ x: darkMode ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
              >
                {darkMode
                  ? <Moon className="w-3 h-3 text-primary" />
                  : <Sun className="w-3 h-3 text-secondary" />
                }
              </motion.div>
            </button>

            {/* Get in Touch CTA */}
            <a
              href="mailto:hello@ecoph aworld.com.au"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-600 hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get Started
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-500 transition-all duration-200 ${
                      isActive ? 'text-primary bg-primary/10' : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 pt-2 border-t border-border">
                <a
                  href="mailto:hello@ecoph aworld.com.au"
                  className="block text-center px-4 py-3 rounded-xl bg-primary text-white text-sm font-600 hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
