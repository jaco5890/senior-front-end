/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { Icon } from '@ui-kitten/components';
import HomeStackNavigator from './Stacks/HomeStack';
import Routes from '../constants/Routes';
import AccountStackNavigator from './Stacks/AccountStack';

const Tab = createBottomTabNavigator();

const TabStackNavigation = (): React.ReactElement => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.default.primary,
        tabBarInactiveTintColor: Colors.default.muted,
        tabBarStyle: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: Colors.default.white,
        },
      })}>
      <Tab.Screen
        name={Routes.HOME}
        component={HomeStackNavigator}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home-outline"
              fill={focused ? Colors.default.primary : Colors.default.muted}
              width={25}
              height={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.ACCOUNT}
        component={AccountStackNavigator}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person-outline"
              fill={focused ? Colors.default.primary : Colors.default.muted}
              width={25}
              height={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStackNavigation;
