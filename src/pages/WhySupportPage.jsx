import { Heart, TrendingUp, BookOpen, Award, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './WhySupportPage.module.css';

export default function WhySupportPage() {
  const donations = [
    { amount: '10€', impact: '10 repas chauds pour un enfant', icon: '🍽️' },
    { amount: '50€', impact: '1 mois d\'éducation complète + suivi médical', icon: '📚' },
    { amount: '100€', impact: '2 mois de prise en charge totale', icon: '🏠' },
    { amount: '200€', impact: '1 trimestre avec activités sportives et artistiques', icon: '⚽' }
  ];

  const stories = [
    {
      name: 'FATIMA, 14 ANS',
      location: 'SÉNÉGAL',
      story: 'Avant SkyBlue, je dormais dans la rue. Aujourd\'hui, je suis en 3ème et je veux devenir avocate pour défendre les enfants comme moi.',
      support: 'Soutenue depuis 2021',
      donation: 'Don : 75€/mois'
    },
    {
      name: 'KARIM, 16 ANS',
      location: 'CÔTE D\'IVOIRE',
      story: 'Grâce à votre générosité, j\'ai eu mon bac avec mention. L\'année prochaine, je commence mes études d\'ingénieur.',
      support: 'Soutenu depuis 2019',
      donation: 'Don total : 3 200€'
    },
    {
      name: 'AÏCHA, 10 ANS',
      location: 'MALI',
      story: 'Maintenant, je peux aller à l\'école. Et je sais lire ! Un jour, je serai institutrice pour apprendre aux autres.',
      support: 'Soutenue depuis 2023',
      donation: 'Don : 25€/mois'
    }
  ];

  const reasons = [
    {
      icon: <TrendingUp size={36} />,
      title: 'IMPACT IMMÉDIAT',
      description: 'Votre don aide DÈS AUJOURD\'HUI. Pas dans 6 mois.'
    },
    {
      icon: <Award size={36} />,
      title: '100% TRANSPARENT',
      description: 'Vous voyez où va chaque euro. En TEMPS RÉEL.'
    },
    {
      icon: <Clock size={36} />,
      title: 'AUCUN ENGAGEMENT',
      description: 'Vous donnez une fois. Aucun prélèvement automatique.'
    },
    {
      icon: <Heart size={36} />,
      title: 'SÉCURISÉ À 100%',
      description: 'Paiement Stripe. Vos données sont protégées.'
    },
    {
      icon: <BookOpen size={36} />,
      title: 'VOUS CHANGEZ UNE VIE',
      description: 'Littéralement. Un enfant aura un avenir grâce à VOUS.'
    }
  ];

  return (
    <div className={styles.whySupportPage}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.overlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>POURQUOI SOUTENIR UN ORPHELIN ?</h1>
            <p className={styles.heroSubtitle}>
              Parce qu'un enfant ne devrait jamais grandir seul
            </p>
          </div>
        </div>
      </section>

      {/* Section Réalité */}
      <section className={styles.realitySection}>
        <div className="container">
          <div className={styles.realityContent}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.emoji}>💔</span>
              LA DURE RÉALITÉ
            </h2>
            <p className={styles.bigStat}>
              Dans le monde, <strong>140 MILLIONS</strong> d'orphelins grandissent sans parents.
            </p>
            <div className={styles.realityList}>
              <p>Imaginez un instant :</p>
              <ul>
                <li>Se réveiller sans un "Bonjour mon chéri"</li>
                <li>Dormir sans un "Je t'aime"</li>
                <li>Grandir sans un câlin quand ça fait mal</li>
                <li>Rêver sans personne pour y croire</li>
              </ul>
            </div>
            <p className={styles.realityConclusion}>
              C'est la réalité de millions d'enfants. Mais <strong>vous pouvez la changer</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Section Votre don en action */}
      <section className={styles.impactSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <span className={styles.emoji}>✨</span>
            VOTRE DON EN ACTION
          </h2>
          <p className={styles.sectionSubtitle}>
            Chaque euro compte. Voici comment votre générosité change tout.
          </p>
          <div className={styles.donationsGrid}>
            {donations.map((donation, index) => (
              <div key={index} className={styles.donationCard}>
                <div className={styles.donationIcon}>{donation.icon}</div>
                <div className={styles.donationAmount}>{donation.amount}</div>
                <div className={styles.donationImpact}>{donation.impact}</div>
              </div>
            ))}
          </div>
          <p className={styles.impactNote}>
            Chaque euro compte. Chaque geste sauve.
          </p>
        </div>
      </section>

      {/* Section Histoires */}
      <section className={styles.storiesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <span className={styles.emoji}>📖</span>
            ILS ONT REÇU UN DON, ILS ONT CHANGÉ LE MONDE
          </h2>
          <p className={styles.sectionSubtitle}>
            Ces histoires ? C'est VOTRE POUVOIR en action.
          </p>
          <div className={styles.storiesGrid}>
            {stories.map((story, index) => (
              <div key={index} className={styles.storyCard}>
                <div className={styles.storyHeader}>
                  <h3 className={styles.storyName}>{story.name}</h3>
                  <p className={styles.storyLocation}>{story.location}</p>
                </div>
                <p className={styles.storyText}>"{story.story}"</p>
                <div className={styles.storyFooter}>
                  <p className={styles.storySupport}>→ {story.support}</p>
                  <p className={styles.storyDonation}>({story.donation})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Pourquoi maintenant */}
      <section className={styles.urgencySection}>
        <div className="container">
          <div className={styles.urgencyContent}>
            <h2 className={styles.urgencyTitle}>
              <span className={styles.emoji}>⏰</span>
              POURQUOI MAINTENANT ?
            </h2>
            <div className={styles.urgencyText}>
              <p>Pendant que vous lisez ces lignes :</p>
              <ul>
                <li>Un orphelin a faim</li>
                <li>Un enfant abandonne l'école</li>
                <li>Une maladie aurait pu être évitée</li>
              </ul>
              <p className={styles.urgencyBold}>
                MAIS VOUS ÊTES LÀ. Et vous pouvez agir. <strong>Maintenant.</strong>
              </p>
              <p>Pas demain. Pas "quand j'aurai le temps". <strong>MAINTENANT.</strong></p>
              <p className={styles.urgencyFinal}>
                Parce qu'un enfant ne devrait jamais attendre pour avoir un <strong>AVENIR</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 raisons */}
      <section className={styles.reasonsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <span className={styles.emoji}>🎯</span>
            5 RAISONS D'AGIR MAINTENANT
          </h2>
          <div className={styles.reasonsGrid}>
            {reasons.map((reason, index) => (
              <div key={index} className={styles.reasonCard}>
                <div className={styles.reasonNumber}>{index + 1}</div>
                <div className={styles.reasonIcon}>{reason.icon}</div>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonDescription}>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final massif */}
      <section className={styles.finalCta}>
        <div className="container">
          <div className={styles.finalCtaContent}>
            <div className={styles.finalCtaIcon}>🌟</div>
            <h2 className={styles.finalCtaTitle}>
              VOUS ÊTES À 1 CLIC DE CHANGER UNE VIE
            </h2>
            <p className={styles.finalCtaText}>
              Rejoignez les 487 héros qui ont dit OUI.
            </p>
            <Link to="/faire-un-don" className={styles.finalCtaButton}>
              <span className={styles.lampIcon}>💡</span>
              <span>JE FAIS UN DON MAINTENANT</span>
              <span className={styles.arrow}>→</span>
            </Link>
            <p className={styles.finalCtaUrgency}>
              ⏰ Un enfant attend VOTRE geste. Maintenant.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}