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
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { FilterIcon } from '../../../../components/Core/Icons';
import { onlyNumbers } from '../../../../utils/regex.util';

type EmployeeProps = {
  employeeList: any;
};

const EmployeesComponent = (props: EmployeeProps) => {
  const { employeeList } = props;
  const [employees, setEmployees] = useState<any>(employeeList);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const searchTextRef: React.RefObject<any> = useRef(null);
  const [isSearchTextFocus, setIsSearchTextFocus] = useState(false);
  const [displayFilterSelected, setDisplayFilterSelected] = useState(false);
  const [placeholderText, setPlaceholdertext] = useState('');

  const toast = useToast();
  useEffect(() => {
    if (employeeList) {
      setEmployees(employeeList);
    }
  }, [employeeList]);

  useEffect(() => {
    if (displayFilterSelected) {
      setPlaceholdertext('Filter by birthday/skills');
    } else {
      setPlaceholdertext('Filter by name/surname/email');
    }
  }, [displayFilterSelected]);

  const onChangeSearchText = (text: any): void => {
    setSearchText(text);
    if (text.length > 2) {
      if (displayFilterSelected) {
        filterBySkillsOrBirthday(text);
      } else {
        filterByBasicInformation(text);
      }
    } else if (text.length === 0) {
      setEmployees(employeeList);
    }
  };

  const filterBySkillsOrBirthday = (text: any) => {
    let filteredList: any[] = [];
    if (onlyNumbers.test(text)) {
      console.log(text);
      filteredList = employees.filter((employee: any) =>
        employee?.basicInformation?.birthday.includes(text.toLowerCase()),
      );
    } else {
      filteredList = employees.filter((employee: any) =>
        employee.skills.some((skill: any) =>
          skill.skill.toLowerCase().includes(text),
        ),
      );
    }
    setEmployees(filteredList);
  };

  const filterByBasicInformation = (text: string) => {
    const filteredList = employees.filter(
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
    setEmployees(filteredList);
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
      <View style={styles.searchContainer}>
        <CustomInput
          style={styles.input}
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
          placeholder={placeholderText}
          returnKeyType={'done'}
          status={'basic'}
          value={searchText}
        />
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={() => setDisplayFilterSelected(!displayFilterSelected)}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  input: {
    width: '90%',
  },
  filterContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
});

export default EmployeesComponent;
