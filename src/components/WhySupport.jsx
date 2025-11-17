import { Home, BookOpen, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './WhySupport.module.css';

export default function WhySupport() {
  const reasons = [
    {
      icon: <Home size={48} />,
      title: 'UN TOIT POUR CHAQUE ENFANT',
      description: 'Offrir un lieu de vie sécurisé et chaleureux où chaque enfant peut grandir en paix et retrouver l\'espoir d\'un avenir meilleur.'
    },
    {
      icon: <BookOpen size={48} />,
      title: 'UNE ÉDUCATION POUR L\'AVENIR',
      description: 'Accès à l\'école, aux livres et aux outils nécessaires pour construire leur avenir et réaliser leurs rêves les plus fous.'
    },
    {
      icon: <Heart size={48} />,
      title: 'DES SOINS POUR LEUR SANTÉ',
      description: 'Suivi médical régulier, alimentation équilibrée et soins adaptés pour grandir en bonne santé et en toute sérénité.'
    },
    {
      icon: <Users size={48} />,
      title: 'UN AMOUR POUR LEURS CŒURS',
      description: 'Encadrement bienveillant, soutien psychologique et présence affectueuse pour panser les blessures et redonner confiance.'
    }
  ];

  return (
    <section className={styles.whySupport}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>POURQUOI SOUTENIR UN ORPHELIN ?</h2>
          <p className={styles.subtitle}>
            Chaque don transforme une vie. Voici comment votre générosité change tout.
          </p>
        </div>

        {/* Grille de raisons */}
        <div className={styles.reasonsGrid}>
          {reasons.map((reason, index) => (
            <div key={index} className={styles.reasonCard}>
              <div className={styles.cardInner}>
                {/* Front */}
                <div className={styles.cardFront}>
                  <div className={styles.iconWrapper}>
                    {reason.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{reason.title}</h3>
                  <p className={styles.cardDescription}>{reason.description}</p>
                  <div className={styles.cardDecoration}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section impact */}
        <div className={styles.impactSection}>
          <div className={styles.impactCard}>
            <div className={styles.impactContent}>
              <h3 className={styles.impactTitle}>
                💡 Votre don en action
              </h3>
              <div className={styles.impactGrid}>
                <div className={styles.impactItem}>
                  <span className={styles.impactAmount}>10€</span>
                  <span className={styles.impactText}>= 10 repas chauds</span>
                </div>
                <div className={styles.impactItem}>
                  <span className={styles.impactAmount}>50€</span>
                  <span className={styles.impactText}>= 1 mois d'éducation</span>
                </div>
                <div className={styles.impactItem}>
                  <span className={styles.impactAmount}>100€</span>
                  <span className={styles.impactText}>= 2 mois de prise en charge</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>Prêt à changer une vie ?</h3>
          <p className={styles.ctaText}>
            Rejoignez les 487 donateurs qui ont déjà dit OUI.
          </p>
          <Link to="/pourquoi-soutenir" className={styles.learnMoreButton}>
            <span>En savoir plus</span>
            <span className={styles.buttonArrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}