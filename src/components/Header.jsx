import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Effet de scroll pour rendre le header opaque
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: '🏠 Accueil' },
    { path: '/qui-sommes-nous', label: '👥 Qui sommes-nous' },
    { path: '/pourquoi-soutenir', label: '💡 Pourquoi soutenir' },
  ];

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.headerContent}>
            
            {/* Logo */}
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <span className={styles.logoIconInner}>S</span>
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>SKYBLUE</span>
                <span className={styles.logoTagline}>Votre générosité, leur horizon</span>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${styles.navLink} ${location.pathname === link.path ? styles.navLinkActive : ''}`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Bouton CTA */}
              <Link to="/faire-un-don" className={styles.ctaButton}>
                <span className={styles.ctaIcon}>💡</span>
                <span>Faire un don</span>
                <span className={styles.ctaGlow}></span>
              </Link>
            </nav>

            {/* Burger menu (mobile) */}
            <button
              className={styles.burger}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.mobileNavLink} ${location.pathname === link.path ? styles.mobileNavLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/faire-un-don" className={styles.mobileCtaButton}>
            <span className={styles.ctaIcon}>💡</span>
            <span>Faire un don</span>
          </Link>
        </nav>
      </div>

      {/* Overlay pour fermer le menu mobile */}
      {isMobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}