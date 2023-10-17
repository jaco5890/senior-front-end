import React from 'react';
import { Keyboard } from 'react-native';
import {
  Input,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import Colors from '../../constants/Colors';

export const CustomInput = (props: any): React.ReactElement => {
  const {
    caption,
    icon,
    leftIcon,
    isFocus,
    inputRef,
    keyboardType,
    label,
    maxLength,
    nextInputRef,
    onInputBlur,
    onInputChangeText,
    onInputFocus,
    placeholder,
    returnKeyType,
    status,
    secureTextEntry,
    style,
    textContentType,
    value,
    autoFocus = false,
    size,
    disabled = false,
    multiline = false,
  } = props;

  const styles = useStyleSheet(themedStyles);

  return (
    <Input
      autoCapitalize="none"
      autoFocus={autoFocus}
      blurOnSubmit={false}
      caption={() =>
        caption?.length > 0 && (
          <Text style={styles.errorMessage}>{caption}</Text>
        )
      }
      keyboardType={keyboardType}
      maxLength={maxLength}
      label={evaProps => (
        <Text
          {...evaProps}
          style={
            isFocus
              ? status === 'basic'
                ? styles.focusInputLabelStyleIsFocus
                : styles.focusInputLabelStyleError
              : status === 'basic'
              ? styles.basic
              : styles.focusInputLabelStyleIsNotFocus
          }>
          {label}
        </Text>
      )}
      size={size}
      onBlur={() => onInputBlur(false)}
      onChangeText={text => onInputChangeText(text)}
      accessoryLeft={leftIcon}
      accessoryRight={icon}
      onFocus={() => onInputFocus(true)}
      onSubmitEditing={() => {
        if (returnKeyType === 'next') {
          if (nextInputRef?.current) {
            nextInputRef?.current?.focus();
          }
        } else {
          Keyboard.dismiss();
        }
      }}
      placeholder={placeholder}
      ref={inputRef}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
      selectionColor={isFocus ? Colors.default.dark : undefined}
      status={status}
      multiline={multiline}
      style={
        isFocus
          ? status === 'basic'
            ? [styles.focusInputStyle, style]
            : [styles.focusInputSyleError, style]
          : status === 'basic'
          ? [styles.inputSyle, style]
          : [styles.inputSyleError, style]
      }
      textContentType={textContentType}
      value={value}
      disabled={disabled}
    />
  );
};

const themedStyles = StyleService.create({
  inputSyle: {
    borderColor: Colors.default.primary,
    backgroundColor: Colors.default.white,
    borderRadius: 8,
  },
  inputSyleError: {
    borderColor: Colors.default.red,
    backgroundColor: Colors.default.white,
    borderWidth: 2,
    borderRadius: 8,
  },
  focusInputStyle: {
    borderColor: Colors.default.secondary,
    borderWidth: 2,
    backgroundColor: Colors.default.white,
    borderRadius: 8,
  },
  focusInputSyleError: {
    borderColor: Colors.default.red,
    backgroundColor: Colors.default.white,
    borderWidth: 2,
    borderRadius: 8,
  },
  focusInputLabelStyleIsFocus: {
    color: Colors.default.primary,
    fontSize: 13,
    paddingBottom: 8,
    fontWeight: '600',
  },
  focusInputLabelStyleError: {
    color: Colors.default.red,
    fontSize: 13,
    paddingBottom: 8,
    fontWeight: '600',
  },
  focusInputLabelStyleIsNotFocus: {
    color: Colors.default.red,
    fontSize: 13,
    paddingBottom: 8,
    fontWeight: '600',
  },
  basic: {
    color: Colors.default.secondary,
    fontSize: 13,
    paddingBottom: 8,
    fontWeight: '600',
  },
  errorMessage: {
    fontSize: 13,
    paddingTop: 8,
    color: Colors.default.red,
    fontWeight: '400',
  },
});
