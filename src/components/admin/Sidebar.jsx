import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, DollarSign, MessageSquare, BarChart3, Settings, LogOut } from 'lucide-react';
import { logoutAdmin } from '../../services/auth';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/donations', icon: DollarSign, label: 'Dons' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admin/stats', icon: BarChart3, label: 'Statistiques' },
    { path: '/admin/settings', icon: Settings, label: 'Paramètres' },
  ];

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate('/admin/login');
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      alert('Erreur lors de la déconnexion');
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>SkyBlue Admin</h2>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button className={styles.logoutButton} onClick={handleLogout}>
        <LogOut size={20} />
        <span>Déconnexion</span>
      </button>
    </div>
  );
}