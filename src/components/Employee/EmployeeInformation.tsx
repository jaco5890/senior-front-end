/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalenderIcon } from '../Core/Icons';
import { CustomInput } from '../Core/CustomInput';
import {
  onlyLettersWithSpaceAndHyphen,
  validEmail,
} from '../../utils/regex.util';
import DatePicker from 'react-native-date-picker';
import { Colors } from '../../constants';

type EmployeeInformationProps = {
  saveEmployeePressed: boolean;
  userFormOutput: (form: any) => void;
  employeeInformation?: any;
};

const EmployeeInformation = ({
  saveEmployeePressed = false,
  userFormOutput,
  employeeInformation,
}: EmployeeInformationProps) => {
  const [firstName, setFirstName] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [statusFirstName, setStatusFirstName] = useState('basic');

  const [lastName, setLastName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [statusLastName, setStatusLastName] = useState('basic');

  const [birthday, setBirthday] = useState('');
  const [errorBirthday, setErrorBirthday] = useState('');
  const [statusBirthday, setStatusBirthday] = useState('basic');
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [cellphone, setCellphone] = useState('');
  const [errorCellphone, setErrorCellphone] = useState('');
  const [statusCellphone, setStatusCellphone] = useState('basic');

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [statusEmail, setStatusEmail] = useState('basic');

  const firstNameRef: React.RefObject<any> = useRef(null);
  const lastNameRef: React.RefObject<any> = useRef(null);
  const birthdayRef: React.RefObject<any> = useRef(null);
  const cellphoneRef: React.RefObject<any> = useRef(null);
  const emailRef: React.RefObject<any> = useRef(null);

  const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);
  const [isLastNameFocus, setIsLastNameFocus] = useState(false);
  const [isBirthdayFocus, setIsBirthdayFocus] = useState(false);
  const [isCellphoneFocus, setIsCellphoneFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);

  useEffect(() => {
    saveEmployeePressed && verifyEmployeeInformationForm();
  }, [saveEmployeePressed]);

  useEffect(() => {
    if (employeeInformation) {
      setFirstName(employeeInformation?.firstName);
      setLastName(employeeInformation?.lastName);
      setBirthday(employeeInformation?.birthday);
      setCellphone(employeeInformation?.contactNumber);
      setEmail(employeeInformation?.email);
    }
  }, [employeeInformation]);

  const verifyEmployeeInformationForm = () => {
    if (
      verifyFirstName() &&
      verifyLastName() &&
      verifyCellphoneNumber() &&
      verifyEmail() &&
      verifyBirthday()
    ) {
      userFormOutput({
        firstName: firstName,
        lastName: lastName,
        contactNumber: cellphone,
        email: email,
        birthday: birthday,
      });
    }
  };

  const onChangeTextFirstName = (text: any): void => {
    setFirstName(text);
    if (text.length === 0) {
      setErrorFirstName('First name cannot be empty');
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
      setErrorLastName('Surname cannot be empty');
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
      setErrorCellphone('Mobile number cannot be empty');
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
      setErrorEmail('Email cannot be empty');
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

  const verifyFirstName = (): boolean => {
    if (firstName.length === 0) {
      setErrorFirstName('First name cannot be empty');
      setStatusFirstName('danger');
      return false;
    } else if (!onlyLettersWithSpaceAndHyphen.test(firstName)) {
      setErrorFirstName('Please enter a valid first name');
      setStatusFirstName('danger');
      return false;
    } else {
      setErrorFirstName('');
      setStatusFirstName('basic');
      return true;
    }
  };

  const verifyLastName = (): boolean => {
    if (lastName.length === 0) {
      setErrorLastName('Surname cannot be empty');
      setStatusLastName('danger');
      return false;
    } else if (!onlyLettersWithSpaceAndHyphen.test(lastName)) {
      setErrorLastName('Please enter a valid surname');
      setStatusLastName('danger');
      return false;
    } else {
      setErrorLastName('');
      setStatusLastName('basic');
      return true;
    }
  };

  const verifyCellphoneNumber = (): boolean => {
    if (cellphone.length === 0) {
      setErrorCellphone('Mobile number cannot be empty');
      setStatusCellphone('danger');
      return false;
    } else if (cellphone.length !== 10) {
      setErrorCellphone('Please enter a valid mobile number');
      setStatusCellphone('danger');
      return false;
    } else {
      setErrorCellphone('');
      setStatusCellphone('basic');
      return true;
    }
  };
  const verifyEmail = (): boolean => {
    if (email.length === 0) {
      setErrorEmail('Email cannot be empty');
      setStatusEmail('danger');
      return false;
    } else if (!validEmail.test(email)) {
      setErrorEmail('Please enter a valid email');
      setStatusEmail('danger');
      return false;
    } else {
      setErrorEmail('');
      setStatusEmail('basic');
      return true;
    }
  };
  const verifyBirthday = (): boolean => {
    if (birthday.length === 0) {
      setErrorBirthday('Please enter a valid date of birth');
      setStatusBirthday('danger');
      return false;
    } else {
      setErrorBirthday('');
      setStatusBirthday('basic');
      return true;
    }
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
          placeholder={''}
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
          placeholder={''}
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
        placeholder={''}
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
        placeholder={''}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionLabel: {
    color: Colors.default.primary,
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
  thirdWidth: {
    marginTop: 16,
    width: '33%',
    marginRight: 10,
  },
  borderBottomFullScreen: {
    borderBottomColor: Colors.default.primary,
    borderBottomWidth: 1,
    marginTop: 25,
  },
});

export default EmployeeInformation;
