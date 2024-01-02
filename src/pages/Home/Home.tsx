/**
 * Home page component displaying the main features.
 */

import { Link } from 'react-router-dom';
import { EmployeeForm } from '../../components/EmployeeForm/EmployeeForm';
import styles from './home.module.css';

export function Home() {
  return (
    <main className={styles.home}>
      <h1 className={styles.title}>HRnet</h1>
      <section className={styles.linkSection}>
        <Link to='/current-employees' className={styles.link}>
          View Current Employees
        </Link>
      </section>
      <section className={styles.formSection}>
        <EmployeeForm />
      </section>
    </main>
  );
}
