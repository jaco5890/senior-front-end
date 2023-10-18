import { createAction, createReducer } from '@reduxjs/toolkit';
import { RootState } from '../index';

const initialState = {
  employeeList: [],
};

export const setEmployeeList = createAction(
  '[EMPLOYEES] Set Employees',
  (employeesList: []) => ({
    payload: {
      employeesList,
    },
  }),
);

export const addEmployee = createAction(
  '[EMPLOYEES] add Cart',
  employeesList => ({
    payload: {
      employeesList,
    },
  }),
);

export const deleteEmployee = createAction(
  '[EMPLOYEES] delete Employee',
  employeesList => ({
    payload: {
      employeesList,
    },
  }),
);

export const updateEmployee = createAction(
  '[EMPLOYEES] update Employee',
  employeesList => ({
    payload: {
      employeesList,
    },
  }),
);

export const selectEmployees = (state: RootState): any | undefined =>
  state.employees;

const employeeReducer = createReducer(initialState, builder => {
  builder
    .addCase(setEmployeeList, (state, action) => {
      const { employeesList } = action.payload;
      return {
        employeeList: employeesList,
      };
    })
    .addCase(addEmployee, (state, action) => {
      let _tempArr = <any>[];
      const _employee = action.payload.employeesList;
      _tempArr.push(...state.employeeList, _employee);

      return {
        ...state,
        employeesList: _tempArr,
      };
    })
    .addCase(deleteEmployee, (state, action) => {
      let _tempArr = <any>[];
      const _duplicateStateArr = <any>state.employeeList;
      const stateEmployee = action.payload.employeesList;
      const employeeIndex = state.employeeList.findIndex(
        (employee: any) => Number(employee.ID) === Number(stateEmployee.ID),
      );
      if (employeeIndex !== -1) {
        _tempArr = [..._duplicateStateArr];
        _tempArr.splice(employeeIndex, 1);
      }
      return {
        ...state,
        employeesList: _tempArr,
      };
    })
    .addCase(updateEmployee, (state, action) => {
      let _tempArr = <any>[];
      const existingEmployees = <any>state.employeeList;
      const updatedEmployee = action.payload.employeesList;

      const employeeIndex = existingEmployees.findIndex(
        (employee: any) => employee.ID === updatedEmployee.ID,
      );

      if (employeeIndex !== -1) {
        let _tempObj = { ...existingEmployees[employeeIndex] };
        _tempObj = updatedEmployee;
        _tempArr = [...existingEmployees];
        _tempArr.splice(employeeIndex, 1);
        _tempArr.push(_tempObj);
      }
      return {
        ...state,
        employeeList: _tempArr,
      };
    });
});

export default employeeReducer;
