/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaView } from 'react-native';
import { AppNavigator } from './src/routing/AppNavigator';
import { ToastProvider } from 'react-native-toast-notifications';
import { default as defaultTheme } from './src/theme/default-theme.json';
import Colors from './src/constants/Colors';

export default function App() {
  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'transparent' }} />
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={defaultTheme}>
        <ToastProvider
          successColor={Colors.default.secondary}
          dangerColor={Colors.default.red}
          warningColor={Colors.default.warning}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppNavigator />
            </PersistGate>
          </Provider>
        </ToastProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
}
