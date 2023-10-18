/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import { TopNavigation, Text, Layout } from '@ui-kitten/components';

import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { BackIcon } from './Icons';

type HeaderProps = {
  title: string;
};

const Header = React.memo((props: HeaderProps) => {
  const { title = '' } = props;
  const navigation = useNavigation();

  const renderBackAction = () => (
    <TouchableOpacity onPress={backButtonPressed}>
      <BackIcon />
    </TouchableOpacity>
  );

  const backButtonPressed = () => {
    navigation.goBack();
  };

  const getTitle = () => {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  return (
    <Layout style={styles.whiteHeaderContainer}>
      <TopNavigation
        style={styles.whiteHeader}
        alignment={'center'}
        title={getTitle()}
        accessoryLeft={renderBackAction}
      />
    </Layout>
  );
});

const styles = StyleSheet.create({
  whiteHeaderContainer: {
    backgroundColor: Colors.default.white,
    borderBottomColor: Colors.default.border,
    borderBottomWidth: 1.5,
    paddingBottom: 5,
    height: 'auto',
  },
  whiteHeader: {
    backgroundColor: Colors.default.white,
    flexDirection: 'row',
    width: '100%',
    overflow: 'visible',
    borderTopColor: 'transparent',
  },
  title: {
    fontSize: 14,
    color: Colors.default.primary,
    marginTop: 5,
    fontWeight: '600',
  },
  headerIcons: {
    resizeMode: 'contain',
    width: 26,
    height: 26,
    marginTop: Platform.OS === 'android' ? 5 : 0,
  },
  paddingLeft: {
    marginLeft: 5,
  },
});

export default React.memo(Header);
