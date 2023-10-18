import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import { Images } from '../../../../constants';

const EmptyEmployeesComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.emptyList}>
          <Image style={styles.emptyListImage} source={Images.logo} />

          <Text style={styles.title}>No employees</Text>
          <Text style={styles.subtitle}>Let’s add some employees</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
  },
  emptyList: {
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  emptyListImage: {
    width: 130,
    height: 130,
    borderRadius: 60,
  },
  title: {
    color: Colors.default.primary,
    fontSize: 20,
    paddingTop: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: Colors.default.secondary,
    fontSize: 14,
    paddingTop: 4,
    fontWeight: '400',
  },
});

export default EmptyEmployeesComponent;
