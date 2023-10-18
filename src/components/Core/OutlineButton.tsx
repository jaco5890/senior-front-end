import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

type ButtonProps = {
  text: string;
  pressedOutput: (pressed: boolean) => void;
};
const OutlineButton = (props: ButtonProps) => {
  const { text = '', pressedOutput } = props;

  const buttonPressed = () => {
    pressedOutput(true);
  };

  return (
    <View style={[styles.mainButtons]}>
      <View style={styles.buttonSpacing}>
        <TouchableOpacity onPress={buttonPressed} style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSpacing: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    height: 48,
    borderColor: Colors.default.secondary,
    borderWidth: 1,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 4,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: Colors.default.secondary,
    textAlign: 'center',
    fontWeight: '600',
  },
  mainButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
export default OutlineButton;
