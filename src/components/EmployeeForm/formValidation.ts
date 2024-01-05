function isValidName(name: string): boolean {
  return /^[a-zA-Z ]+$/.test(name); // Regex pour les noms (lettres et espaces uniquement)
}

function isValidDate(date: string): boolean {
  return /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/.test(date);
}

function isValidStreet(street: string): boolean {
  return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(street);
}

function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode); // 5 chiffres pour les Etats-Unis
}

export type FormErrors = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  startDate?: string;
  street?: string;
  city?: string;
  zipCode?: string;
};

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
