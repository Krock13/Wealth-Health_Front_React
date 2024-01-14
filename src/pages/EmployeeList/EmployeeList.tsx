import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableComponent from '../../components/TableComponent/TableComponent';
import placeholderData from './placeholderData.json';
import styles from './employeeList.module.css';

import { RootState } from '../../redux/store';

/**
 * EmployeeList is a functional component that renders a list of employees using a TableComponent.
 * It fetches employee data from the Redux store and displays it in a sortable and searchable table.
 * If no data is available from the store, it uses placeholder data.
 */
export function EmployeeList() {
  /**
   * Fetches employee list from the Redux store.
   */
  const employeeList = useSelector((state: RootState) => state.employee.employeeList);

  /**
   * Prepares data to be displayed in the table. If the employee list from the store is empty,
   * it falls back to using placeholder data. Converts string dates in the data to Date objects.
   */
  const dataToDisplay: EmployeeType[] =
    employeeList.length === 0
      ? placeholderData.map((employee) => ({
          ...employee,
          startDate: new Date(employee.startDate),
          dateOfBirth: new Date(employee.dateOfBirth),
        }))
      : employeeList.map((employee) => ({
          ...employee,
          startDate: new Date(employee.startDate),
          dateOfBirth: new Date(employee.dateOfBirth),
        }));

  /**
   * Configuration for table columns.
   */
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

/**
 * Type definition for an employee.
 */
export type EmployeeType = {
  firstName: string;
  lastName: string;
  startDate: Date;
  department: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};
