import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/slices/employeeSlice';
import { states } from './states';

import styles from './EmployeeForm.module.css';

function isValidName(name: string): boolean {
  return /^[a-zA-Z ]+$/.test(name); // Regex pour les noms (lettres et espaces uniquement)
}

function isValidDate(date: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date);
}

function isValidStreet(street: string): boolean {
  return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(street);
}

function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode); // 5 chiffres pour les Etats-Unis
}

type FormErrors = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  startDate?: string;
  street?: string;
  city?: string;
  zipCode?: string;
};

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
  const [errors, setErrors] = useState<FormErrors>({}); // Gestion des erreurs

  const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validation
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'city':
        if (!isValidName(value)) {
          error = 'Please use letters and spaces only.';
        }
        break;
      case 'dateOfBirth':
      case 'startDate':
        if (!isValidDate(value)) {
          error =
            'Please enter a valid date in YYYY-MM-DD format. Month should be 01-12 and day should be 01-31.';
        }
        break;
      case 'street':
        if (!isValidStreet(value)) {
          error =
            "Please use a valid address format. Only letters, numbers, periods (.), apostrophes ('), commas (,), and hyphens (-) are allowed.";
        }
        break;
      case 'zipCode':
        if (!isValidZipCode(value)) {
          error = 'Zip code should be 5 digits long.';
        }
        break;
    }

    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
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
      setErrors({});
    } else {
      // Afficher un message d'erreur global ou empêcher la soumission
    }
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
        {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
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
        {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
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
        {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
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
        {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
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
          {errors.street && <span className={styles.error}>{errors.street}</span>}
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
          {errors.city && <span className={styles.error}>{errors.city}</span>}
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
          {errors.zipCode && <span className={styles.error}>{errors.zipCode}</span>}
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
