/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { StyleService } from '@ui-kitten/components';
import { Text, View } from 'react-native';
import { onlyLettersWithSpaceAndHyphen } from '../../utils/regex.util';
import { CustomInput } from '../Core/CustomInput';
import { Colors } from '../../constants';

type EmployeeAddressProps = {
  saveEmployeePressed: boolean;
  userFormOutput: (form: any) => void;
  employeeAddress?: any;
};

const EmployeeAddress = ({
  userFormOutput,
  employeeAddress,
  saveEmployeePressed = false,
}: EmployeeAddressProps) => {
  const [streetAddress, setStreetAddress] = useState('');
  const [errorStreetAddress, setErrorStreetAddress] = useState('');
  const [statusStreetAddress, setStatusStreetAddress] = useState('basic');

  const [city, setCity] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [statusCity, setStatusCity] = useState('basic');

  const [postalCode, setPostalCode] = useState('');
  const [errorPostalCode, setErrorPostalCode] = useState('');
  const [statusPostalCode, setStatusPostalCode] = useState('basic');

  const [country, setCountry] = useState('');
  const [errorCountry, setErrorCountry] = useState('');
  const [statusCountry, setStatusCountry] = useState('basic');

  const streetAddressRef: React.RefObject<any> = useRef(null);
  const postalCodeRef: React.RefObject<any> = useRef(null);
  const cityRef: React.RefObject<any> = useRef(null);
  const countryRef: React.RefObject<any> = useRef(null);

  const [isStreetAddressFocus, setIsStreetAddressFocus] = useState(false);
  const [isPostalCodeFocus, setIsPostalCodeFocus] = useState(false);
  const [isCountryFocus, setIsCountryFocus] = useState(false);
  const [isCityFocus, setIsCityFocus] = useState(false);

  useEffect(() => {
    saveEmployeePressed && verifyAddressForm();
  }, [saveEmployeePressed]);

  useEffect(() => {
    if (employeeAddress) {
      setPostalCode(employeeAddress?.postalCode.toString());
      setStreetAddress(employeeAddress?.streetAddress);
      setCountry(employeeAddress?.country);
      setCity(employeeAddress?.city);
    }
  }, [employeeAddress]);

  const verifyAddressForm = () => {
    if (
      verifyStreetAddress() &&
      verifyCity() &&
      verifyCountry() &&
      verifyPostalCode()
    ) {
      userFormOutput({
        streetAddress: streetAddress,
        city: city,
        postalCode: postalCode,
        country: country,
      });
    }
  };

  const onChangeTextCity = (text: any): void => {
    setCity(text);

    if (text.length === 0) {
      setErrorCity('City cannot be empty');
      setStatusCity('danger');
    } else if (!onlyLettersWithSpaceAndHyphen.test(text)) {
      setErrorCity('Please enter a valid city');
      setStatusCity('danger');
    } else {
      setErrorCity('');
      setStatusCity('basic');
    }
  };

  const onChangeTextPostalCode = (text: any): void => {
    setPostalCode(text);

    if (text.length === 0) {
      setErrorPostalCode('Postal code cannot be empty');
      setStatusPostalCode('danger');
    } else {
      setErrorPostalCode('');
      setStatusPostalCode('basic');
    }
  };

  const onChangeTextCountry = (text: any): void => {
    setCountry(text);

    if (text.length === 0) {
      setErrorCountry('Country cannot be empty');
      setStatusCountry('danger');
    } else if (!onlyLettersWithSpaceAndHyphen.test(text)) {
      setErrorCountry('Please enter a valid country');
      setStatusCountry('danger');
    } else {
      setErrorCountry('');
      setStatusCountry('basic');
    }
  };

  const onChangeTextStreetAddress = (text: any): void => {
    setStreetAddress(text);

    if (text.length === 0) {
      setErrorStreetAddress('Street address cannot be empty');
      setStatusStreetAddress('danger');
    } else {
      setErrorStreetAddress('');
      setStatusStreetAddress('basic');
    }
  };

  const verifyCity = (): boolean => {
    if (city.length === 0) {
      setErrorCity('City cannot be empty');
      setStatusCity('danger');
      return false;
    } else if (!onlyLettersWithSpaceAndHyphen.test(city)) {
      setErrorCity('Please enter a valid city');
      setStatusCity('danger');
      return false;
    } else {
      setErrorCity('');
      setStatusCity('basic');
      return true;
    }
  };

  const verifyCountry = (): boolean => {
    if (country.length === 0) {
      setErrorCountry('Country cannot be empty');
      setStatusCountry('danger');
      return false;
    } else if (!onlyLettersWithSpaceAndHyphen.test(country)) {
      setErrorCountry('Please enter a valid country');
      setStatusCountry('danger');
      return false;
    } else {
      setErrorCountry('');
      setStatusCountry('basic');
      return true;
    }
  };
  const verifyPostalCode = (): boolean => {
    if (postalCode.length === 0) {
      setErrorPostalCode('Postal code cannot be empty');
      setStatusPostalCode('danger');
      return false;
    } else {
      setErrorPostalCode('');
      setStatusPostalCode('basic');
      return true;
    }
  };
  const verifyStreetAddress = (): boolean => {
    if (streetAddress.length === 0) {
      setErrorStreetAddress('Street address cannot be empty');
      setStatusStreetAddress('danger');
      return false;
    } else {
      setErrorStreetAddress('');
      setStatusStreetAddress('basic');
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderBottomFullScreen} />
      <Text style={[styles.sectionLabel, styles.margin]}>
        Address information
      </Text>

      <CustomInput
        style={styles.input}
        caption={errorCountry}
        icon={''}
        inputRef={countryRef}
        isFocus={isCountryFocus}
        label={'Country'}
        size="large"
        nextInputRef={streetAddressRef}
        onInputBlur={() => setIsCountryFocus(false)}
        onInputChangeText={onChangeTextCountry}
        onInputFocus={() => setIsCountryFocus(true)}
        placeholder={''}
        returnKeyType={'next'}
        status={statusCountry}
        value={country}
      />

      <CustomInput
        style={styles.input}
        caption={errorStreetAddress}
        icon={''}
        inputRef={streetAddressRef}
        isFocus={isStreetAddressFocus}
        label={'Street address'}
        size="large"
        nextInputRef={cityRef}
        onInputBlur={() => setIsStreetAddressFocus(false)}
        onInputChangeText={onChangeTextStreetAddress}
        onInputFocus={() => setIsStreetAddressFocus(true)}
        placeholder={''}
        returnKeyType={'next'}
        status={statusStreetAddress}
        value={streetAddress}
      />

      <View style={styles.rowContainer}>
        <CustomInput
          style={styles.halfWidth}
          caption={errorCity}
          icon={''}
          inputRef={cityRef}
          isFocus={isCityFocus}
          label={'City'}
          size="large"
          nextInputRef={postalCodeRef}
          onInputBlur={() => setIsCityFocus(false)}
          onInputChangeText={(text: any) => onChangeTextCity(text)}
          onInputFocus={() => setIsCityFocus(true)}
          placeholder={''}
          returnKeyType={'next'}
          status={statusCity}
          value={city}
        />

        <CustomInput
          style={styles.halfWidth}
          caption={errorPostalCode}
          icon={''}
          inputRef={postalCodeRef}
          isFocus={isPostalCodeFocus}
          label={'Postal Code'}
          size="large"
          nextInputRef={postalCodeRef}
          onInputBlur={() => setIsPostalCodeFocus(false)}
          onInputChangeText={(text: any) => onChangeTextPostalCode(text)}
          onInputFocus={() => setIsPostalCodeFocus(true)}
          placeholder={''}
          returnKeyType={'done'}
          status={statusPostalCode}
          value={postalCode}
        />
      </View>
    </View>
  );
};

const styles = StyleService.create({
  container: {
    flex: 1,
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
  margin: {
    marginTop: 20,
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
  input: {
    marginTop: 16,
  },
  borderBottomFullScreen: {
    borderBottomColor: Colors.default.primary,
    borderBottomWidth: 1,
    marginTop: 25,
  },
});
export default EmployeeAddress;
