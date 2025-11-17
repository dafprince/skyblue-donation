import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Heart, Home, Share2 } from 'lucide-react';
import styles from './DonationSuccessPage.module.css';

export default function DonationSuccessPage() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Arrêter les confettis après 5 secondes
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'J\'ai fait un don à SkyBlue !',
        text: 'Je viens d\'aider des orphelins avec SkyBlue. Rejoignez-moi !',
        url: window.location.origin
      }).catch(() => {});
    }
  };

  return (
    <div className={styles.successPage}>
      {/* Confettis */}
      {showConfetti && (
        <div className={styles.confettiContainer}>
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={styles.confetti}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                backgroundColor: ['#4A90E2', '#FF8C42', '#5CB85C', '#E74C3C', '#FFD700'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      {/* Contenu principal */}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.successCard}>
            
            {/* Icône de succès */}
            <div className={styles.successIcon}>
              <div className={styles.iconCircle}>
                <CheckCircle size={80} />
              </div>
            </div>

            {/* Titre */}
            <h1 className={styles.title}>
              MERCI POUR VOTRE GÉNÉROSITÉ ! 🎉
            </h1>

            {/* Sous-titre */}
            <p className={styles.subtitle}>
              Votre don a été reçu avec succès
            </p>

            {/* Message principal */}
            <div className={styles.messageBox}>
              <p className={styles.message}>
                Grâce à vous, un enfant aura un repas chaud aujourd'hui. 
                Un livre entre les mains. Un sourire sur le visage.
              </p>
              <p className={styles.messageBold}>
                Vous venez de changer une VIE. 💙
              </p>
            </div>

            {/* Informations */}
            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>
                <Heart size={28} />
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoText}>
                  Un email de confirmation vous a été envoyé avec tous les détails de votre don.
                </p>
                <p className={styles.infoTextSmall}>
                  Vérifiez votre boîte de réception (et les spams si besoin).
                </p>
              </div>
            </div>

            {/* Statistiques */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>+1</div>
                <div className={styles.statLabel}>Vie changée</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>488</div>
                <div className={styles.statLabel}>Donateurs héros</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>24h</div>
                <div className={styles.statLabel}>Impact immédiat</div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button 
                className={styles.primaryButton}
                onClick={() => navigate('/')}
              >
                <Home size={20} />
                <span>Retour à l'accueil</span>
              </button>

              <button 
                className={styles.secondaryButton}
                onClick={handleShare}
              >
                <Share2 size={20} />
                <span>Partager mon geste</span>
              </button>
            </div>

            {/* Citation inspirante */}
            <div className={styles.quoteBox}>
              <p className={styles.quote}>
                "Ce n'est pas ce que nous avons dans la vie qui compte, 
                c'est ce que nous donnons."
              </p>
              <p className={styles.quoteAuthor}>— Proverbe</p>
            </div>

            {/* CTA Supplémentaire */}
            <div className={styles.extraCta}>
              <p className={styles.extraCtaText}>
                Vous voulez aller plus loin ?
              </p>
              <button 
                className={styles.ctaButton}
                onClick={() => navigate('/qui-sommes-nous')}
              >
                <span>Découvrez notre impact</span>
                <span className={styles.arrow}>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}