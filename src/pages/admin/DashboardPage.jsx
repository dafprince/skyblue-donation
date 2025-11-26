import { useState, useEffect } from 'react';
import { DollarSign, Users, TrendingUp, Target } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../services/supabase';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    donorsCount: 0,
    averageDonation: 0,
    monthlyGoal: 10000,
    monthlyTotal: 0
  });
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Récupérer tous les dons
      const { data: donations, error: donationsError } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (donationsError) throw donationsError;

      // Récupérer les messages récents
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (messagesError) throw messagesError;

      // Calculer les statistiques
      const total = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
      const donorsCount = new Set(donations.map(d => d.email)).size;
      const average = donations.length > 0 ? total / donations.length : 0;

      // Dons du mois en cours
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthlyDonations = donations.filter(d => new Date(d.created_at) >= startOfMonth);
      const monthlyTotal = monthlyDonations.reduce((sum, d) => sum + parseFloat(d.amount), 0);

      setStats({
        totalDonations: total,
        donorsCount: donorsCount,
        averageDonation: average,
        monthlyGoal: 10000,
        monthlyTotal: monthlyTotal
      });

      setRecentDonations(donations.slice(0, 5));
      setRecentMessages(messages || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (stats.monthlyTotal / stats.monthlyGoal) * 100;

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Chargement des données...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.dashboardPage}>
        <div className={styles.header}>
          <h1>Dashboard</h1>
          <p>Vue d'ensemble de l'activité SkyBlue</p>
        </div>

        {/* Cartes statistiques */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #4A90E2, #2C3E50)' }}>
              <DollarSign size={28} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Total des dons</p>
              <h3 className={styles.statValue}>{stats.totalDonations.toFixed(2)}€</h3>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #5CB85C, #3D8B3D)' }}>
              <Users size={28} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Donateurs</p>
              <h3 className={styles.statValue}>{stats.donorsCount}</h3>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B35)' }}>
              <TrendingUp size={28} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Moyenne par don</p>
              <h3 className={styles.statValue}>{stats.averageDonation.toFixed(2)}€</h3>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #E74C3C, #C0392B)' }}>
              <Target size={28} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Objectif du mois</p>
              <h3 className={styles.statValue}>{stats.monthlyTotal.toFixed(0)} / {stats.monthlyGoal}€</h3>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dons récents */}
        <div className={styles.section}>
          <h2>Dons récents</h2>
          <div className={styles.tableCard}>
            {recentDonations.length === 0 ? (
              <p className={styles.emptyState}>Aucun don pour le moment</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Montant</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td>{donation.is_anonymous ? 'Anonyme' : donation.name || 'Non renseigné'}</td>
                      <td>{donation.email}</td>
                      <td className={styles.amount}>{parseFloat(donation.amount).toFixed(2)}€</td>
                      <td>{new Date(donation.created_at).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Messages récents */}
        <div className={styles.section}>
          <h2>Messages récents</h2>
          <div className={styles.messagesGrid}>
            {recentMessages.length === 0 ? (
              <p className={styles.emptyState}>Aucun message pour le moment</p>
            ) : (
              recentMessages.map((message) => (
                <div key={message.id} className={styles.messageCard}>
                  <div className={styles.messageHeader}>
                    <h4>{message.name}</h4>
                    <span className={styles.messageDate}>
                      {new Date(message.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className={styles.messageSubject}>{message.subject}</p>
                  <p className={styles.messagePreview}>{message.message.substring(0, 100)}...</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}