/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomInput } from '../../../../components/Core/CustomInput';
import { Colors, Routes } from '../../../../constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

type EmployeeProps = {
  employeeList: any;
};

const EmployeesComponent = (props: EmployeeProps) => {
  const { employeeList } = props;
  const isFocused = useIsFocused();
  const [employees, setEmployees] = useState<any>([]);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const searchTextRef: React.RefObject<any> = useRef(null);
  const [isSearchTextFocus, setIsSearchTextFocus] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (isFocused) {
      setEmployees(employeeList);
    }
  }, [isFocused]);

  const onChangeSearchText = (text: any): void => {
    setSearchText(text);
    if (text.length > 2) {
      const filteredData = employees.filter(
        (employee: any) =>
          employee?.basicInformation?.firstName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          employee.basicInformation?.lastName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          employee.basicInformation?.email
            .toLowerCase()
            .includes(text.toLowerCase()),
      );
      setEmployees(filteredData);
    } else if (text.length === 0) {
      setEmployees(employeeList);
    }
  };

  const viewEmployee = (employee: any) => {
    if (employee) {
      navigation.navigate(Routes.VIEW_EMPLOYEE, {
        employee: employee,
      });
    } else {
      showErrorToast('Failed to view employee');
    }
  };

  const showErrorToast = (error: string) => {
    toast.show(error, {
      type: 'danger',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  };

  const RenderEmployeeRow = React.memo(({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.employeeParentContainer}
        onPress={() => viewEmployee(item)}>
        <View style={styles.employeeContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.normalText}>
                {item?.basicInformation?.firstName || 'Not available'}
              </Text>
              <Text style={styles.normalText}>
                {item?.basicInformation?.lastName || 'Not available'}
              </Text>
            </View>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.boldText}>
              {item?.basicInformation?.contactNumber || 'Not available'}
            </Text>
            <Text style={styles.boldText}>
              {item?.basicInformation?.email || 'Not available'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <CustomInput
        caption={''}
        icon={''}
        inputRef={searchTextRef}
        isFocus={isSearchTextFocus}
        label={''}
        keyboardType={'email-address'}
        size="large"
        nextInputRef={searchTextRef}
        onInputBlur={() => setIsSearchTextFocus(false)}
        onInputChangeText={(text: any) => onChangeSearchText(text)}
        onInputFocus={() => setIsSearchTextFocus(true)}
        placeholder={'Search'}
        returnKeyType={'done'}
        status={'basic'}
        value={searchText}
      />
      <View style={styles.employeeListContainer}>
        <FlatList
          data={employees}
          renderItem={({ item, index }) => (
            <RenderEmployeeRow item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  employeeListContainer: {
    marginVertical: 15,
  },
  employeeContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  employeeParentContainer: {
    paddingVertical: 10,
    backgroundColor: Colors.default.white,
    borderRadius: 10,
    marginVertical: 2,
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  normalText: {
    paddingTop: 10,
    fontSize: 14,
    color: Colors.default.primary,
    fontWeight: '400',
  },
  boldText: {
    paddingTop: 10,
    fontSize: 14,
    color: Colors.default.primary,
    textAlign: 'right',
    fontWeight: '600',
  },
});

export default EmployeesComponent;
