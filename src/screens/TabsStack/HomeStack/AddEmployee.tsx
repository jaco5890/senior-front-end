/* eslint-disable @typescript-eslint/no-shadow */
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/Core/Header';
import { Colors } from '../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  onlyLettersWithSpaceAndHyphen,
  validEmail,
} from '../../../utils/regex.util';
import { CustomInput } from '../../../components/Core/CustomInput';
import { CalenderIcon } from '../../../components/Core/Icons';
import DatePicker from 'react-native-date-picker';

const AddEmployee = (props: any): React.ReactElement => {
  const [firstName, setFirstName] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [statusFirstName, setStatusFirstName] = useState('basic');

  const [lastName, setLastName] = React.useState('');
  const [errorLastName, setErrorLastName] = React.useState('');
  const [statusLastName, setStatusLastName] = React.useState('basic');

  const [birthday, setBirthday] = React.useState('');
  const [errorBirthday, setErrorBirthday] = React.useState('');
  const [statusBirthday, setStatusBirthday] = React.useState('basic');
  const [displayDatePicker, setDisplayDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const [cellphone, setCellphone] = React.useState('');
  const [errorCellphone, setErrorCellphone] = React.useState('');
  const [statusCellphone, setStatusCellphone] = React.useState('basic');

  const [email, setEmail] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [statusEmail, setStatusEmail] = React.useState('basic');

  const firstNameRef: React.RefObject<any> = useRef(null);
  const lastNameRef: React.RefObject<any> = React.useRef(null);
  const birthdayRef: React.RefObject<any> = React.useRef(null);
  const cellphoneRef: React.RefObject<any> = React.useRef(null);
  const emailRef: React.RefObject<any> = React.useRef(null);

  const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);
  const [isLastNameFocus, setIsLastNameFocus] = React.useState(false);
  const [isBirthdayFocus, setIsBirthdayFocus] = React.useState(false);
  const [isCellphoneFocus, setIsCellphoneFocus] = React.useState(false);
  const [isEmailFocus, setIsEmailFocus] = React.useState(false);

  const onChangeTextFirstName = (text: any): void => {
    setFirstName(text);
    if (text.length === 0) {
      setErrorFirstName('Please enter a first name');
      setStatusFirstName('danger');
    } else if (!onlyLettersWithSpaceAndHyphen.test(text)) {
      setErrorFirstName('Please enter a valid first name');
      setStatusFirstName('danger');
    } else {
      setErrorFirstName('');
      setStatusFirstName('basic');
    }
  };

  const onChangeTextLastName = (text: any): void => {
    setLastName(text);

    if (text.length === 0) {
      setErrorLastName('Please enter a surname');
      setStatusLastName('danger');
    } else if (!onlyLettersWithSpaceAndHyphen.test(text)) {
      setErrorLastName('Please enter a valid surname');
      setStatusLastName('danger');
    } else {
      setErrorLastName('');
      setStatusLastName('basic');
    }
  };

  const onChangeTextCellphone = (text: any): void => {
    setCellphone(text);

    if (text.length === 0) {
      setErrorCellphone('Please enter a valid mobile number');
      setStatusCellphone('danger');
    } else if (text.length !== 10) {
      setErrorCellphone('Please enter a valid mobile number');
      setStatusCellphone('danger');
    } else {
      setErrorCellphone('');
      setStatusCellphone('basic');
    }
  };

  const onChangeTextEmail = (text: any): void => {
    setEmail(text);

    if (text.length === 0) {
      setErrorEmail('Please enter a valid email');
      setStatusEmail('danger');
    } else if (!validEmail.test(text)) {
      setErrorEmail('Please enter a valid email');
      setStatusEmail('danger');
    } else {
      setErrorEmail('');
      setStatusEmail('basic');
    }
  };

  const onChangeTextBirthday = (): void => {
    setDisplayDatePicker(true);
  };

  const renderCalenderPopup = () => {
    return (
      <TouchableOpacity onPress={() => setDisplayDatePicker(true)}>
        <CalenderIcon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="" />
      <KeyboardAwareScrollView
        alwaysBounceVertical={true}
        keyboardShouldPersistTaps={'handled'}
        style={styles.parentInformationContainer}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        extraScrollHeight={100}
        keyboardOpeningTime={0}
        snapToAlignment={'center'}
        snapToStart={false}
        contentContainerStyle={styles.scrollViewContainer}
        scrollEnabled={true}>
        <Text style={styles.label}>Add employee</Text>

        <Text style={styles.sectionLabel}>Basic information</Text>
        <View style={styles.rowContainer}>
          <CustomInput
            style={styles.halfWidth}
            caption={errorFirstName}
            icon={''}
            inputRef={firstNameRef}
            isFocus={isFirstNameFocus}
            label={'First name'}
            size="large"
            nextInputRef={lastNameRef}
            onInputBlur={() => setIsFirstNameFocus(false)}
            onInputChangeText={(text: any) => onChangeTextFirstName(text)}
            onInputFocus={() => setIsFirstNameFocus(true)}
            placeholder={'First name'}
            returnKeyType={'next'}
            status={statusFirstName}
            value={firstName}
          />

          <CustomInput
            style={styles.halfWidth}
            caption={errorLastName}
            icon={''}
            inputRef={lastNameRef}
            isFocus={isLastNameFocus}
            label={'Last name'}
            size="large"
            nextInputRef={cellphoneRef}
            onInputBlur={() => setIsLastNameFocus(false)}
            onInputChangeText={(text: any) => onChangeTextLastName(text)}
            onInputFocus={() => setIsLastNameFocus(true)}
            placeholder={'Last name'}
            returnKeyType={'next'}
            status={statusLastName}
            value={lastName}
          />
        </View>

        <CustomInput
          style={styles.input}
          caption={errorCellphone}
          icon={''}
          inputRef={cellphoneRef}
          isFocus={isCellphoneFocus}
          label={'Cellphone number'}
          keyboardType={'number-pad'}
          size="large"
          nextInputRef={emailRef}
          onInputBlur={() => {
            setIsCellphoneFocus(false);
          }}
          onInputChangeText={(text: any) => onChangeTextCellphone(text)}
          onInputFocus={() => {
            setIsCellphoneFocus(true);
          }}
          placeholder={'Cellphone number'}
          returnKeyType={'next'}
          status={statusCellphone}
          value={cellphone}
        />
        <CustomInput
          style={styles.input}
          caption={errorEmail}
          icon={''}
          inputRef={emailRef}
          isFocus={isEmailFocus}
          label={'Email'}
          size="large"
          nextInputRef={emailRef}
          onInputBlur={() => {
            setIsEmailFocus(false);
          }}
          onInputChangeText={(text: any) => onChangeTextEmail(text)}
          onInputFocus={() => {
            setIsEmailFocus(true);
          }}
          placeholder={'Email'}
          returnKeyType={'next'}
          status={statusEmail}
          value={email}
        />

        <CustomInput
          style={styles.input}
          caption={errorBirthday}
          icon={renderCalenderPopup}
          inputRef={birthdayRef}
          isFocus={isBirthdayFocus}
          label={'Date of birth'}
          size="large"
          nextInputRef={cellphoneRef}
          onInputBlur={() => setDisplayDatePicker(false)}
          onInputChangeText={onChangeTextBirthday}
          onInputFocus={() => setDisplayDatePicker(true)}
          placeholder={''}
          returnKeyType={'next'}
          status={statusBirthday}
          value={birthday}
        />

        <Text style={[styles.sectionLabel, styles.margin]}>
          Address information
        </Text>

        <DatePicker
          modal
          open={displayDatePicker}
          date={date}
          mode={'date'}
          onDateChange={setDate}
          onConfirm={date => {
            setDate(date);
            setDisplayDatePicker(false);
            setBirthday(date.toISOString().substring(0, 10));
          }}
          onCancel={() => {
            setDisplayDatePicker(false);
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentInformationContainer: {
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
    marginBottom: 50,
  },
  contentContainer: {
    padding: 16,
  },
  label: {
    color: Colors.default.primary,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 14,
    fontWeight: '600',
  },
  margin: {
    marginTop: 20,
    marginBottom: 14,
  },
  sectionLabel: {
    color: Colors.default.secondary,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  input: {
    marginTop: 16,
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    marginTop: 16,
    width: '45%',
    marginRight: 10,
  },
});

export default React.memo(AddEmployee);
