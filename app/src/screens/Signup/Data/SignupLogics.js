
import { Alert } from 'react-native';
import { registerUser } from '../../../../src/redux/Actions/action';

const handleRegister = async (data, dispatch, navigation) => {
  const { firstName, lastName, email, password, phone } = data;
  const errors = {};

  if (!firstName.trim()) errors.firstName = 'First name is required';
  if (!lastName.trim()) errors.lastName = 'Last name is required';
  if (!email.trim()) errors.email = 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
  if (!password.trim()) errors.password = 'Password is required';
  if (!phone.trim()) errors.phone = 'Phone number is required';

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  try {
    const response = await dispatch(registerUser(data)).unwrap();
    Alert.alert('Success', 'Registration successful!');
    navigation.navigate('Login');
    return { valid: true };
  } catch (err) {
    Alert.alert('Error', err.message || 'Registration failed');
    return { valid: false };
  }
};

export default handleRegister;
