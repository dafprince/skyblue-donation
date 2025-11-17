import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Image de fond */}
      <div className={styles.heroBackground}>
        <div className={styles.overlay}></div>
      </div>

      {/* Particules flottantes */}
      <div className={styles.particles}>
        <span className={styles.particle}></span>
        <span className={styles.particle}></span>
        <span className={styles.particle}></span>
        <span className={styles.particle}></span>
        <span className={styles.particle}></span>
        <span className={styles.particle}></span>
      </div>

      {/* Contenu */}
      <div className={styles.heroContent}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            <span className={styles.titleLine1}>ENSEMBLE,</span>
            <span className={styles.titleLine2}>OFFRONS-LEUR</span>
            <span className={styles.titleLine3}>UN AVENIR</span>
          </h1>
          
          <p className={styles.subtitle}>
            Votre générosité change des vies
          </p>

          <Link to="/faire-un-don" className={styles.ctaButton}>
            <span className={styles.ctaIconWrapper}>
              <span className={styles.lampIcon}>💡</span>
            </span>
            <span className={styles.ctaText}>FAIRE UN DON MAINTENANT</span>
            <span className={styles.arrow}>→</span>
          </Link>

          {/* Badges de confiance */}
          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🔒</span>
              <span>Paiement sécurisé</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>100% Transparent</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>❤️</span>
              <span>487 donateurs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
       
        <div className={styles.mouse}>
          <div className={styles.mouseWheel}></div>
        </div>
      </div>
    </section>
  );
}