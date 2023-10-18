/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Routes from '../../constants/Routes';
import LoginScreen from '../../screens/AuthStack/LoginScreen';

const AuthStack = createStackNavigator();
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={Routes.SIGN_IN} component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
