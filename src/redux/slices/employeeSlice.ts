import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définition de l'état initial et de l'interface pour les employés
interface EmployeeState {
  employeeList: Employee[];
}

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

const initialState: EmployeeState = {
  employeeList: [],
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // Action pour ajouter un employé
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employeeList.push(action.payload);
    },
  },
});

// Export des actions et du reducer
export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
