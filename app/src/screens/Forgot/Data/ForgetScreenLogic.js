import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { forgetPasswordEmail } from '../../../redux/Actions/action';
import { validateEmail } from '../../../utils/validateionUtils';
import { useState } from 'react';
import { Alert } from 'react-native';

const useForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleForgetPassword = async () => {
        setEmailError('');
        const errors = validateEmail(email);
        if (errors.email) {
            setEmailError(errors.email);
            return;
        }

        try {
            const result = await dispatch(forgetPasswordEmail({ email })).unwrap();
            Alert.alert('Success', 'OTP sent successfully!');
            navigation.navigate('OtpScreen'); 
            return result;
        } catch (error) {
            Alert.alert('Error', error.message || 'An error occurred');
            throw error; 
        }
    };

    return {
        email,
        setEmail,
        emailError,
        handleForgetPassword
    };
};

export default useForgetPassword;
