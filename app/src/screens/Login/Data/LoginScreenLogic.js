import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../../../src/redux/Actions/action';


const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validatePassword = (password) => {
  return password.length >= 5;
};


const handleError = (message, type, setEmailError, setPasswordError) => {
  if (type === 'email') {
    setEmailError(message);
  } else if (type === 'password') {
    setPasswordError(message);
  }
};

export const handleLogin = async (email, password, navigation, dispatch, setEmailError, setPasswordError) => {

  setEmailError('');
  setPasswordError('');


  const normalizedEmail = email ? email.toLowerCase().trim() : '';


  let isValid = true;

  if (!normalizedEmail) {
    handleError('Please enter an email', 'email', setEmailError, setPasswordError);
    isValid = false;
  } else if (!validateEmail(normalizedEmail)) {
    handleError('Please enter a valid email', 'email', setEmailError, setPasswordError);
    isValid = false;
  }

  if (!password) {
    handleError('Please enter a password', 'password', setEmailError, setPasswordError);
    isValid = false;
  } else if (!validatePassword(password)) {
    handleError('Password should be at least 5 characters long.', 'password', setEmailError, setPasswordError);
    isValid = false;
  }

  if (!isValid) {
    return;
  }


  try {
    console.log('Attempting login with email:', normalizedEmail);
    const resultAction = await dispatch(loginUser({ email: normalizedEmail, password })).unwrap();
    console.log('Login response:', resultAction);

    if (resultAction && resultAction.success) {
      const token = String(resultAction.data.token);
      await AsyncStorage.setItem('authToken', token);

      Alert.alert('Login Successful');
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    } else {
      throw new Error(resultAction.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    Alert.alert('Error', error.message || 'Login failed');
  }
};
