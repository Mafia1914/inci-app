
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity,Image } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';


const phoneIcon = require('../../../assets/images/phone_icon.png');

export default function PhoneField({ onChangePhone, onChangeCountryCode }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('us');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [isPhoneInputFocused, setIsPhoneInputFocused] = useState(false);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const phoneInputRef = useRef(null);

  const onSelectCountry = (country) => {
    const code = country.cca2.toLowerCase();
    const callingCode = `+${country.callingCode[0]}`;

    setCountryCode(code);
    setPhoneNumber(phoneNumber.replace(/^\+\d+\s*/, ''));
    setCountryPickerVisible(false);

    if (onChangeCountryCode) {
      onChangeCountryCode(callingCode);
    }
  };

  const toggleCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
  };

  useEffect(() => {
    if (phoneInputRef.current) {
      phoneInputRef.current.selectCountry(countryCode);
    }
  }, [countryCode]);

  useEffect(() => {
    if (onChangePhone) {
      onChangePhone(`${phoneInputRef.current.getCountryCode()} ${phoneNumber}`);
    }
  }, [phoneNumber, countryCode]);

  return (
    <View style={styles.container}>
      <View style={styles.inputfilestyled}>
      <TouchableOpacity onPress={toggleCountryPicker} style={styles.countryPickerButton}>
        <PhoneInput
          ref={phoneInputRef}
          initialCountry={countryCode}
          onChangePhoneNumber={number => setPhoneNumber(number.replace(/^\+\d+\s*/, ''))}
          style={[
            styles.phoneInput,
            isPhoneInputFocused && styles.phoneInputFocused
          ]}
          textStyle={styles.phoneInputText}
          onFocus={() => {
            setIsFocused(true);
            setPhoneNumber(false); 
          }}
          onBlur={() => setPhoneNumber(false)}
        />
        {countryPickerVisible && (
          <CountryPicker
            withFilter
            withFlag
            withCountryNameButton
            onSelect={onSelectCountry}
            onClose={() => setCountryPickerVisible(false)}
            visible={countryPickerVisible}
          />
        )}
      </TouchableOpacity>
      </View>
      <View style={styles.containerr}>
      <Image source={phoneIcon} style={styles.phoneIcon} />
      <TextInput
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={[styles.phoneInputt, isFocused && styles.phoneInputtFocused]}
        // style={[
        //   styles.phoneInputt,
        //   isPhoneInputFocused && styles.phoneInputtFocused
        // ]}
        placeholder="(555) 000-0000"
        keyboardType='numeric'
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#8a8a8a" // Set a color for the placeholder text
     

      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  phoneInput: {
    borderWidth: 1,
    borderRadius: 5,
    width: 130,
    height: 46,
    padding: 20,
    borderColor: 'transparent', 
  },
  phoneInputFocused: {
    borderColor: '#B1E3D8', 
  },
  phoneInputText: {
    color: '#FF4500',
  },
  phoneInputt: {
    borderWidth: 1,
    width: 200,
    height: 46,
    padding: 15,
    borderColor: 'transparent', 
    color: '#000', 
  },
  phoneInputtFocused: {
    borderColor: '#B1E3D8', 
    borderRadius:5,
  },
  containerr:{
    backgroundColor: '#fff',
    borderRadius:5,
  },
  inputfilestyled:{
    backgroundColor: '#fff',
    borderRadius:5,
    marginRight:30,

  },
    phoneIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -11 }],
    width: 20,
    height: 20,
  },
  phoneInputText: {
    color: '#FF4500', 
  },

});





