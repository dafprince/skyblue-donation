import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_SERVICE_ID = 'service_uzap7br';
const EMAILJS_TEMPLATE_ID = 'template_o1ruyjw';
const EMAILJS_PUBLIC_KEY = 'Hime1lQaDq3XmPue-';

export const sendDonationEmail = async (donationData) => {
  console.log('📧 Préparation envoi email...');
  console.log('Données reçues:', donationData);

  try {
    const templateParams = {
      to_email: donationData.email,
      donor_name: donationData.name || 'Cher donateur',
      amount: donationData.amount ? donationData.amount.toFixed(2) : '0.00',
      date: new Date().toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      transaction_id: donationData.transactionId || 'En attente'
    };

    console.log('📤 Envoi des paramètres:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Email envoyé avec succès:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Erreur complète:', error);
    console.error('Status:', error.status);
    console.error('Text:', error.text);
    return { success: false, error };
  }
};