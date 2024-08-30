import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import COLORS from '../../utils/colors';
import AppConstants from '../../utils/Constants';
import TextInputLogin from '../../components/CustomInput';
import useForgetPassword from './Data/ForgetScreenLogic'; 
import { saveEmailToStorage, retrieveEmailFromStorage } from '../../utils/StorageUtils';
import Button from '../../components/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const forgetBackgroundImg = require('../../assets/images/forget_bakground_img.png');
const icback = require('../../assets/images/arrow.png');

const ForgetPassword = () => {
    const navigation = useNavigation();
    const {
        email,
        setEmail,
        emailError,
        handleForgetPassword,
    } = useForgetPassword();

    const handleSendOtp = async () => {
        try {
            console.log('Email before saving to storage:', email);
            await saveEmailToStorage(email);
            console.log('Email successfully saved to storage.');
    
            const result = await handleForgetPassword();
            console.log('OTP sending result:', result);
            // Alert.alert('Success', 'OTP sent successfully!');
        } catch (error) {
            console.error('Error in handleSendOtp:', error);
            Alert.alert('Error', error.message || 'An error occurred');
        }
    };

    useEffect(() => {
        const loadEmail = async () => {
            try {
                const storedEmail = await retrieveEmailFromStorage();
                console.log('Retrieved email from storage:', storedEmail);
                if (storedEmail) {
                    setEmail(storedEmail);
                } else {
                    console.log('No email found in storage.');
                }
            } catch (error) {
                console.error('Error loading email from storage:', error);
            }
        };

        loadEmail();
    }, [setEmail]);

    useFocusEffect(
        React.useCallback(() => {
            // Reset email when screen is focused
            return () => {
                setEmail('');
            };
        }, [setEmail])
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#346056" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={icback} style={styles.backarrow} />
                </TouchableOpacity>
            </View>
            <Image source={forgetBackgroundImg} style={styles.imageStyle} />
            <View style={styles.bodyContainer}>
                <Text style={styles.forgetText}>{AppConstants.ForgetText}</Text>
                <Text style={styles.otpText}>{AppConstants.OtpTextEmail}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInputLogin
                    placeholder="Email*"
                    type="email"
                    onChangeText={text => {
                        console.log('Email entered:', text);
                        setEmail(text);
                    }}
                    value={email}
                    error={emailError}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title={AppConstants.sendText}
                        color={COLORS.primariColor}
                        textColor={COLORS.darkprimariColor}
                        onPress={handleSendOtp}
                        width={300}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: '100%',
        height: '40%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
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
        top: 60,
        zIndex: 1,
    },
    bodyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    forgetText: {
        fontSize: 24,
        fontWeight: '600',
        color: COLORS.darkprimariColor,
        marginTop: '20%',
        textAlign: 'center',
    },
    otpText: {
        marginTop: 10,
        fontSize: 14,
        marginHorizontal: 20,
        textAlign: 'center',
        fontWeight: '400',
        color: COLORS.darkprimariColor,
    },
    inputContainer: {
        alignItems: 'center',
        width: '100%',
        maxWidth: 340,
        marginTop: 30,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
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
    backarrow: {
        height: 16,
        width: 16,
    },
});

export default ForgetPassword;
