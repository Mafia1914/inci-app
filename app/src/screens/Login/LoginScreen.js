import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AppConstants from '../../utils/Constants';
import Button from '../../components/CustomButton';
import COLORS from '../../utils/colors';
import { handleLogin } from './Data/LoginScreenLogic';
import TextInputLogin from '../../components/CustomInput';
import { StyleSheet } from 'react-native';

const loinImg = require('../../assets/images/login_background_img.png');
const icEmail = require('../../assets/images/email_icon.png');
const icEye = require('../../assets/images/eye_icon.png');

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onLoginPress = async () => {
    console.log('Login button pressed');
    await handleLogin(email.trim(), password, navigation, dispatch, setEmailError, setPasswordError);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkprimariColor} />
          <View style={styles.container}>
            <Image source={loinImg} style={styles.imageStyle} />
            <Text style={styles.welComStyle}>{AppConstants.WelcomeText}</Text>
            <Text style={styles.LoginTextStyle}>{AppConstants.LoginText}</Text>
            <TextInputLogin
              placeholder="Email*"
              type="email"
              onChangeText={setEmail}
              value={email}
              error={emailError}
            />
            <TextInputLogin
              placeholder="Password*"
              type="password"
              onChangeText={setPassword}
              value={password}
              error={passwordError}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>{AppConstants.ForgetText}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <Button
                title={AppConstants.Login}
                color={COLORS.primariColor}
                textColor={COLORS.darkprimariColor}
                onPress={onLoginPress}
                disabled={loading}
                width={300}
              />
            </View>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>{AppConstants.DontHaveAccount}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={styles.signUpLink}>{AppConstants.RegisterText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageStyle: {
    width: '100%',
    height: '48%',
    aspectRatio: 1,
  },
  welComStyle: {
    marginTop: 30,
    marginVertical: 10,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.darkprimariColor,
  },
  LoginTextStyle: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    color: COLORS.darkprimariColor,
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: COLORS.darkprimariColor,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
    width: '100%',
    height: 48,
  },
  signupContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 50,
  },
  signupText: {
    fontSize: 14,
    color: COLORS.iconsColor,
  },
  signUpLink: {
    fontSize: 12,
    color: '#439381',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});
