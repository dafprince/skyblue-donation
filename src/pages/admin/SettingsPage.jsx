import { useState, useEffect } from 'react';
import { Save, Mail, Phone, Target, Lock } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../services/supabase';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    contactEmail: 'contact@skyblue.org',
    contactPhone: '+221 XX XX XX XX',
    monthlyGoal: 10000
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simuler une sauvegarde (tu peux créer une table settings dans Supabase)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ 
        type: 'success', 
        text: 'Paramètres enregistrés avec succès !' 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Erreur lors de la sauvegarde' 
      });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (password.new !== password.confirm) {
      setMessage({ 
        type: 'error', 
        text: 'Les mots de passe ne correspondent pas' 
      });
      setLoading(false);
      return;
    }

    if (password.new.length < 6) {
      setMessage({ 
        type: 'error', 
        text: 'Le mot de passe doit contenir au moins 6 caractères' 
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password.new
      });

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        text: 'Mot de passe modifié avec succès !' 
      });
      setPassword({ current: '', new: '', confirm: '' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Erreur lors du changement de mot de passe' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.settingsPage}>
        <div className={styles.header}>
          <h1>Paramètres</h1>
          <p>Configuration générale de l'administration</p>
        </div>

        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        {/* Paramètres généraux */}
        <div className={styles.section}>
          <h2>Informations de contact</h2>
          <form onSubmit={saveSettings} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="contactEmail">
                <Mail size={18} />
                Email de contact
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleSettingsChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contactPhone">
                <Phone size={18} />
                Téléphone de contact
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleSettingsChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="monthlyGoal">
                <Target size={18} />
                Objectif mensuel (€)
              </label>
              <input
                type="number"
                id="monthlyGoal"
                name="monthlyGoal"
                value={settings.monthlyGoal}
                onChange={handleSettingsChange}
                className={styles.input}
                min="0"
              />
            </div>

            <button type="submit" className={styles.saveButton} disabled={loading}>
              <Save size={18} />
              {loading ? 'Enregistrement...' : 'Enregistrer les paramètres'}
            </button>
          </form>
        </div>

        {/* Changement de mot de passe */}
        <div className={styles.section}>
          <h2>Sécurité</h2>
          <form onSubmit={changePassword} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">
                <Lock size={18} />
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                className={styles.input}
                placeholder="Minimum 6 caractères"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">
                <Lock size={18} />
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                className={styles.input}
                placeholder="Retapez le mot de passe"
              />
            </div>

            <button type="submit" className={styles.passwordButton} disabled={loading}>
              <Lock size={18} />
              {loading ? 'Modification...' : 'Changer le mot de passe'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}