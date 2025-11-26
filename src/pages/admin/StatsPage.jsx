import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../services/supabase';
import styles from './StatsPage.module.css';

export default function StatsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('week'); // week, month, year
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalDonations: 0,
    averageDonation: 0,
    uniqueDonors: 0
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDonations(data || []);
      calculateStats(data || []);
      prepareChartData(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const filteredData = filterByPeriod(data);
    
    const totalAmount = filteredData.reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const totalDonations = filteredData.length;
    const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;
    const uniqueDonors = new Set(filteredData.map(d => d.email)).size;

    setStats({
      totalAmount,
      totalDonations,
      averageDonation,
      uniqueDonors
    });
  };

  const filterByPeriod = (data) => {
    const now = new Date();
    let startDate;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    return data.filter(d => new Date(d.created_at) >= startDate);
  };

  const prepareChartData = (data) => {
    const filteredData = filterByPeriod(data);
    
    // Grouper par date
    const groupedByDate = filteredData.reduce((acc, donation) => {
      const date = new Date(donation.created_at).toLocaleDateString('fr-FR');
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += parseFloat(donation.amount);
      return acc;
    }, {});

    // Convertir en tableau pour le graphique
    const chartArray = Object.entries(groupedByDate).map(([date, amount]) => ({
      date,
      amount: amount.toFixed(2)
    }));

    setChartData(chartArray.reverse());
  };

  const getDonationsByRange = () => {
    const ranges = [
      { label: '0-25€', min: 0, max: 25 },
      { label: '25-50€', min: 25, max: 50 },
      { label: '50-100€', min: 50, max: 100 },
      { label: '100€+', min: 100, max: Infinity }
    ];

    return ranges.map(range => {
      const count = donations.filter(d => {
        const amount = parseFloat(d.amount);
        return amount >= range.min && amount < range.max;
      }).length;
      
      return {
        label: range.label,
        count,
        percentage: donations.length > 0 ? ((count / donations.length) * 100).toFixed(1) : 0
      };
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Chargement des statistiques...</div>
      </AdminLayout>
    );
  }

  const rangeStats = getDonationsByRange();

  return (
    <AdminLayout>
      <div className={styles.statsPage}>
        <div className={styles.header}>
          <h1>Statistiques</h1>
          <div className={styles.periodSelector}>
            <button 
              className={`${styles.periodButton} ${period === 'week' ? styles.active : ''}`}
              onClick={() => setPeriod('week')}
            >
              7 jours
            </button>
            <button 
              className={`${styles.periodButton} ${period === 'month' ? styles.active : ''}`}
              onClick={() => setPeriod('month')}
            >
              Ce mois
            </button>
            <button 
              className={`${styles.periodButton} ${period === 'year' ? styles.active : ''}`}
              onClick={() => setPeriod('year')}
            >
              Cette année
            </button>
          </div>
        </div>

        {/* Cartes statistiques */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #4A90E2, #2C3E50)' }}>
              <DollarSign size={28} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Total collecté</p>
              <h3 className={styles.statValue}>{stats.totalAmount.toFixed(2)}€</h3>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #5CB85C, #3D8B3D)' }}>
              <TrendingUp size={28} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Nombre de dons</p>
              <h3 className={styles.statValue}>{stats.totalDonations}</h3>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B35)' }}>
              <Calendar size={28} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Don moyen</p>
              <h3 className={styles.statValue}>{stats.averageDonation.toFixed(2)}€</h3>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #E74C3C, #C0392B)' }}>
              <Users size={28} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Donateurs uniques</p>
              <h3 className={styles.statValue}>{stats.uniqueDonors}</h3>
            </div>
          </div>
        </div>

        {/* Graphique simple */}
        <div className={styles.chartSection}>
          <h2>Évolution des dons</h2>
          <div className={styles.chartCard}>
            {chartData.length === 0 ? (
              <p className={styles.emptyState}>Aucune donnée pour cette période</p>
            ) : (
              <div className={styles.simpleChart}>
                {chartData.map((item, index) => (
                  <div key={index} className={styles.chartBar}>
                    <div 
                      className={styles.barFill}
                      style={{ 
                        height: `${(parseFloat(item.amount) / Math.max(...chartData.map(d => parseFloat(d.amount)))) * 100}%` 
                      }}
                    >
                      <span className={styles.barValue}>{item.amount}€</span>
                    </div>
                    <span className={styles.barLabel}>{item.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Répartition par montant */}
        <div className={styles.rangeSection}>
          <h2>Répartition par montant</h2>
          <div className={styles.rangeGrid}>
            {rangeStats.map((range, index) => (
              <div key={index} className={styles.rangeCard}>
                <div className={styles.rangeHeader}>
                  <h3>{range.label}</h3>
                  <span className={styles.rangeCount}>{range.count} dons</span>
                </div>
                <div className={styles.rangeProgress}>
                  <div 
                    className={styles.rangeProgressFill}
                    style={{ width: `${range.percentage}%` }}
                  ></div>
                </div>
                <p className={styles.rangePercentage}>{range.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}