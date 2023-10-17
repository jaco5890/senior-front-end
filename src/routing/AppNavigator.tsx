/* eslint-disable react-hooks/rules-of-hooks */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useReduxSelector } from '../redux';
import { selectIsRunning } from '../redux/reducers/appState';
import AuthStackNavigator from './Stacks/AuthStack';
import { navigationRef } from '../../navigationRef';
import Routes from '../constants/Routes';
import Navigation from './Navigator';

const { Navigator, Screen } = createStackNavigator();

const checkStatus = () => {
  return useReduxSelector(selectIsRunning);
};

export const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {checkStatus() ? (
          <Screen name={'Default'} component={Navigation} />
        ) : (
          <>
            <Screen name={Routes.SIGN_IN} component={AuthStackNavigator} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
