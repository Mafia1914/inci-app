
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAppBar from '../../components/CustomAppBar';
import COLORS from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import AppConstants from '../../utils/Constants';
import PhoneField from './Componets/PhoneFild';
import RadioButton from '../Signup/Components/RadioButton';
import CalendarField from '../Signup/Components/CalendarField';
import UserTypeButton from '../Signup/Components/UserTypeSlection';
import Button from '../../components/CustomButton';
import TextInputLogin from '../../components/CustomInput';
import { GetProfile, updateProfile } from '../../redux/Actions/action';
import { setToken } from '../../redux/Actions/autheSlice';

export default function ProfileScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          const storedToken = await AsyncStorage.getItem('authToken');
          if (storedToken) {
            dispatch(setToken(storedToken));
          }
        }

        if (token) {
          const resultAction = await dispatch(GetProfile()).unwrap();
          console.log('Fetched Profile Data:', resultAction);
          setFirstName(resultAction.firstName || '');
          setLastName(resultAction.lastName || '');
          setEmail(resultAction.email || '');
          setPhone(resultAction.phone || '');
          setGender(resultAction.gender || 'm');
          setRole(resultAction.role || 'beautician');
          setCountryCode(resultAction.countryCode || '+92');
          setDateOfBirth(resultAction.dateOfBirth || '');
        } else {
          // Alert.alert('Error', 'No authentication token found');
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'Failed to fetch profile data');
      }
    };

    fetchProfile();
  }, [dispatch, token]);

  const handleSaveChanges = () => {
    const profileData = {
      email,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      countryCode,
      phone,
      role,
    };

    dispatch(updateProfile(profileData))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Profile updated successfully!');
        // navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Error', error.message || 'Failed to update profile');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <CustomAppBar Title={"Profile"} />
        <Text style={styles.title}>{AppConstants.profileText}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInputLogin
              placeholder="First name*"
              onChangeText={setFirstName}
              value={firstName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInputLogin
              placeholder="Last name*"
              onChangeText={setLastName}
              value={lastName}
              style={styles.lastrname}
            />
          </View>
        </View>

        <View style={styles.inputContainerr}>
          <TextInputLogin
            onChangeText={setEmail}
            placeholder="E-mail*"
            style={styles.inputt}
            value={email}
            editable = {false}
            type='email'
          />

          <PhoneField
            countryCode={countryCode}
            phone={phone}
            onChangePhone={formattedPhone => {
              console.log('Phone Number Updated:', formattedPhone);
              setPhone(formattedPhone);
            }}
            onChangeCountryCode={code => {
              console.log('Country Code Updated:', code);
              setCountryCode(code);
            }}
          />
        </View>

        <View style={styles.radibutto}>
          <RadioButton
            selectedGender={gender}
            onChange={setGender}
          />
          <CalendarField
            selectedDate={dateOfBirth}
            onDateChange={setDateOfBirth}
          />
          <UserTypeButton
            selectedRole={role}
            onChange={setRole}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
            color={COLORS.primariColor}
            textColor={COLORS.darkprimariColor}
            width={300}
            onPress={handleSaveChanges}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    paddingBottom: 30,
  },
  title: {
    color: COLORS.darkprimariColor,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  inputWrapper: {
    width: '45%',
    marginVertical: 5,
    marginRight: 15,
  },
  inputContainerr: {
    width: '92%',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  input: {
    width: '100%',
  },
  lastrname: {
    width: '100%',
  },
  inputt: {
    width: '100%',
    marginVertical: 8,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  radibutto: {
    marginHorizontal: 10,
  },
});

