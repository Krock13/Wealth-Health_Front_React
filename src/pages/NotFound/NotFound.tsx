import { Link } from 'react-router-dom';
import styles from './notFound.module.css';

export function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>Oops! Page not found</h1>
      <p className={styles.notFoundDescription}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to='/' className={styles.notFoundLink}>
        Back to home page
      </Link>
    </div>
  );
}
