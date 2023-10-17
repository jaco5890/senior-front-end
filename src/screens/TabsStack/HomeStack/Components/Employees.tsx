import React, { useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomInput } from '../../../../components/Core/CustomInput';
import { Colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';

type EmployeeProps = {
  employeeList: any;
};

const EmployeesComponent = (props: EmployeeProps) => {
  const { employeeList } = props;
  const navigation = useNavigation();
  console.log(JSON.stringify(employeeList));
  const [searchText, setSearchText] = useState('');
  const searchTextRef: React.RefObject<any> = useRef(null);
  const [isSearchTextFocus, setIsSearchTextFocus] = useState(false);

  const onChangeSearchText = (text: any): void => {
    setSearchText(text);
    if (text.length > 3) {
      //search
    }
  };

  const RenderEmployeeRow = React.memo(({ item }: any) => {
    return (
      <TouchableOpacity style={styles.employeeParentContainer}>
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
          data={employeeList}
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
