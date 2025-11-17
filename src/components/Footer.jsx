import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Image de fond avec parallax */}
      <div className={styles.footerBackground}>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.footerContent}>
        <div className="container">
          
          {/* Section Logo + Slogan */}
          <div className={styles.footerBrand}>
            <div className={styles.logoSection}>
              <div className={styles.logoIcon}>
                <span className={styles.logoIconInner}>S</span>
              </div>
              <div className={styles.logoText}>
                <h3 className={styles.logoName}>SKYBLUE</h3>
                <p className={styles.slogan}>"Votre générosité, leur horizon"</p>
              </div>
            </div>
            <p className={styles.tagline}>
              Ensemble, offrons un avenir à chaque orphelin.
              Votre don change des vies.
            </p>
          </div>

          {/* Grille principale */}
          <div className={styles.footerGrid}>
            
            {/* Colonne 1 : Qui sommes-nous */}
            <div className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>Qui sommes-nous</h4>
              <ul className={styles.linkList}>
                <li><Link to="/qui-sommes-nous">À propos</Link></li>
                <li><Link to="/qui-sommes-nous#mission">Notre mission</Link></li>
                <li><Link to="/qui-sommes-nous#equipe">L'équipe</Link></li>
                <li><Link to="/qui-sommes-nous#valeurs">Nos valeurs</Link></li>
              </ul>
            </div>

            {/* Colonne 2 : Liens utiles */}
            <div className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>Liens utiles</h4>
              <ul className={styles.linkList}>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/temoignages">Témoignages</Link></li>
                <li><Link to="/partenaires">Partenaires</Link></li>
                <li><Link to="/presse">Espace Presse</Link></li>
                <li><Link to="/rapport-annuel">Rapport annuel</Link></li>
              </ul>
            </div>

            {/* Colonne 3 : Contact */}
            <div className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>Contact</h4>
              <ul className={styles.contactList}>
                <li>
                  <Mail size={20} />
                  <a href="mailto:contact@skyblue.org">contact@skyblue.org</a>
                </li>
                <li>
                  <Phone size={20} />
                  <a href="tel:+221XXXXXXXXX">+221 XX XX XX XX</a>
                </li>
                <li>
                  <MapPin size={20} />
                  <span>
                    Avenue Cheikh Anta Diop<br />
                    Dakar, Sénégal
                  </span>
                </li>
                <li>
                  <Clock size={20} />
                  <span>
                    Lun-Ven : 8h - 18h<br />
                    Sam : 9h - 13h
                  </span>
                </li>
              </ul>
            </div>

            {/* Colonne 4 : Suivez-nous */}
            <div className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>Suivez-nous</h4>
              <div className={styles.socialLinks}>
                <a 
                  href="https://facebook.com/skyblue" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.socialIcon} ${styles.facebook}`}
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://instagram.com/skyblue" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.socialIcon} ${styles.instagram}`}
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://twitter.com/skyblue" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.socialIcon} ${styles.twitter}`}
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a 
                  href="https://linkedin.com/company/skyblue" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.socialIcon} ${styles.linkedin}`}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </div>
              <p className={styles.socialTagline}>
                Rejoignez notre communauté de 10 000+ personnes
              </p>
            </div>
          </div>

          {/* Section CTA */}
          <div className={styles.footerCta}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>🌟 Rejoignez le mouvement</h3>
              <p className={styles.ctaText}>
                487 donateurs ont déjà changé des vies. Et vous ?
              </p>
              <Link to="/faire-un-don" className={styles.ctaButton}>
                <span className={styles.ctaIcon}>💡</span>
                <span>Faire un don maintenant</span>
              </Link>
            </div>
          </div>

          {/* Séparateur */}
          <div className={styles.divider}></div>

          {/* Footer Bottom */}
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              © {currentYear} SkyBlue. Tous droits réservés.
            </p>
            <nav className={styles.legalLinks}>
              <Link to="/mentions-legales">Mentions légales</Link>
              <span className={styles.separator}>•</span>
              <Link to="/politique-confidentialite">Politique de confidentialité</Link>
              <span className={styles.separator}>•</span>
              <Link to="/cgu">CGU</Link>
              <span className={styles.separator}>•</span>
              <Link to="/cookies">Cookies</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}