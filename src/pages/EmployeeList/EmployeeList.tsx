import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableComponent from '../../components/TableComponent/TableComponent';
import placeholderData from './placeholderData.json';
import styles from './employeeList.module.css';

import { RootState } from '../../redux/store';

export type EmployeeType = {
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export function EmployeeList() {
  const employeeList = useSelector((state: RootState) => state.employee.employeeList);

  const dataToDisplay = employeeList.length === 0 ? placeholderData : employeeList;

  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Start Date', field: 'startDate' },
    { title: 'Department', field: 'department' },
    { title: 'Date of Birth', field: 'dateOfBirth' },
    { title: 'Street', field: 'street' },
    { title: 'City', field: 'city' },
    { title: 'State', field: 'state' },
    { title: 'Zip Code', field: 'zipCode' },
  ] as const;

  useEffect(() => {
    // Affiche la liste des employés dans la console
    console.log('Employee List:', employeeList);
  }, [employeeList]);

  return (
    <main className={styles.employeeList}>
      <h1>Current Employees</h1>
      <div className={styles.tableContainer}>
        <TableComponent<EmployeeType> columns={columns} data={dataToDisplay} />
      </div>
      <Link to='/'>Home</Link>
    </main>
  );
}

export default EmployeeList;
