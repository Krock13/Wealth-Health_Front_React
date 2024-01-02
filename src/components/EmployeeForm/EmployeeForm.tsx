import React, { useState } from 'react';
import { states } from './states';

import styles from './EmployeeForm.module.css';

export function EmployeeForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(states[0].abbreviation);
  const [zipCode, setZipCode] = useState('');
  const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];
  const [department, setDepartment] = useState(departments[0]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Ici, tu traiterais la soumission du formulaire
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create Employee</h2>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>First Name</label>
        <input
          className={styles.formInput}
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>Last Name</label>
        <input
          className={styles.formInput}
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>Date of Birth</label>
        <input
          className={styles.formInput}
          type='text'
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>Start Date</label>
        <input
          className={styles.formInput}
          type='text'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Address</legend>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Street</label>
          <input
            className={styles.formInput}
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>City</label>
          <input
            className={styles.formInput}
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>State</label>
          <select
            className={styles.formSelect}
            value={state}
            onChange={(e) => setState(e.target.value)}
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
            className={styles.formInput}
            type='text'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </fieldset>
      <div className={styles.formRow}>
        <label className={styles.formLabel}>Department</label>
        <select
          className={styles.formSelect}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
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
