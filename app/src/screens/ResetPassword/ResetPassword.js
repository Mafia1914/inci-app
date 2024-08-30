import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import COLORS from '../../utils/colors';
import AppConstants from '../../utils/Constants';
import Button from '../../components/CustomButton';
import TextInputLogin from '../../components/CustomInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ResetPassword } from '../../redux/Actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const forgetBackgroundImg = require('../../assets/images/forget_bakground_img.png');

const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    useEffect(() => {
        const fetchEmailAndToken = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedEmail) {
                    setEmail(storedEmail);
                } else {
                    console.error('Email not found in storage');
                    navigation.goBack();
                    return;
                }

                const routeToken = route.params?.token;
                if (routeToken) {
                    setToken(routeToken);
                } else {
                    console.error('Token not found in route parameters');
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Failed to retrieve email or token:', error);
                navigation.goBack();
            }
        };

        fetchEmailAndToken();
    }, [navigation, route.params]);

    const handleResetPassword = async () => {
        setPasswordError('');
        setConfirmPasswordError('');
        
        if (!password) {
            setPasswordError('Password is required');
            return;
        }
        
        if (!confirmPassword) {
            setConfirmPasswordError('Confirm Password is required');
            return;
        }
        
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }
        
        if (!email || !token) {
            Alert.alert('Error', 'Email or token is missing. Please try again.');
            return;
        }
        
        try {
             dispatch(ResetPassword({ email, password, token }));
            Alert.alert('Success', 'Password reset successfully');
            
      
            await AsyncStorage.removeItem('userEmail');
            
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.message || 'An error occurred');
        }
    };
    
    

    return (
        <ScrollView>
        <View style={styles.container}>
            <Image source={forgetBackgroundImg} style={styles.imageStylee} />
            <View style={styles.bodyContainer}>
                <Text style={styles.resetText}>{AppConstants.resetPasswordText}</Text>
                <Text style={styles.otpText}>{AppConstants.otpdetailsText}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <TextInputLogin
                    placeholder="Password*"
                    type="password"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    error={passwordError}
                    style={styles.input}
                />
                <TextInputLogin
                    placeholder="Confirm Password*"
                    type="password"
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                    error={confirmPasswordError}
                    style={styles.input}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Confirm"
                    color={COLORS.primariColor}
                    textColor={COLORS.darkprimariColor}
                    onPress={handleResetPassword}
                    width={310}
                />
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStylee: {
        width: '100%',
        height: 270,
        resizeMode: 'cover',
    },
    bodyContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    resetText: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.darkprimariColor,
        marginTop: 20,
    },
    otpText: {
        marginTop: 10,
        fontSize: 14,
        marginHorizontal: '10%',
        textAlign: 'center',
        fontWeight: '400',
        color: COLORS.darkprimariColor,
        marginBottom: 20,
    },
    input: {
        height: 46,
        width: '85%',
        marginBottom: 20,
        justifyContent: 'center',
    },
    buttonContainer: {
        marginVertical: 50,
        alignItems: 'center',
        width: '100%',
        height: 48,
    },
    fieldContainer: {
        marginHorizontal: 25,
    },
});

export default ResetPasswordScreen;
