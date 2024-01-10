import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface for the state of the employee slice.
 */
interface EmployeeState {
  employeeList: Employee[]; // Array to store the list of employees.
}

/**
 * Interface to describe the shape of an Employee object.
 */
interface Employee {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

/**
 * The initial state of the employee slice.
 */
const initialState: EmployeeState = {
  employeeList: [], // Starts with an empty employee list.
};

/**
 * Redux slice to manage employee-related state.
 */
export const employeeSlice = createSlice({
  name: 'employee', // Name of the slice.
  initialState,
  reducers: {
    /**
     * Reducer to add a new employee to the employee list.
     * @param {EmployeeState} state The current state of the slice.
     * @param {PayloadAction<Employee>} action The action with the payload to add.
     */
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employeeList.push(action.payload); // Adds the new employee to the list.
    },
  },
});

export const { addEmployee } = employeeSlice.actions; // Exports the actions.
export default employeeSlice.reducer; // Exports the reducer.
