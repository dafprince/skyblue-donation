import { useState, useEffect, useRef } from 'react';
import styles from './Stats.module.css';

export default function Stats() {
  const [inView, setInView] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [donors, setDonors] = useState(0);
  const [orphans, setOrphans] = useState(0);
  
  const sectionRef = useRef(null);

  // Détection quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [inView]);

  // Animation des compteurs
  useEffect(() => {
    if (!inView) return;

    const animateCounter = (setter, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(timer);
          setter(target);
        } else {
          setter(Math.floor(start));
        }
      }, 16);

      return timer;
    };

    // Valeurs cibles (tu pourras les remplacer par des vraies données après)
    const timer1 = animateCounter(setTotalAmount, 52345, 2000);
    const timer2 = animateCounter(setDonors, 487, 2000);
    const timer3 = animateCounter(setOrphans, 124, 2000);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, [inView]);

  const progress = (totalAmount / 100000) * 100; // Objectif : 100 000€

  return (
    <section ref={sectionRef} className={styles.stats}>
      <div className="container">
        
        {/* Titre */}
        <div className={styles.header}>
          <h2 className={styles.title}>NOTRE IMPACT EN TEMPS RÉEL</h2>
          <p className={styles.subtitle}>
            Chaque euro compte. Chaque don change une vie.
          </p>
        </div>
        
        {/* Grille de stats */}
        <div className={styles.statsGrid}>
          
          {/* Montant collecté */}
          <div className={styles.statCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>💰</span>
            </div>
            <div className={styles.statValue}>
              {totalAmount.toLocaleString('fr-FR')}€
            </div>
            <div className={styles.statLabel}>Collectés</div>
            <div className={styles.statProgress}>
              <div className={styles.progressBar} style={{ width: `${Math.min(progress, 100)}%` }}></div>
            </div>
            <div className={styles.statSubtext}>
              sur 100 000€
            </div>
          </div>

          {/* Nombre de donateurs */}
          <div className={styles.statCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>❤️</span>
            </div>
            <div className={styles.statValue}>
              {donors}
            </div>
            <div className={styles.statLabel}>Donateurs</div>
            <div className={styles.statSubtext}>
              Merci pour votre générosité
            </div>
          </div>

          {/* Orphelins aidés */}
          <div className={styles.statCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🌟</span>
            </div>
            <div className={styles.statValue}>
              {orphans}
            </div>
            <div className={styles.statLabel}>Orphelins Aidés</div>
            <div className={styles.statSubtext}>
              Des vies changées
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            <strong>Rejoignez le mouvement !</strong> Ensemble, nous pouvons faire encore plus.
          </p>
        </div>
      </div>
    </section>
  );
}