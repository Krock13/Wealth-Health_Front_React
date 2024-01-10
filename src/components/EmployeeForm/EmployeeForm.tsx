/**
 * EmployeeForm Component
 *
 * This component renders a form for creating a new employee.
 * It includes input fields for employee details such as name,date of birth, address, etc.
 * The form also integrates a DatePicker component for selecting dates and handles form validation,
 * state management, and submission.
 */

import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/slices/employeeSlice';
import { states } from './states';
import { validateFormFields, FormErrors } from './formValidation';
import Modal from '../Modal/Modal';
import { DatePicker } from '../DatePicker/DatePicker';
import styles from './EmployeeForm.module.css';

export function EmployeeForm() {
  const dispatch = useDispatch();

  // State management for form fields, errors, modals, and date pickers.
  const [employee, setEmployee] = useState({
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDOBPickerOpen, setDOBPickerOpen] = useState(false);
  const [isStartDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Toggle functions for date pickers.
  const toggleDOBPicker = () => setDOBPickerOpen(!isDOBPickerOpen);
  const toggleStartDatePicker = () => setStartDatePickerOpen(!isStartDatePickerOpen);

  // Function to close modal.
  const closeModal = () => setIsModalOpen(false);

  /**
   * Handles form submission.
   * Validates form data, displays error messages if necessary, or dispatches form data to the redux store.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormEmpty = Object.values(employee).some((value) => value === '');
    const hasErrors = Object.values(errors).some((error) => error);

    if (isFormEmpty || hasErrors) {
      const errorMessage = isFormEmpty
        ? 'Please fill in all required fields.'
        : 'Please correct the errors before submitting.';
      setGlobalError(errorMessage);
      setIsModalOpen(true);
    } else if (!hasErrors) {
      dispatch(addEmployee(employee));
      setIsModalOpen(true);
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
      setGlobalError(null);
    } else {
      setGlobalError('Please correct the errors before submitting.');
    }
  };

  /**
   * Handles changes in form input fields.
   * Updates the employee state and validates form fields.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const newErrors = validateFormFields(name, value);
    setErrors((prevState) => ({
      ...prevState,
      ...newErrors,
    }));
  };

  /**
   * Handles date changes from the DatePicker.
   * Formats the selected date and updates the employee state.
   */
  const handleDateChange = (newDate: Date, fieldName: 'dateOfBirth' | 'startDate') => {
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();

    const formattedDate = `${month}-${day}-${year}`;

    setEmployee((prevState) => ({
      ...prevState,
      [fieldName]: formattedDate,
    }));
  };

  const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

  // Render the form and associated components.
  return (
    <>
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
            onFocus={toggleDOBPicker}
            value={employee.dateOfBirth}
            onChange={handleChange}
          />
          {isDOBPickerOpen && (
            <DatePicker
              selectedDate={employee.dateOfBirth ? new Date(employee.dateOfBirth) : new Date()}
              onDateChange={(newDate) => handleDateChange(newDate, 'dateOfBirth')}
              closeDatePicker={() => setDOBPickerOpen(false)}
            />
          )}
          {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Start Date</label>
          <input
            name='startDate'
            className={styles.formInput}
            type='text'
            onFocus={toggleStartDatePicker}
            value={employee.startDate}
            onChange={handleChange}
          />
          {isStartDatePickerOpen && (
            <DatePicker
              selectedDate={employee.startDate ? new Date(employee.startDate) : new Date()}
              onDateChange={(newDate) => handleDateChange(newDate, 'startDate')}
              closeDatePicker={() => setStartDatePickerOpen(false)}
            />
          )}
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
      {globalError && <div className='error-message'>{globalError}</div>}
      {isModalOpen && (
        <Modal onClose={closeModal}>{globalError || 'Employee added successfully!'}</Modal>
      )}
    </>
  );
}
