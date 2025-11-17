// ========================================
// VALIDATORS - SKYBLUE
// Fonctions de validation des données
// ========================================

/**
 * Valider un email
 * @param {string} email - Email à valider
 * @returns {boolean} - true si valide
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valider un numéro de téléphone français
 * @param {string} phone - Téléphone à valider
 * @returns {boolean} - true si valide
 */
export const isValidPhoneNumber = (phone) => {
  if (!phone) return false;
  
  // Enlever tous les espaces et caractères spéciaux
  const cleaned = phone.replace(/\D/g, '');
  
  // Vérifier que c'est un numéro français (10 chiffres commençant par 0)
  const phoneRegex = /^0[1-9]\d{8}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Valider un code postal français
 * @param {string} postalCode - Code postal à valider
 * @returns {boolean} - true si valide
 */
export const isValidPostalCode = (postalCode) => {
  if (!postalCode) return false;
  
  // Code postal français = 5 chiffres
  const postalCodeRegex = /^\d{5}$/;
  return postalCodeRegex.test(postalCode);
};

/**
 * Valider un nom (prénom ou nom de famille)
 * @param {string} name - Nom à valider
 * @returns {boolean} - true si valide
 */
export const isValidName = (name) => {
  if (!name) return false;
  
  // Au moins 2 caractères, lettres et espaces/tirets seulement
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/;
  return nameRegex.test(name.trim());
};

/**
 * Valider un message (texte long)
 * @param {string} message - Message à valider
 * @returns {boolean} - true si valide
 */
export const isValidMessage = (message) => {
  if (!message) return false;
  const trimmed = message.trim();
  return trimmed.length >= 10 && trimmed.length <= 2000;
};

/**
 * Valider un objet formulaire de contact
 * @param {object} formData - Données du formulaire
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validateContactForm = (formData) => {
  const errors = {};
  
  // Nom
  if (!formData.name || !isValidName(formData.name)) {
    errors.name = 'Nom invalide (minimum 2 caractères)';
  }
  
  // Email
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Email invalide';
  }
  
  // Téléphone (optionnel mais doit être valide si renseigné)
  if (formData.phone && !isValidPhoneNumber(formData.phone)) {
    errors.phone = 'Numéro de téléphone invalide';
  }
  
  // Message
  if (!formData.message || !isValidMessage(formData.message)) {
    errors.message = 'Message trop court (minimum 10 caractères)';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valider un formulaire de don
 * @param {object} formData - Données du formulaire
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validateDonationForm = (formData) => {
  const errors = {};
  
  // Email obligatoire
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Email invalide ou manquant';
  }
  
  // Montant minimum
  const amount = parseFloat(formData.amount);
  if (isNaN(amount) || amount < 5) {
    errors.amount = 'Le montant minimum est de 5€';
  }
  
  // Nom optionnel mais doit être valide si renseigné
  if (formData.name && !isValidName(formData.name)) {
    errors.name = 'Nom invalide';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
