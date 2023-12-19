/**
 * Footer component for the application.
 * Displays the copyright information.
 */

// Styles for the Footer component
import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>Copyright</p>
    </footer>
  );
}
