import React from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

const LoginScreen = (props: any): React.ReactElement => {
  return <View>
    <Text>THIS IS THE LOGIN SCREEN</Text>
  </View>;
};

const styles = StyleSheet.create({});

export default React.memo(LoginScreen);
