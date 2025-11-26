import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { CheckCircle, Home, Heart } from 'lucide-react';
import { sendDonationEmail } from '../services/emailjs';
import styles from './DonationSuccessPage.module.css';

export default function DonationSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

useEffect(() => {
  console.log('🎉 Page de succès chargée');
  
  // Vérifier si l'email a déjà été envoyé (éviter les doublons)
  const emailAlreadySent = sessionStorage.getItem('emailSent');
  
  if (emailAlreadySent === 'true') {
    console.log('⏭️ Email déjà envoyé, on skip');
    setEmailSent(true);
    return;
  }
  
  // Récupérer les données du don
  const donationData = {
    email: localStorage.getItem('donorEmail') || searchParams.get('email'),
    name: localStorage.getItem('donorName') || searchParams.get('name') || 'Donateur anonyme',
    amount: parseFloat(localStorage.getItem('donationAmount') || searchParams.get('amount') || '0'),
    transactionId: searchParams.get('session_id') || 'En cours'
  };

  console.log('📦 Données du don:', donationData);

  // Vérifier que l'email existe
  if (!donationData.email) {
    console.error('❌ Pas d\'email trouvé !');
    setEmailError(true);
    return;
  }

  // Vérifier que le montant est valide
  if (!donationData.amount || donationData.amount === 0) {
    console.error('❌ Montant invalide !');
    setEmailError(true);
    return;
  }

  // Envoyer l'email de confirmation (une seule fois)
  if (!emailSent) {
    console.log('📧 Tentative d\'envoi d\'email...');
    
    // Marquer comme envoyé AVANT l'envoi pour éviter les doublons
    sessionStorage.setItem('emailSent', 'true');
    
    sendDonationEmail(donationData)
      .then(result => {
        if (result.success) {
          setEmailSent(true);
          console.log('✅ Email de confirmation envoyé !');
        } else {
          setEmailError(true);
          sessionStorage.removeItem('emailSent'); // Retirer le flag si échec
          console.error('❌ Erreur envoi email:', result.error);
        }
      });
  }

  // Nettoyer le localStorage après 10 secondes
  const cleanup = setTimeout(() => {
    localStorage.removeItem('donorEmail');
    localStorage.removeItem('donorName');
    localStorage.removeItem('donationAmount');
    console.log('🧹 LocalStorage nettoyé');
  }, 10000);

  return () => clearTimeout(cleanup);
}, [searchParams, emailSent]);

  return (
    <div className={styles.successPage}>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
      />

      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.iconWrapper}>
            <CheckCircle size={80} className={styles.successIcon} />
          </div>

          <h1 className={styles.title}>Merci pour votre générosité ! 💙</h1>

          <p className={styles.message}>
            Votre don a été traité avec succès. Vous venez de changer la vie d'un enfant !
          </p>

          {emailSent && (
            <div className={styles.emailConfirmation}>
              ✅ Un email de confirmation vous a été envoyé
            </div>
          )}

          {emailError && (
            <div className={styles.emailWarning}>
              ⚠️ L'email n'a pas pu être envoyé, mais votre don est bien enregistré !
            </div>
          )}

          <div className={styles.impactSection}>
            <h2 className={styles.impactTitle}>Votre impact :</h2>
            <div className={styles.impactGrid}>
              <div className={styles.impactItem}>
                <span className={styles.impactEmoji}>🍲</span>
                <span className={styles.impactText}>Un repas chaud</span>
              </div>
              <div className={styles.impactItem}>
                <span className={styles.impactEmoji}>📚</span>
                <span className={styles.impactText}>L'accès à l'éducation</span>
              </div>
              <div className={styles.impactItem}>
                <span className={styles.impactEmoji}>😊</span>
                <span className={styles.impactText}>Un sourire retrouvé</span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.primaryButton}
              onClick={() => navigate('/')}
            >
              <Home size={20} />
              Retour à l'accueil
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={() => navigate('/faire-un-don')}
            >
              <Heart size={20} />
              Faire un autre don
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}