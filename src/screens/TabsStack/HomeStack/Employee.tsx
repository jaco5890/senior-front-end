/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/Core/Header';
import { Colors } from '../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EmployeeSkills from '../../../components/Employee/EmployeeSkills';
import EmployeeInformation from '../../../components/Employee/EmployeeInformation';
import EmployeeAddress from '../../../components/Employee/EmployeeAddress';
import EmployeeInformationInterface from '../../../interfaces/employeePersonalInformation';
import EmployeeAddressInterface from '../../../interfaces/employeeAddressInterface';
import EmployeeSkillsInterface from '../../../interfaces/employeeSkillsInterface';
import {
  addNewEmployee,
  deleteExistingEmployee,
  updateExistingEmployee,
} from '../../../services/employees-service';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useToast } from 'react-native-toast-notifications';
import { useReduxDispatch } from '../../../redux';
import { STATUS_CREATED, STATUS_OK } from '../../../constants/Responses';
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from '../../../redux/reducers/employeeState';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const AddEmployee = (props: any): React.ReactElement => {
  const toast = useToast();
  const dispatch = useReduxDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [employee, setEmployee] = useState<any>({});
  const [buttonText, setButtonText] = useState('');
  const [saveEmployeePressed, setSaveEmployeePressed] = useState(false);
  const [employeeInformation, setEmployeeInformation] =
    useState<EmployeeInformationInterface | null>(null);
  const [employeeAddress, setEmployeeAddress] =
    useState<EmployeeAddressInterface | null>(null);
  const [employeeSkills, setEmployeeSkills] =
    useState<EmployeeSkillsInterface | null>(null);

  useEffect(() => {
    if (props?.route?.params?.employee) {
      setEmployee(props.route.params.employee);
      setButtonText('Update employee');
    } else {
      setButtonText('Save employee');
    }
  }, [isFocused]);

  useEffect(() => {
    if (employeeInformation && employeeAddress && employeeSkills) {
      if (buttonText === 'Save employee') {
        submitAddEmployee();
      } else {
        submitUpdateEmployee();
      }
    }
  }, [employeeInformation, employeeAddress, employeeSkills]);

  const submitAddEmployee = async () => {
    let employeeObject = {
      basicInformation: employeeInformation,
      addressInformation: employeeAddress,
      skills: employeeSkills,
    };

    try {
      setLoadingMessage('Adding employee');
      setIsLoading(true);
      let newEmployee = await addNewEmployee(employeeObject);
      setIsLoading(false);
      if (newEmployee?.status === STATUS_CREATED) {
        showSuccessToast('Employee added successfully');
        dispatch(addEmployee(newEmployee?.data));
      } else {
        showErrorToast(newEmployee?.message || 'Failed to add new employee');
      }
    } catch (error: any) {
      showErrorToast(error);
    }
  };

  const submitUpdateEmployee = async () => {
    let employeeObject = {
      basicInformation: employeeInformation,
      addressInformation: employeeAddress,
      skills: employeeSkills,
    };

    try {
      setLoadingMessage('Updating employee');
      setIsLoading(true);
      let updatedEmployee = await updateExistingEmployee(
        employeeObject,
        employee._id,
      );
      setIsLoading(false);
      if (updatedEmployee?.status === STATUS_OK) {
        showSuccessToast('Employee updated successfully');
        dispatch(updateEmployee(updatedEmployee?.data));
      } else {
        showErrorToast(updatedEmployee?.message || 'Failed to update employee');
      }
    } catch (error: any) {
      showErrorToast(error);
    }
  };

  const submitDeleteEmployee = async () => {
    try {
      setLoadingMessage('Deleting employee');
      setIsLoading(true);
      let deletedEmployee = await deleteExistingEmployee(employee._id);
      setIsLoading(false);
      if (deletedEmployee?.status === STATUS_OK) {
        showSuccessToast('Employeed deleted successfully');
        dispatch(deleteEmployee(deletedEmployee?.data));
      }
    } catch (error: any) {
      showErrorToast(error);
    }
  };

  const showSuccessToast = (message: string) => {
    toast.show(message, {
      type: 'success',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const showErrorToast = (error: string) => {
    toast.show(error, {
      type: 'danger',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  };

  const informationFormOutput = (output: any) => {
    setSaveEmployeePressed(false);
    setEmployeeInformation(output);
  };

  const addressFormOutput = (output: any) => {
    setSaveEmployeePressed(false);
    setEmployeeAddress(output);
  };

  const skillsFormOutput = (output: any) => {
    setSaveEmployeePressed(false);
    setEmployeeSkills(output);
  };

  const saveButtonPressed = () => {
    setSaveEmployeePressed(true);
  };

  const deleteButtonPressed = () => {
    submitDeleteEmployee();
  };

  return (
    <View style={styles.container}>
      <Header title="" />
      {isLoading && (
        <AwesomeAlert
          show={isLoading}
          showProgress={isLoading}
          progressColor={Colors.default.primary}
          progressSize="large"
          message={loadingMessage}
        />
      )}
      <KeyboardAwareScrollView
        alwaysBounceVertical={true}
        keyboardShouldPersistTaps={'handled'}
        style={styles.parentInformationContainer}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        extraScrollHeight={100}
        keyboardOpeningTime={0}
        snapToAlignment={'center'}
        snapToStart={false}
        contentContainerStyle={styles.scrollViewContainer}
        scrollEnabled={true}>
        <Text style={styles.label}>
          {employee?.ID ? 'Update' : 'Add'} employee
        </Text>
        <EmployeeInformation
          saveEmployeePressed={saveEmployeePressed}
          userFormOutput={informationFormOutput}
          employeeInformation={employee?.basicInformation}
        />
        <EmployeeAddress
          saveEmployeePressed={saveEmployeePressed}
          userFormOutput={addressFormOutput}
          employeeAddress={employee?.addressInformation}
        />
        <EmployeeSkills
          saveEmployeePressed={saveEmployeePressed}
          userFormOutput={skillsFormOutput}
          employeeSkills={employee?.skills}
        />
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.outlineButtonContainer}
            onPress={deleteButtonPressed}>
            <Text style={styles.outlineButtonText}>Delete employee</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButtonContainer}
            onPress={saveButtonPressed}>
            <Text style={styles.saveButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentInformationContainer: {
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
    marginBottom: 50,
  },
  label: {
    color: Colors.default.primary,
    fontSize: 22,
    marginVertical: 14,
    fontWeight: '600',
  },
  saveButtonContainer: {
    height: 48,
    backgroundColor: Colors.default.tertiary,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  outlineButtonContainer: {
    height: 48,
    backgroundColor: Colors.default.white,
    borderColor: Colors.default.tertiary,
    borderWidth: 2,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  outlineButtonText: {
    fontSize: 18,
    color: Colors.default.tertiary,
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: Colors.default.white,
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(AddEmployee);
