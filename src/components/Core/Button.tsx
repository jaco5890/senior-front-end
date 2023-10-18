import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

type ButtonProps = {
  text: string;
  pressedOutput: (pressed: boolean) => void;
  disabled: boolean;
};
const Button = (props: ButtonProps) => {
  const { text = '', pressedOutput, disabled = false } = props;

  const buttonPressed = () => {
    pressedOutput(true);
  };

  return (
    <View style={[styles.mainButtons]}>
      <View style={styles.buttonSpacing}>
        <TouchableOpacity
          onPress={buttonPressed}
          disabled={disabled}
          style={!disabled ? styles.button : styles.buttonInvalid}>
          <Text
            style={!disabled ? styles.buttonText : styles.invalidButtonText}>
            {text}
          </Text>
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
    backgroundColor: Colors.default.primary,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 4,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonInvalid: {
    height: 48,
    backgroundColor: Colors.default.invalid,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 4,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: Colors.default.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  invalidButtonText: {
    fontSize: 18,
    color: Colors.default.invalidText,
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
export default Button;
