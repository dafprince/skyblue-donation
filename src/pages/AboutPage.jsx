import { Heart, Target, Users, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const values = [
    {
      icon: <Heart size={40} />,
      title: 'EMPATHIE',
      description: 'Comprendre la détresse, agir avec le cœur'
    },
    {
      icon: <Target size={40} />,
      title: 'TRANSPARENCE',
      description: 'Chaque euro compte, chaque don est tracé'
    },
    {
      icon: <Users size={40} />,
      title: 'ENGAGEMENT',
      description: 'Nous ne lâchons rien, jamais'
    },
    {
      icon: <Award size={40} />,
      title: 'UNIVERSALITÉ',
      description: 'Un orphelin au Sénégal = Un orphelin en France'
    }
  ];

  const achievements = [
    { number: '8', label: 'Orphelinats soutenus' },
    { number: '487', label: 'Enfants aidés' },
    { number: '12 345', label: 'Livres distribués' },
    { number: '1 200', label: 'Consultations médicales' },
    { number: '94%', label: 'De réussite scolaire' }
  ];

  return (
    <div className={styles.aboutPage}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.overlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>QUI SOMMES-NOUS ?</h1>
            <p className={styles.heroSubtitle}>
              Des cœurs battants pour l'avenir des orphelins
            </p>
          </div>
        </div>
      </section>

      {/* Section Histoire */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.emoji}>🌅</span>
                TOUT A COMMENCÉ PAR UN REGARD
              </h2>
              <p>
                En 2020, dans un orphelinat de Dakar, un enfant de 7 ans nommé Omar 
                nous a regardés droit dans les yeux et a dit : <strong>"Un jour, je serai 
                médecin pour aider les autres comme vous m'aidez."</strong>
              </p>
              <p>
                Ce jour-là, <strong>SkyBlue est né</strong>. Pas comme une organisation de plus, 
                mais comme une <strong>PROMESSE</strong>. La promesse que chaque enfant abandonné, 
                chaque regard perdu, chaque rêve étouffé mérite une seconde chance.
              </p>
              <p>
                Aujourd'hui, Omar a 12 ans. Il est <strong>premier de sa classe</strong>. 
                Et vous savez quoi ? Il tient toujours sa promesse.
              </p>
            </div>
            <div className={styles.storyImage}>
              <div className={styles.imagePlaceholder}>
                <Users size={80} />
                <p>Image : Omar et l'équipe SkyBlue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Mission */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionContent}>
            <div className={styles.missionImage}>
              <div className={styles.imagePlaceholder}>
                <Target size={80} />
                <p>Image : Enfants dans l'orphelinat</p>
              </div>
            </div>
            <div className={styles.missionText}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.emoji}>💙</span>
                NOTRE RAISON D'ÊTRE
              </h2>
              <p className={styles.highlight}>
                Nous ne collectons pas des dons. Nous changeons des <strong>DESTINS</strong>.
              </p>
              <div className={styles.impactList}>
                <div className={styles.impactItem}>
                  <span className={styles.bullet}>•</span>
                  <span>Un repas chaud dans le ventre d'un enfant affamé</span>
                </div>
                <div className={styles.impactItem}>
                  <span className={styles.bullet}>•</span>
                  <span>Un livre entre les mains d'un futur ingénieur</span>
                </div>
                <div className={styles.impactItem}>
                  <span className={styles.bullet}>•</span>
                  <span>Un médicament qui sauve une vie</span>
                </div>
                <div className={styles.impactItem}>
                  <span className={styles.bullet}>•</span>
                  <span>Un sourire qui remplace une larme</span>
                </div>
              </div>
              <p className={styles.missionStatement}>
                Notre mission : Offrir à chaque orphelin ce que tous les enfants 
                méritent → Un <strong>TOIT</strong>, une <strong>ÉDUCATION</strong>, un <strong>AVENIR</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <span className={styles.emoji}>🤝</span>
            CE QUI NOUS GUIDE
          </h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  {value.icon}
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Résultats */}
      <section className={styles.achievementsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <span className={styles.emoji}>📊</span>
            CE QUE NOUS AVONS ACCOMPLI ENSEMBLE
          </h2>
          <p className={styles.achievementsSubtitle}>
            Ces chiffres ? Ce sont des <strong>VIES CHANGÉES</strong>. Et tout ça, c'est grâce à <strong>VOUS</strong>.
          </p>
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div key={index} className={styles.achievementCard}>
                <div className={styles.achievementNumber}>{achievement.number}</div>
                <div className={styles.achievementLabel}>{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className={styles.teamSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <span className={styles.emoji}>👥</span>
            DES VISAGES, PAS DES LOGOS
          </h2>
          <p className={styles.teamIntro}>
            Nous sommes une équipe de passionnés :
          </p>
          <div className={styles.teamList}>
            <div className={styles.teamItem}>
              <TrendingUp size={28} />
              <span>Des éducateurs qui croient en chaque enfant</span>
            </div>
            <div className={styles.teamItem}>
              <Heart size={28} />
              <span>Des médecins qui soignent avec le cœur</span>
            </div>
            <div className={styles.teamItem}>
              <Award size={28} />
              <span>Des donateurs qui deviennent des HÉROS</span>
            </div>
            <div className={styles.teamItem}>
              <Users size={28} />
              <span>Des bénévoles qui donnent leur TEMPS</span>
            </div>
          </div>
          <p className={styles.teamOutro}>
            Et vous ? <strong>Vous êtes notre FORCE.</strong>
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              VOUS AUSSI, CHANGEZ UNE VIE AUJOURD'HUI
            </h2>
            <p className={styles.ctaText}>
              Rejoignez les 487 donateurs qui ont dit OUI.
            </p>
            <Link to="/faire-un-don" className={styles.ctaButton}>
              <span className={styles.lampIcon}>💡</span>
              <span>JE VEUX AIDER MAINTENANT</span>
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}