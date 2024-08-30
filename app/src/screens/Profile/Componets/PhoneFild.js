
// import React, { useState, useRef, useEffect } from 'react';
// import { StyleSheet, View, TextInput, TouchableOpacity,Image } from 'react-native';
// import PhoneInput from 'react-native-phone-input';
// import CountryPicker from 'react-native-country-picker-modal';


// const phoneIcon = require('../../../assets/images/phone_icon.png');


// export default function PhoneField ({ onChangePhone, onChangeCountryCode }) {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [countryCode, setCountryCode] = useState('us');
//   const [countryPickerVisible, setCountryPickerVisible] = useState(false);
//   const [isPhoneInputFocused, setIsPhoneInputFocused] = useState(false);
//   const [isTextInputFocused, setIsTextInputFocused] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const phoneInputRef = useRef(null);

//   const onSelectCountry = (country) => {
//     const code = country.cca2.toLowerCase();
//     const callingCode = `+${country.callingCode[0]}`;

//     setCountryCode(code);
//     setPhoneNumber(phoneNumber.replace(/^\+\d+\s*/, ''));
//     setCountryPickerVisible(false);

//     if (onChangeCountryCode) {
//       console.log('Country Code Changed:', callingCode);
//       onChangeCountryCode(callingCode);
//     }
//   };

//   const toggleCountryPicker = () => {
//     setCountryPickerVisible(!countryPickerVisible);
//   };

//   useEffect(() => {
//     if (phoneInputRef.current) {
//       phoneInputRef.current.selectCountry(countryCode);
//     }
//   }, [countryCode]);

//   useEffect(() => {
//     if (onChangePhone) {
//       const formattedPhone = `${phoneInputRef.current.getCountryCode()} ${phoneNumber}`;
//       console.log('Phone Changed:', formattedPhone);
//       onChangePhone(formattedPhone);
//     }
//   }, [phoneNumber, countryCode]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputfilestyled}>
//         <TouchableOpacity onPress={toggleCountryPicker} style={styles.countryPickerButton}>
//           <PhoneInput
//             ref={phoneInputRef}
//             initialCountry={countryCode}
//             onChangePhoneNumber={number => {
//               setPhoneNumber(number.replace(/^\+\d+\s*/, ''));
//               console.log('Phone Number:', number);
//             }}
//             style={[
//               styles.phoneInput,
//               isPhoneInputFocused && styles.phoneInputFocused
//             ]}
//             textStyle={styles.phoneInputText}
//             onFocus={() => {
//               setIsFocused(true);
//               setPhoneNumber(false); 
//             }}
//             onBlur={() => setPhoneNumber(false)}
//           />
//           {countryPickerVisible && (
//             <CountryPicker
//               withFilter
//               withFlag
//               withCountryNameButton
//               onSelect={onSelectCountry}
//               onClose={() => setCountryPickerVisible(false)}
//               visible={countryPickerVisible}
//             />
//           )}
//         </TouchableOpacity>
//       </View>
//       <View style={styles.containerr}>
//         <Image source={phoneIcon} style={styles.phoneIcon} />
//         <TextInput
//           value={phoneNumber}
//           onChangeText={text => setPhoneNumber(text)}
//           style={[styles.phoneInputt, isFocused && styles.phoneInputtFocused]}
//           placeholder="(555) 000-0000"
//           keyboardType='numeric'
//           onFocus={() => {
//             setIsFocused(true);
//             setIsPhoneInputFocused(false); 
//           }}
//           onBlur={() => setIsPhoneInputFocused(false)}
//         />
//       </View>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     padding: 10,
//   },
//   phoneInput: {
//     borderWidth: 1,
//     borderRadius: 10,
//     width: 112,
//     height: 46,
//     padding: 20,
//     borderColor: 'transparent', 
//   },
//   phoneInputFocused: {
//     borderColor: '#B1E3D8', 
//   },
//   phoneInputText: {
//     color: '#FF4500',
//   },
//   phoneInputt: {
//     borderRadius:10,
//     width: 220,
//     height: 46,
//     padding: 15,
//     borderColor: 'transparent', 
//     color: '#000', 
//   },
//   phoneInputtFocused: {
//     borderColor: '#B1E3D8', 
//     borderRadius:5,
//   },
//   containerr:{
//     backgroundColor: '#fff',
//     borderRadius:5,
//   },
//   inputfilestyled:{
//     backgroundColor: '#fff',
//     borderRadius:5,
//     marginRight:30,

//   },
//     phoneIcon: {
//     position: 'absolute',
//     right: 10,
//     top: '50%',
//     transform: [{ translateY: -11 }],
//     width: 20,
//     height: 20,
//   },
//   phoneInputText: {
//     color: '#FF4500', 
//   },

// });




import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Image } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

const phoneIcon = require('../../../assets/images/phone_icon.png');

const PhoneField = ({ countryCode, phone, onChangePhone, onChangeCountryCode }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  useEffect(() => {
    if (phone && countryCode) {
      const phoneWithoutCode = phone.replace(countryCode, '').trim();
      setPhoneNumber(phoneWithoutCode);
      setSelectedCountry({ callingCode: [countryCode.replace('+', '')], cca2: 'US' });
    }
  }, [phone, countryCode]);

  useEffect(() => {
    if (selectedCountry && onChangeCountryCode) {
      onChangeCountryCode(`+${selectedCountry.callingCode[0]}`);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (onChangePhone) {
      const fullPhoneNumber = `${selectedCountry ? `+${selectedCountry.callingCode[0]}` : ''} ${phoneNumber}`;
      onChangePhone(fullPhoneNumber);
    }
  }, [phoneNumber, selectedCountry]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setCountryPickerVisible(false);
  };

  const renderCountryPicker = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={countryPickerVisible}
      onRequestClose={() => setCountryPickerVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CountryPicker
            withFilter
            withFlag
            withCountryNameButton
            withCallingCode
            onSelect={handleSelectCountry}
            visible={countryPickerVisible}
            onClose={() => setCountryPickerVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCountryPickerVisible(true)} style={styles.countryCodeButton}>
        <Text style={styles.countryCodeText}>{selectedCountry ? `+${selectedCountry.callingCode[0]}` : countryCode || '+1'}</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.phoneInput}
          placeholder="(555) 000-0000"
          keyboardType='numeric'
        />
        <Image source={phoneIcon} style={styles.phoneIcon} />
      </View>
      {renderCountryPicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  countryCodeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 10,
    width: '25%',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000',  // Black color for country code text
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',  // White background for the input container
    borderRadius: 10,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',  // Border color for the input
    backgroundColor: 'white',  // White background for the input
    marginLeft: 10,
    color: '#000',  // Black color for the input text
  },
  phoneIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Dark overlay for the modal
  },
  modalContent: {
    width: '70%',
    backgroundColor: '#fff',  // White background for modal content
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
});


export default PhoneField;
