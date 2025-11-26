import Sidebar from './Sidebar';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}