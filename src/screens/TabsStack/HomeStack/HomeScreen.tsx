/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants';
import EmptyEmployeesComponent from './Components/EmptyEmployees';
import AddEmployeeButton from '../../../components/Core/AddEmployeeButton';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getAllEmployees } from '../../../services/employees-service';
import { STATUS_OK } from '../../../constants/Responses';
import { useReduxDispatch, useReduxSelector } from '../../../redux';
import {
  selectEmployees,
  setEmployeeList,
} from '../../../redux/reducers/employeeState';
import EmployeesComponent from './Components/Employees';

const HomeScreen = ({ navigation }: any): React.ReactElement => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const dispatch = useReduxDispatch();
  const stateEmployees = useReduxSelector(selectEmployees);

  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState(stateEmployees?.employees);

  useEffect(() => {
    if (isFocused) {
      getEmployeeList();
    }
  }, [isFocused]);

  const showErrorToast = (error: string) => {
    toast.show(error, {
      type: 'danger',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  };

  const getEmployeeList = async () => {
    try {
      !stateEmployees?.employeeList?.length && setIsLoading(true);
      let employeeListResponse = await getAllEmployees();
      if (employeeListResponse?.status === STATUS_OK) {
        if (employeeListResponse?.data?.length > 0) {
          setEmployees(employeeListResponse.data);
          checkIfStateShouldUpdate(employeeListResponse.data);
        }
      } else {
        showErrorToast(
          'An error has occured retrieving the employee list' +
            `${employeeListResponse.status}`,
        );
      }
      setIsLoading(false);
    } catch (error: any) {
      showErrorToast(error);
    }
  };

  const checkIfStateShouldUpdate = (employeesResponse: any) => {
    if (employeesResponse.length !== stateEmployees?.employeeList?.length) {
      dispatch(setEmployeeList(employeesResponse));
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <AwesomeAlert
          show={isLoading}
          showProgress={isLoading}
          progressColor={Colors.default.primary}
          progressSize="large"
          message={'Loading all employees'}
        />
      )}
      <Text style={styles.label}>Employees</Text>
      <Text style={styles.employeeLength}>{employees?.length} employees</Text>
      {employees?.length === 0 && <EmptyEmployeesComponent />}
      {employees?.length > 0 && <EmployeesComponent employeeList={employees} />}
      <AddEmployeeButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    color: Colors.default.primary,
    fontSize: 22,
    marginTop: 24,
    marginBottom: 10,
    fontWeight: '600',
  },
  employeeLength: {
    color: Colors.default.primary,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default React.memo(HomeScreen);
