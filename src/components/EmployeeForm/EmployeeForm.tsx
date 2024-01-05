import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/slices/employeeSlice';
import { states } from './states';

import styles from './EmployeeForm.module.css';

export function EmployeeForm() {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: states[0].abbreviation,
    zipCode: '',
    department: 'Sales', // L'initialisation du département par défaut
  });
  const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addEmployee(employee));

    // Réinitialise l'objet employee après la soumission
    setEmployee({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: states[0].abbreviation,
      zipCode: '',
      department: 'Sales',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create Employee</h2>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>First Name</label>
        <input
          name='firstName'
          value={employee.firstName}
          className={styles.formInput}
          type='text'
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>Last Name</label>
        <input
          name='lastName'
          className={styles.formInput}
          type='text'
          value={employee.lastName}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>Date of Birth</label>
        <input
          name='dateOfBirth'
          className={styles.formInput}
          type='text'
          value={employee.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>Start Date</label>
        <input
          name='startDate'
          className={styles.formInput}
          type='text'
          value={employee.startDate}
          onChange={handleChange}
        />
      </div>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Address</legend>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Street</label>
          <input
            name='street'
            className={styles.formInput}
            type='text'
            value={employee.street}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>City</label>
          <input
            name='city'
            className={styles.formInput}
            type='text'
            value={employee.city}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>State</label>
          <select
            name='state'
            className={styles.formSelect}
            value={employee.state}
            onChange={handleChange}
          >
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Zip Code</label>
          <input
            name='zipCode'
            className={styles.formInput}
            type='text'
            value={employee.zipCode}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>Department</label>
        <select
          name='department'
          className={styles.formSelect}
          value={employee.department}
          onChange={handleChange}
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.buttonContainer}>
        <button type='submit' className={styles.submitButton}>
          Save
        </button>
      </div>
    </form>
  );
}
