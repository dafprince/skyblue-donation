import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../services/supabase';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Question générale',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Enregistrer dans Supabase
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message,
            status: 'unread'
          }
        ]);

      if (error) throw error;

      console.log('✅ Message enregistré:', data);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Question générale',
        message: ''
      });

      // Reset status après 5 secondes
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('❌ Erreur:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactForm}>
      <div className="container">
        
        <div className={styles.contactWrapper}>
          
          {/* Colonne gauche : Infos */}
          <div className={styles.contactInfo}>
            <h2 className={styles.title}>CONTACTEZ-NOUS</h2>
            <p className={styles.subtitle}>
              Une question ? Un besoin ? Notre équipe est là pour vous aider.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>Email</h4>
                  <a href="mailto:contact@skyblue.org">contact@skyblue.org</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Phone size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>Téléphone</h4>
                  <a href="tel:+221XXXXXXXXX">+221 XX XX XX XX</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>Adresse</h4>
                  <p>Avenue Cheikh Anta Diop<br />Dakar, Sénégal</p>
                </div>
              </div>
            </div>

            <div className={styles.workingHours}>
              <h4>Horaires d'ouverture</h4>
              <p>Lun-Ven : 8h - 18h</p>
              <p>Samedi : 9h - 13h</p>
              <p>Dimanche : Fermé</p>
            </div>
          </div>

          {/* Colonne droite : Formulaire */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Votre nom *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Marie Dupont"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Votre email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="marie@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Téléphone (optionnel)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+221 XX XX XX XX"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Sujet *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="Question générale">Question générale</option>
                  <option value="Don / Paiement">Don / Paiement</option>
                  <option value="Partenariat">Partenariat</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Votre message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Écrivez votre message ici..."
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows="6"
                  required
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Envoyer le message</span>
                  </>
                )}
              </button>

              {/* Messages de statut */}
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  ✅ Votre message a été envoyé avec succès ! Nous vous répondrons rapidement.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  ❌ Une erreur est survenue. Veuillez réessayer.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}