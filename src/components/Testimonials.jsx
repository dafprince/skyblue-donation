import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const testimonials = [
    {
      text: "Grâce à SkyBlue, j'ai pu aider des enfants dans le besoin. La transparence totale et le professionnalisme de l'équipe m'ont convaincu de continuer à donner.",
      author: "Marie D.",
      location: "Paris, France",
      rating: 5,
      avatar: "M"
    },
    {
      text: "Une plateforme sécurisée qui donne vraiment envie de contribuer. J'ai fait plusieurs dons et je suis toujours impressionné par le suivi et les rapports d'impact.",
      author: "Ahmed K.",
      location: "Dakar, Sénégal",
      rating: 5,
      avatar: "A"
    },
    {
      text: "Ce qui m'a touché, c'est de voir concrètement où va mon argent. SkyBlue redonne espoir et dignité aux orphelins. Merci pour ce que vous faites !",
      author: "Sophie L.",
      location: "Bruxelles, Belgique",
      rating: 5,
      avatar: "S"
    },
    {
      text: "J'étais sceptique au début, mais la transparence de SkyBlue m'a rassuré. Maintenant je donne régulièrement et je sais que mon don change vraiment des vies.",
      author: "Jean-Pierre M.",
      location: "Lyon, France",
      rating: 5,
      avatar: "J"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goTo = (index) => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className={styles.testimonials}>
      <div className={styles.background}>
        <div className={styles.overlay}></div>
      </div>

      <div className="container">
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>ILS NOUS FONT CONFIANCE</h2>
          <p className={styles.subtitle}>
            Découvrez les témoignages de nos donateurs et l'impact de leur générosité.
          </p>
        </div>

        {/* Carrousel */}
        <div className={styles.carouselContainer}>
          
          {/* Carte témoignage */}
          <div className={styles.testimonialCard}>
            
            {/* Icône quote */}
            <div className={styles.quoteIcon}>
              <Quote size={80} />
            </div>

            {/* Texte */}
            <p className={styles.testimonialText}>
              {testimonials[current].text}
            </p>

            {/* Auteur */}
            <div className={styles.author}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  {testimonials[current].avatar}
                </div>
              </div>
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>
                  {testimonials[current].author}
                </p>
                <p className={styles.authorLocation}>
                  {testimonials[current].location}
                </p>
                <div className={styles.rating}>
                  {'⭐'.repeat(testimonials[current].rating)}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.navigation}>
            <button 
              onClick={prev} 
              className={styles.navButton}
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Dots */}
            <div className={styles.dots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={index === current ? styles.dotActive : styles.dot}
                  onClick={() => goTo(index)}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={next} 
              className={styles.navButton}
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Compteur */}
          <div className={styles.counter}>
            {current + 1} / {testimonials.length}
          </div>
        </div>

        {/* Stats sous le carrousel */}
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>4.9/5</span>
            <span className={styles.statLabel}>Note moyenne</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>487</span>
            <span className={styles.statLabel}>Donateurs satisfaits</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>98%</span>
            <span className={styles.statLabel}>Recommandent SkyBlue</span>
          </div>
        </div>
      </div>
    </section>
  );
}