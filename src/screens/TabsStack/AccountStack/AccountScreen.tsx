import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useReduxSelector } from '../../../redux';
import { selectEmployees } from '../../../redux/reducers/employeeState';

const AccountScreen = (props: any): React.ReactElement => {
  const stateEmployees = useReduxSelector(selectEmployees);

  useEffect(() => {
    console.log(stateEmployees, 'state')
  });
  

  return <View></View>;
};

const styles = StyleSheet.create({});

export default React.memo(AccountScreen);
