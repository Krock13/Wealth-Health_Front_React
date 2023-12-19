import { Link } from 'react-router-dom';
import styles from './notFound.module.css';

export function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>Oups ! Page non trouvée</h1>
      <p className={styles.notFoundDescription}>
        Désolé, la page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link to='/' className={styles.notFoundLink}>
        Retourner à la page d&apos;accueil
      </Link>
    </div>
  );
}
