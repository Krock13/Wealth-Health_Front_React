import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/slices/employeeSlice';
import { states } from './states';
import { validateFormFields, FormErrors } from './formValidation';
import Modal from '../Modal/Modal';
import { DatePicker } from '../DatePicker/DatePicker';
import styles from './EmployeeForm.module.css';

export function EmployeeForm() {
  // Initialisation des états et dispatch
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDOBPickerOpen, setDOBPickerOpen] = useState(false);
  const [isStartDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [globalError, setGlobalError] = useState('');

  // Fonctions de gestion des états
  const toggleDOBPicker = () => setDOBPickerOpen(!isDOBPickerOpen);
  const toggleStartDatePicker = () => setStartDatePickerOpen(!isStartDatePickerOpen);
  const closeModal = () => setIsModalOpen(false);

  // Gestion de la soumission du formulaire
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
    } else {
      setGlobalError('Please correct the errors before submitting.');
    }
  };

  // Gestion des changements dans les inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Appelle la fonction de validation et met à jour les erreurs
    const newErrors = validateFormFields(name, value);
    setErrors((prevState) => ({
      ...prevState,
      ...newErrors,
    }));
  };

  // Gestion des changements de date
  const handleDateChange = (newDate: Date, fieldName: 'dateOfBirth' | 'startDate') => {
    // Extrait le jour, le mois et l'année
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();

    // Formatte la date en MM-DD-YYYY
    const formattedDate = `${month}-${day}-${year}`;

    // Met à jour l'état employee avec la date formatée pour l'affichage
    setEmployee((prevState) => ({
      ...prevState,
      [fieldName]: formattedDate,
    }));
  };

  // Options pour les départements
  const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

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
