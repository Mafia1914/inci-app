import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../../utils/colors';
import AppConstants from '../../../utils/Constants';
import TextInputLogin from '../../../components/CustomInput';
import PhoneFiled from './PhoneFiled';
import Button from '../../../components/CustomButton';
import RadioButton from './RadioButton';
import CalendarField from './CalendarField';
import UserTypeButton from './UserTypeSlection';
import { useNavigation } from '@react-navigation/native';
import handleRegister from '../Data/SignupLogics';

const signupImg = require('../../../assets/images/sigup_background_img.png');
const centerIgnupImg = require('../../../assets/images/center_img_signup.png');
const icRightArrow = require('../../../assets/images/arrow_right.png');
const icback = require('../../../assets/images/arrow.png');

export default function BackgroundContainer() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('m');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('beautician');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onRegisterPress = async () => {
    if (!validate()) return;

    const result = await handleRegister(
      { firstName, lastName, gender, dateOfBirth, email, countryCode, phone, password, role },
      dispatch,
      navigation
    );

    if (!result.valid) {
      setErrors(result.errors || {});
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <View style={styles.conatinerstyle}>
              <Image source={icback} style={styles.backarrow} />
            </View>
          </TouchableOpacity>
        </View>
        <Image source={signupImg} style={styles.imageStylee} />
        <View style={styles.containerr}>
          <Image source={centerIgnupImg} style={styles.imageStyle} />
          <Text style={styles.welComStyle}>{AppConstants.HelloText}</Text>
          <Text style={styles.LoginTextStyle}>{AppConstants.RegisterSinupText}</Text>

          <View style={styles.inputRow}>
            <TextInputLogin
              placeholder="First name*"
              value={firstName}
              onChangeText={text => setFirstName(text)}
              error={errors.firstName}
            />
            <TextInputLogin
              placeholder="Last name*"
              value={lastName}
              onChangeText={text => setLastName(text)}
              error={errors.lastName}
            />
          </View>

          <TextInputLogin
            placeholder="E-mail"
            type="email"
            value={email}
            onChangeText={text => setEmail(text)}
            error={errors.email}
            style={styles.inputField}
          />
          <TextInputLogin
            placeholder="Password"
            type="password"
            value={password}
            onChangeText={text => setPassword(text)}
            error={errors.password}
            style={styles.inputField}
          />

          <PhoneFiled
            onChangePhone={(formattedPhone) => {
              const [code, number] = formattedPhone.split(' ', 2);
              setCountryCode(code);
              setPhone(number);
            }}
            onChangeCountryCode={(code) => setCountryCode(code)}
            error={errors.phone}
          />
          <RadioButton onChange={setGender} />
          <CalendarField
            selectedDate={dateOfBirth}
            onDateChange={date => setDateOfBirth(date)}
            error={errors.dateOfBirth}
          />
          <UserTypeButton onChange={setRole} />
          <View style={styles.buttonContainer}>
            <Button
              title="Register Now"
              color={COLORS.primariColor}
              textColor={COLORS.darkprimariColor}
              onPress={onRegisterPress}
              iconRight={icRightArrow}
              width={300}
            />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>{AppConstants.alreadyText}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signUpLink}>{AppConstants.Login}</Text>
            </TouchableOpacity>
          </View>

          {loading && <Text>Loading...</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {},
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerr: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 20,
    alignItems: 'center',
    marginTop: -100,
  },
  imageStylee: {
    width: '100%',
    height: 344,
    resizeMode:'contain',
  },
  inputRow: {
    width: '47%',
    flexDirection: 'row', 
   marginLeft:'8%',
    alignItems:'center',
    marginRight:'65%'
  },
  firstNameField: {
    width: '40%', 
  },
  lastNameField: {
    width: '80%', 
  },
  imageStyle: {
    width: 125,
    height: 125,
    marginTop: -100,
  },
  welComStyle: {
    marginVertical: 10,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.darkprimariColor,
  },
  LoginTextStyle: {
    marginVertical: 10,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    color: COLORS.darkprimariColor,
    marginBottom: 30,
  },
  errorText: {
    color: 'red',
    marginHorizontal: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
    marginVertical: '15%',
  },
  signUpLink: {
    color: COLORS.primariColor,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 25,
    backgroundColor: 'rgba(52, 96, 86, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  conatinerstyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 50,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
    width: '100%',
    height: 48,
  },
  signupText: {
    color: '#000000',
  },
  backarrow: {
    height: 16,
    width: 16,
  },
  signupText: {
    fontSize: 14,
    color: COLORS.iconsColor,
  },
});
