import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ui-kitten/components';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import { CustomInput } from '../../components/Core/CustomInput';
import Button from '../../components/Core/Button';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useReduxDispatch } from '../../redux';
import { setRunning } from '../../redux/reducers/appState';
import {
  onlyLettersWithSpaceAndHyphen,
  validPassword,
} from '../../utils/regex.util';

const LoginScreen = (): React.ReactElement => {
  const dispatch = useReduxDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [username, setUsername] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [statusUsername, setStatusUsername] = useState('basic');

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [statusPassword, setStatusPassword] = useState('basic');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const usernameRef: React.RefObject<any> = useRef(null);
  const passwordRef: React.RefObject<any> = useRef(null);

  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
        fill={Colors.default.icon}
      />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  //On change listener for username
  const onChangeTextUsername = (text: any): void => {
    setUsername(text);
    if (text.length === 0) {
      setErrorUsername('Please enter your username');
      setStatusUsername('danger');
      setButtonDisabled(true);
    } else if (!onlyLettersWithSpaceAndHyphen.test(text)) {
      setErrorUsername('Please enter a valid username');
      setStatusUsername('danger');
      setButtonDisabled(true);
    } else {
      setErrorUsername('');
      setStatusUsername('basic');
      checkFields();
    }
  };

  //On change listener for password
  const onChangeTextPassword = (text: any): void => {
    setPassword(text);

    if (text.length === 0) {
      setErrorPassword('Please enter your password');
      setStatusPassword('danger');
      setButtonDisabled(true);
    } else if (text.length < 8) {
      setErrorPassword('Password must be a minimum of 8 characters long');
      setStatusPassword('danger');
      setButtonDisabled(true);
    } else if (!validPassword.test(text)) {
      setErrorPassword(
        'Password must contain: 8 characters, Include one lower & one upper case and a number',
      );
      setStatusPassword('danger');
      setButtonDisabled(true);
    } else {
      setErrorPassword('');
      setStatusPassword('basic');
      checkFields();
    }
  };

  const checkFields = () => {
    if (username && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  //Input validation on button submit
  const verifyUsername = (): boolean => {
    if (username.length === 0) {
      setErrorUsername('Please enter your username');
      setStatusUsername('danger');
      return false;
    } else if (!onlyLettersWithSpaceAndHyphen.test(username)) {
      setErrorUsername('Please enter a valid username');
      setStatusUsername('danger');
      return false;
    } else {
      setErrorUsername('');
      setStatusUsername('basic');
      return true;
    }
  };

  //Input validation on button submit
  const verifyPassword = (): boolean => {
    if (password.length === 0) {
      setErrorPassword('Please enter your password');
      setStatusPassword('danger');
      return false;
    } else if (password.length < 8) {
      setErrorPassword('Password must be a minimum of 8 characters long ');
      setStatusPassword('danger');
      return false;
    } else if (!validPassword.test(password)) {
      setErrorPassword(
        'Password must contain: 8 characters, Include one lower & one upper case and a number',
      );
      setStatusPassword('danger');
      return false;
    } else {
      setErrorPassword('');
      setStatusPassword('basic');
      return true;
    }
  };

  const logUserIn = () => {
    if (verifyUsername() && verifyPassword()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        dispatch(setRunning(true));
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <AwesomeAlert
          show={isLoading}
          showProgress={isLoading}
          progressColor={Colors.default.primary}
          progressSize="large"
          message={'Verifying user'}
        />
      )}
      <Text style={styles.loginLabel}>Login</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <CustomInput
          style={styles.input}
          caption={errorUsername}
          icon={''}
          inputRef={usernameRef}
          isFocus={isUsernameFocus}
          label={'Username'}
          keyboardType={'email-address'}
          size="large"
          nextInputRef={passwordRef}
          onInputBlur={() => setIsUsernameFocus(false)}
          onInputChangeText={(text: any) => onChangeTextUsername(text)}
          onInputFocus={() => setIsUsernameFocus(true)}
          placeholder={'Username'}
          returnKeyType={'next'}
          status={statusUsername}
          value={username}
        />

        <CustomInput
          caption={errorPassword}
          icon={renderIcon}
          inputRef={passwordRef}
          isFocus={isPasswordFocus}
          label={'Password'}
          size="large"
          secureTextEntry={secureTextEntry}
          nextInputRef={passwordRef}
          onInputBlur={() => setIsPasswordFocus(false)}
          onInputChangeText={(text: any) => onChangeTextPassword(text)}
          onInputFocus={() => setIsPasswordFocus(true)}
          placeholder={'Password'}
          returnKeyType={'done'}
          status={statusPassword}
          value={password}
        />
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Button
          text="Log in"
          disabled={buttonDisabled}
          pressedOutput={logUserIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.white,
    paddingHorizontal: 16,
  },
  flex: {
    flex: 1,
  },
  loginLabel: {
    color: Colors.default.primary,
    fontSize: 22,
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    fontWeight: '600',
  },
  input: {
    paddingBottom: 16,
  },
  footer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.default.white,
    marginTop: 10,
    marginBottom: 15,
  },
});

export default React.memo(LoginScreen);
