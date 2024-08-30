import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import Button from '../../components/CustomButton';
import AppConstants from '../../utils/Constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyOTP, forgetPasswordEmail } from '../../redux/Actions/action'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../utils/colors';

const forgetBackgroundImg = require('../../assets/images/forget_bakground_img.png');

const OtpScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');
    const [resending, setResending] = useState(false); 
    const inputs = useRef([]);
    const { loading, error, otpData } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedEmail) {
                    setEmail(storedEmail);
                } else {
                    console.error('Email not found in storage');
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Failed to retrieve email from storage:', error.message);
                navigation.goBack();
            }
        };

        fetchEmail();
    }, [navigation]);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < newOtp.length - 1) {
            inputs.current[index + 1]?.focus();
        } else if (!value && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = () => {
        const otpString = otp.join('');
        if (otpString.length === 6) {
            dispatch(VerifyOTP({ email, otp: otpString }));
        } else {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
        }
    };

    const handleResendOtp = async () => {
        if (resending) return; 
        setResending(true);
        try {
             dispatch(forgetPasswordEmail({ email }));
            Alert.alert('Success', 'OTP has been resent.');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to resend OTP.');
        } finally {
            setResending(false);
        }
    };

    useEffect(() => {
        if (otpData?.success) {
            console.log('Navigating to ResetPasswordScreen with token:', otpData.data.token);
            navigation.navigate('ResetPasswordScreen', { token: otpData.data.token });
            
        } else if (error) {
            Alert.alert('Error', error.message || 'Verification failed');
        }
    }, [otpData, error, navigation]);

    return (
        <View style={styles.container}>
            <Image source={forgetBackgroundImg} style={styles.imageStylee} />
            <View style={styles.bodyContinerStyle}>
                <Text style={styles.ForgetTextStyle}>{AppConstants.otpText}</Text>
                <Text style={styles.otpTextStyle}>{AppConstants.otpdetailsText}</Text>
            </View>

            <View style={styles.containerr}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.box}
                        maxLength={1}
                        keyboardType="numeric"
                        onChangeText={(value) => handleOtpChange(value, index)}
                        value={digit}
                        ref={(input) => { inputs.current[index] = input; }}
                    />
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Confirm"
                    color={COLORS.primariColor}
                    textColor={COLORS.darkprimariColor}
                    onPress={handleVerifyOtp}
                    disabled={loading}
                    width={300}
                />
            </View>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>{AppConstants.OtpText}</Text>
                <TouchableOpacity onPress={handleResendOtp} disabled={resending}>
                    <Text style={styles.signUpLink}>
                        {resending ? 'Resending...' : AppConstants.TaphereText}
                    </Text>
                </TouchableOpacity>
            </View>

            {loading && (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color={COLORS.primariColor} />
                </View>
            )}

            {resending && (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="small" color={COLORS.primariColor} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    imageStylee: {
        width: '100%',
        height: '30%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    bodyContinerStyle: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: '20%'
    },
    ForgetTextStyle: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.darkprimariColor,
        marginTop: 10,
    },
    otpTextStyle: {
        marginTop: 10,
        fontSize: 14,
        marginHorizontal: '10%',
        textAlign: 'center',
        fontWeight: '400',
        color: COLORS.darkprimariColor,
    },
    containerr: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    box: {
        borderWidth: 1,
        borderColor: '#BCC9C6',
        width: 50,
        height: 60,
        margin: 5,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        color: 'black',
    },
    buttonContainer: {
        marginVertical: 40,
        alignItems: 'center',
        width: '100%',
    },
    spinnerContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    },
    signupContainer: {
        marginTop: 10,
        flexDirection: 'row',
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupText: {
        fontSize: 14,
        color: COLORS.iconsColor,
    },
    signUpLink: {
        fontSize: 12,
        color: '#439381',
        marginLeft: 5,
    },
});

export default OtpScreen;
