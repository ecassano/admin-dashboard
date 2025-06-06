import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>Admin Dashboard</h1>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/contracheque" className={styles.navLink}>
              Contracheque
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
} 