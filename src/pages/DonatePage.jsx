import { useState } from 'react';
import { Lock, CheckCircle, Globe, CreditCard, Shield, TrendingUp } from 'lucide-react';
import styles from './DonatePage.module.css';

export default function DonatePage() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const presetAmounts = [10, 25, 50, 100, 200];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!email) {
      setError('Email obligatoire');
      return;
    }

    const finalAmount = customAmount || amount;

    if (finalAmount < 5) {
      setError('Le montant minimum est de 5€');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('💾 Données à envoyer:', {
        amount: finalAmount,
        name,
        email,
        phone
      });

      // Stocker les données pour l'email
      localStorage.setItem('donorEmail', email);
      localStorage.setItem('donorName', name);
      localStorage.setItem('donationAmount', finalAmount.toString());

      // Créer un paiement Bictorys
      const response = await fetch('https://backend-skyblue.onrender.com/api/create-bictorys-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          email: email,
          name: name || 'Donateur anonyme',
          phone: phone || '+221000000000'
        }),
      });

      const responseText = await response.text();
      console.log('📥 Réponse brute:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Erreur parsing:', parseError);
        throw new Error('Réponse serveur invalide');
      }

      if (!response.ok) {
        console.error('❌ Erreur serveur:', data);
        throw new Error(data.error || 'Erreur création paiement');
      }

      if (!data.checkoutUrl) {
        console.error('❌ Pas de checkoutUrl:', data);
        throw new Error('URL de paiement manquante');
      }

      console.log('✅ Paiement créé, redirection vers:', data.checkoutUrl);

      // Redirection vers Bictorys Checkout
      window.location.href = data.checkoutUrl;

    } catch (error) {
      console.error('❌ Erreur complète:', error);
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

  const selectedAmount = customAmount ? parseFloat(customAmount) : amount;

  return (
    <div className={styles.donatePage}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.overlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>FAIRE UN DON</h1>
            <p className={styles.heroSubtitle}>
              Votre générosité change des vies
            </p>
          </div>
        </div>
      </section>

      {/* Section principale */}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.donateWrapper}>
            
            {/* Colonne gauche : Formulaire */}
            <div className={styles.formColumn}>
              <form onSubmit={handleSubmit} className={styles.form}>
                
                {/* Section 1 : Montant */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.stepNumber}>1</span>
                    CHOISISSEZ VOTRE MONTANT
                  </h2>
                  
                  <div className={styles.amountButtons}>
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={amount === amt && !customAmount ? styles.amountActive : styles.amountButton}
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount('');
                        }}
                      >
                        {amt}€
                      </button>
                    ))}
                  </div>

                  <div className={styles.customAmount}>
                    <label htmlFor="customAmount">Ou montant personnalisé :</label>
                    <div className={styles.inputWrapper}>
                      <input
                        type="number"
                        id="customAmount"
                        min="5"
                        max="10000"
                        placeholder="Montant en €"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount(0);
                        }}
                        className={styles.input}
                      />
                      <span className={styles.currency}>€</span>
                    </div>
                    <p className={styles.conversionHint}>
                      ≈ {(selectedAmount * 656).toFixed(0)} XOF (Francs CFA)
                    </p>
                  </div>

                  <div className={styles.infoBox}>
                    <Lock size={20} />
                    <p>
                      Votre don n'est soumis à <strong>aucun engagement</strong> et ne sera PAS prélevé automatiquement.
                    </p>
                  </div>
                </div>

                {/* Section 2 : Informations */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.stepNumber}>2</span>
                    VOS INFORMATIONS
                  </h2>

                  <div className={styles.formGroup}>
                    <label htmlFor="name">Prénom et Nom (optionnel)</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Marie Dupont"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email (pour recevoir le reçu) *</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="marie@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">
                      Téléphone (optionnel)
                      <span className={styles.optionalLabel}> - Format international</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+221776543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={styles.input}
                    />
                    <p className={styles.phoneHint}>
                      ℹ️ Exemple : +221 suivi de votre numéro
                    </p>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      <span>Don anonyme</span>
                    </label>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={acceptNewsletter}
                        onChange={(e) => setAcceptNewsletter(e.target.checked)}
                      />
                      <span>Je souhaite recevoir des nouvelles</span>
                    </label>
                  </div>
                </div>

                {/* Message d'erreur */}
                {error && (
                  <div className={styles.errorBox}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Bouton de soumission */}
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      <span>Redirection vers Bictorys...</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.lampIcon}>💡</span>
                      <span>PROCÉDER AU PAIEMENT</span>
                      <span className={styles.arrow}>→</span>
                    </>
                  )}
                </button>

                <p className={styles.secureInfo}>
                  🔒 Paiement 100% sécurisé par Bictorys • Orange Money • Wave • Cartes bancaires
                </p>
              </form>
            </div>

            {/* Colonne droite : Résumé & Badges */}
            <div className={styles.sidebarColumn}>
              
              {/* Résumé du don */}
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>📊 Résumé de votre don</h3>
                <div className={styles.summaryAmount}>
                  <span className={styles.summaryLabel}>Montant</span>
                  <span className={styles.summaryValue}>{selectedAmount}€</span>
                </div>
                <div className={styles.impactPreview}>
                  <TrendingUp size={24} />
                  <div>
                    <p className={styles.impactTitle}>Votre impact :</p>
                    {selectedAmount >= 10 && selectedAmount < 50 && (
                      <p className={styles.impactText}>≈ {Math.floor(selectedAmount)} repas chauds</p>
                    )}
                    {selectedAmount >= 50 && selectedAmount < 100 && (
                      <p className={styles.impactText}>≈ 1 mois d'éducation</p>
                    )}
                    {selectedAmount >= 100 && (
                      <p className={styles.impactText}>≈ 2 mois de prise en charge</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Badges de confiance */}
              <div className={styles.trustCard}>
                <h3 className={styles.trustTitle}>🛡️ Paiements acceptés</h3>
                <div className={styles.trustBadges}>
                  <div className={styles.trustBadge}>
                    <Lock size={24} />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className={styles.trustBadge}>
                    <CheckCircle size={24} />
                    <span>Orange Money</span>
                  </div>
                  <div className={styles.trustBadge}>
                    <Globe size={24} />
                    <span>Wave</span>
                  </div>
                  <div className={styles.trustBadge}>
                    <CreditCard size={24} />
                    <span>Cartes Visa/Mastercard</span>
                  </div>
                  <div className={styles.trustBadge}>
                    <Shield size={24} />
                    <span>Certifié Bictorys</span>
                  </div>
                </div>
              </div>

              {/* Témoignages rapides */}
              <div className={styles.testimonialCard}>
                <p className={styles.testimonialText}>
                  "Processus de don simple et sécurisé. Merci SkyBlue !"
                </p>
                <div className={styles.testimonialAuthor}>
                  <span className={styles.authorName}>Marie D.</span>
                  <span className={styles.rating}>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}