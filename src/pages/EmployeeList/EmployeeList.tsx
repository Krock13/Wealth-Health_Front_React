import { Link } from 'react-router-dom';
import styles from './employeeList.module.css';

export function EmployeeList() {
  return (
    <main className={styles.employeeList}>
      <h1>Current Employees</h1>
      <div className={styles.tableContainer}>
        <table className={styles.employeeTable}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Start Date</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>{/* Map() des données d'employés pour créer les lignes du tableau */}</tbody>
        </table>
        {/* Ici les composants pour la recherche, le tri et la pagination */}
      </div>
      <Link to='/'>Home</Link>
    </main>
  );
}

export default EmployeeList;
