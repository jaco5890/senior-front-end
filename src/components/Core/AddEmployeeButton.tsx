/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Routes } from '../../constants';
import Colors from '../../constants/Colors';
import { AddIcon } from './Icons';

const AddEmployeeButton = (props: any) => {
  const { navigation } = props;

  const navigateUser = () => {
    navigation.navigate(Routes.ADD_EMPLOYEE);
  };

  return (
    <TouchableOpacity onPress={navigateUser} style={styles.container}>
      <AddIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.default.primary,
    zIndex: 999,
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 50,
    padding: 5,
  },
  image: {
    width: 54,
    height: 49,
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 8,
    marginLeft: -2,
  },
});

export default AddEmployeeButton;
