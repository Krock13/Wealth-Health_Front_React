/**
 * Validates if the given name is valid.
 * A valid name contains only letters and spaces.
 *
 * @param {string} name - The name to be validated.
 * @returns {boolean} - True if the name is valid, false otherwise.
 */
function isValidName(name: string): boolean {
  return /^[a-zA-Z ]+$/.test(name);
}

/**
 * Validates if the given date is in MM-DD-YYYY format.
 *
 * @param {string} date - The date string to be validated.
 * @returns {boolean} - True if the date is in the correct format, false otherwise.
 */
function isValidDate(date: string): boolean {
  return /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/.test(date);
}

/**
 * Validates if the given street address is valid.
 * A valid street address can include letters, numbers, spaces, and certain punctuation.
 *
 * @param {string} street - The street address to be validated.
 * @returns {boolean} - True if the street address is valid, false otherwise.
 */
function isValidStreet(street: string): boolean {
  return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(street);
}

/**
 * Validates if the given ZIP code is valid.
 * A valid ZIP code for this context is a 5-digit number.
 *
 * @param {string} zipCode - The ZIP code to be validated.
 * @returns {boolean} - True if the ZIP code is valid, false otherwise.
 */
function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode);
}

/**
 * Type definition for form errors.
 * Contains optional error messages for each form field.
 */
export type FormErrors = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  startDate?: string;
  street?: string;
  city?: string;
  zipCode?: string;
};

/**
 * Validates form fields and returns any errors.
 *
 * @param {string} name - The name of the form field to validate.
 * @param {string} value - The value of the form field.
 * @returns {FormErrors} - An object with error messages for specific fields.
 */
export function validateFormFields(name: string, value: string): FormErrors {
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
          'Please enter a valid date in MM-DD-YYYY format. Month should be 01-12 and day should be 01-31.';
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
  return { [name]: error };
}
