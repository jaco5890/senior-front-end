/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Routes from '../../constants/Routes';
import AccountScreen from '../../screens/TabsStack/AccountStack/AccountScreen';

const AccountStack = createStackNavigator();
const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name={Routes.ACCOUNT} component={AccountScreen} />
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;
