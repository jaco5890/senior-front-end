import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = (props: any): React.ReactElement => {
  return (
    <View>
      <Text>THIS IS THE HOMESCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default React.memo(HomeScreen);
