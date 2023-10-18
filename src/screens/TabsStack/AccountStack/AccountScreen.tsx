/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { Colors, VersionNumber } from '../../../constants';
import Header from '../../../components/Core/Header';

import { useDispatch } from 'react-redux';
import { setRunning } from '../../../redux/reducers/appState';
import { ArrowRight } from '../../../components/Core/Icons';

const AccountScreen = (): React.ReactElement => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Account'} />
      <ScrollView style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.userName}>
            Welcome to the employee management app
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.cardContainer, styles.borderBottom]}
          onPress={() => dispatch(setRunning(false))}>
          <Text style={styles.text}>Log out</Text>
          <ArrowRight />
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.version}>
        Version
        {' ' + VersionNumber.versionNumber + ` (${VersionNumber.buildNumber}) `}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    backgroundColor: Colors.default.white,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.default.white,
    marginTop: 30,
    paddingHorizontal: 5,
  },
  borderBottom: {
    paddingTop: 16,
    borderBottomColor: Colors.default.border,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 14,
    color: Colors.default.primary,
    fontWeight: '400',
  },
  userContainer: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 28,
    color: Colors.default.primary,
    fontWeight: '600',
  },
  version: {
    color: Colors.default.secondary,
    fontSize: 13,
    paddingTop: 42,
    marginBottom: 40,
    fontWeight: '700',
    position: 'absolute',
    bottom: 0,
    left: 16,
  },
});

export default AccountScreen;
