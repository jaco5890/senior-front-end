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
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.default.white,
    marginTop: 10,
    paddingBottom: 5,
  },
  buttonSpacing: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 16,
  },
  shadow: {
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#0000000d',
    elevation: 0.5,
  },
  emptyShadow: {},
  row: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
  },
  greyText: {
    fontSize: 14,
    color: Colors.default.grey,
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontWeight: '400',
  },
  primaryText: {
    fontSize: 16,
    color: Colors.default.primary,
    marginLeft: 10,
    alignSelf: 'center',
    textAlignVertical: 'center',
    paddingBottom: 1,
    fontWeight: '600',
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
