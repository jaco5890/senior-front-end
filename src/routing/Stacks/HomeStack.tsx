/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/TabsStack/HomeStack/HomeScreen';
import AddEmployee from '../../screens/TabsStack/HomeStack/AddEmployee';
import ViewEmployee from '../../screens/TabsStack/HomeStack/ViewEmployee';
import Routes from '../../constants/Routes';

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Routes.HOME}>
      <HomeStack.Screen name={Routes.HOME} component={HomeScreen} />
      <HomeStack.Screen name={Routes.ADD_EMPLOYEE} component={AddEmployee} />
      <HomeStack.Screen name={Routes.VIEW_EMPLOYEE} component={ViewEmployee} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
