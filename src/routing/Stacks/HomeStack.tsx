/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/TabsStack/HomeStack/HomeScreen';
import ViewEmployee from '../../screens/TabsStack/HomeStack/ViewEmployee';
import Routes from '../../constants/Routes';
import Employee from '../../screens/TabsStack/HomeStack/Employee';

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Routes.HOME}>
      <HomeStack.Screen name={Routes.HOME} component={HomeScreen} />
      <HomeStack.Screen name={Routes.ADD_EMPLOYEE} component={Employee} />
      <HomeStack.Screen name={Routes.VIEW_EMPLOYEE} component={Employee} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
