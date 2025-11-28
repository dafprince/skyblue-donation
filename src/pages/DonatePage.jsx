import { useState } from 'react';
import styles from './DonatePage.module.css';

const DonatePage = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const predefinedAmounts = [10, 25, 50, 100, 200];

  const handleAmountClick = (value) => {
    setAmount(value.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const finalAmount = parseFloat(amount || customAmount);

      if (!finalAmount || finalAmount < 5) {
        setError('Le montant minimum est de 5€');
        setLoading(false);
        return;
      }

      if (!name || !email) {
        setError('Veuillez remplir tous les champs obligatoires');
        setLoading(false);
        return;
      }

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Email invalide');
        setLoading(false);
        return;
      }

      // Validation téléphone (optionnel mais recommandé)
      if (phone && !phone.startsWith('+')) {
        setError('Le téléphone doit commencer par + (ex: +221776543210)');
        setLoading(false);
        return;
      }

      // Stocker les données pour l'email
      localStorage.setItem('donorEmail', email);
      localStorage.setItem('donorName', name);
      localStorage.setItem('donationAmount', finalAmount.toString());

      console.log('💾 Données stockées:', {
        email,
        name,
        amount: finalAmount
      });

      // Appeler le backend pour créer le paiement Bictorys
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-bictorys-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          name,
          email,
          phone: phone || '+221000000000' // Numéro par défaut si vide
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création du paiement');
      }

      const data = await response.json();
      
      console.log('✅ Paiement créé:', data);

      // Rediriger vers la page de paiement Bictorys
      window.location.href = data.checkoutUrl;

    } catch (error) {
      console.error('❌ Erreur:', error);
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.donatePage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>💙 Faire un Don</h1>
          <p className={styles.subtitle}>
            Votre générosité change des vies. Chaque euro compte pour offrir un avenir meilleur aux enfants orphelins.
          </p>
        </div>

        {/* Formulaire */}
        <form className={styles.donationForm} onSubmit={handleSubmit}>
          {/* Montants prédéfinis */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Choisissez un montant (EUR)</label>
            <div className={styles.amountButtons}>
              {predefinedAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.amountButton} ${amount === value.toString() ? styles.active : ''}`}
                  onClick={() => handleAmountClick(value)}
                >
                  {value}€
                </button>
              ))}
            </div>
          </div>

          {/* Montant personnalisé */}
          <div className={styles.formGroup}>
            <label htmlFor="customAmount" className={styles.label}>Ou entrez un montant personnalisé (EUR)</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="customAmount"
                className={styles.input}
                placeholder="Montant en euros"
                value={customAmount}
                onChange={handleCustomAmountChange}
                min="5"
                step="1"
              />
              <span className={styles.currency}>EUR</span>
            </div>
            <p className={styles.hint}>
              ℹ️ Votre don sera converti en XOF (Francs CFA) : {(parseFloat(amount || customAmount || 0) * 656).toFixed(0)} XOF
            </p>
          </div>

          {/* Informations personnelles */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nom complet *</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email *</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="[email protected]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Téléphone (recommandé) 
              <span className={styles.optional}>- Format international</span>
            </label>
            <input
              type="tel"
              id="phone"
              className={styles.input}
              placeholder="+221776543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className={styles.hint}>
              ℹ️ Format : +221 suivi de votre numéro (ex: +221776543210)
            </p>
          </div>

          {/* Newsletter */}
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="newsletter"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            <label htmlFor="newsletter">
              Je souhaite recevoir des nouvelles de l'association
            </label>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className={styles.error}>
              ⚠️ {error}
            </div>
          )}

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Redirection...
              </>
            ) : (
              <>
                💳 PROCÉDER AU PAIEMENT
              </>
            )}
          </button>

          <p className={styles.secureInfo}>
            🔒 Paiement 100% sécurisé par Bictorys
          </p>
        </form>

        {/* Impact */}
        <div className={styles.impact}>
          <h2 className={styles.impactTitle}>Votre impact</h2>
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>🍲</div>
              <h3>10€</h3>
              <p>Un repas chaud pour 5 enfants</p>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>📚</div>
              <h3>25€</h3>
              <p>Des fournitures scolaires pour 3 enfants</p>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>🏥</div>
              <h3>50€</h3>
              <p>Des soins médicaux pour un enfant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;