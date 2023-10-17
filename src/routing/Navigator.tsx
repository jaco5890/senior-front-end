import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../constants/Routes';
import TabStackNavigation from './BottomTabNavigator';

const PrimaryStack = createStackNavigator();

const Navigation = () => {
  return (
    <PrimaryStack.Navigator screenOptions={{ headerShown: false }}>
      <PrimaryStack.Screen
        name={Routes.HOME}
        component={TabStackNavigation}
        options={{ headerShown: false }}
      />
    </PrimaryStack.Navigator>
  );
};

export default Navigation;
