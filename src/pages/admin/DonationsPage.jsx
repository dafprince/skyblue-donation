import { useState, useEffect } from 'react';
import { Search, Download, Eye } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../services/supabase';
import styles from './DonationsPage.module.css';

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [searchTerm, donations]);

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDonations = () => {
    if (!searchTerm) {
      setFilteredDonations(donations);
      return;
    }

    const filtered = donations.filter(donation => 
      donation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDonations(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Nom', 'Email', 'Montant', 'Anonyme', 'Newsletter'];
    const rows = donations.map(d => [
      new Date(d.created_at).toLocaleDateString('fr-FR'),
      d.name || 'Non renseigné',
      d.email,
      d.amount,
      d.is_anonymous ? 'Oui' : 'Non',
      d.accept_newsletter ? 'Oui' : 'Non'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `dons_skyblue_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Chargement des dons...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.donationsPage}>
        <div className={styles.header}>
          <div>
            <h1>Gestion des dons</h1>
            <p>{donations.length} don(s) enregistré(s)</p>
          </div>
          <button className={styles.exportButton} onClick={exportToCSV}>
            <Download size={18} />
            Exporter CSV
          </button>
        </div>

        {/* Barre de recherche */}
        <div className={styles.searchBar}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tableau */}
        <div className={styles.tableCard}>
          {filteredDonations.length === 0 ? (
            <p className={styles.emptyState}>
              {searchTerm ? 'Aucun don trouvé' : 'Aucun don pour le moment'}
            </p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{new Date(donation.created_at).toLocaleDateString('fr-FR')}</td>
                    <td>{donation.is_anonymous ? '🔒 Anonyme' : donation.name || 'Non renseigné'}</td>
                    <td>{donation.email}</td>
                    <td className={styles.amount}>{parseFloat(donation.amount).toFixed(2)}€</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                        Réussi
                      </span>
                    </td>
                    <td>
                      <button 
                        className={styles.actionButton}
                        onClick={() => setSelectedDonation(donation)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal détails */}
        {selectedDonation && (
          <div className={styles.modal} onClick={() => setSelectedDonation(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2>Détails du don</h2>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Date</span>
                  <span className={styles.detailValue}>
                    {new Date(selectedDonation.created_at).toLocaleString('fr-FR')}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Nom</span>
                  <span className={styles.detailValue}>
                    {selectedDonation.is_anonymous ? '🔒 Anonyme' : selectedDonation.name || 'Non renseigné'}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>{selectedDonation.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Montant</span>
                  <span className={styles.detailValue}>
                    {parseFloat(selectedDonation.amount).toFixed(2)}€
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Newsletter</span>
                  <span className={styles.detailValue}>
                    {selectedDonation.accept_newsletter ? '✅ Acceptée' : '❌ Refusée'}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>ID Stripe</span>
                  <span className={styles.detailValue} style={{ fontSize: '13px' }}>
                    {selectedDonation.stripe_payment_id || 'N/A'}
                  </span>
                </div>
              </div>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedDonation(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}