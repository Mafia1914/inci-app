


import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';

// Icons
const icEye = require('../../../assets/images/eye_icon.png');
const icEyeOff = require('../../../assets/images/off_eye.png');
const icEmail = require('../../../assets/images/email_icon.png'); // Email icon

const TextInputLogin = ({ placeholder, type = 'text', onChangeText, value, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(type === 'password');
  const inputRef = useRef(null);
  const labelAnimation = useRef(new Animated.Value(0)).current;

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleChangeText = useCallback((text) => {
    onChangeText(text);
  }, [onChangeText]);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || value.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, -10],
    }),
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#B1E3D8'],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <Animated.Text
          style={[styles.placeholderLabel, labelStyle]}
          onPress={() => inputRef.current?.focus()}
        >
          {placeholder}
        </Animated.Text>
      </View>
      <View style={styles.inputWrapper}>
        {type === 'email' && (
          <Image source={icEmail} style={styles.iconLeft} />
        )}
        <TextInput
          ref={inputRef}
          style={[styles.labeledInput, { borderColor: isFocused ? '#B1E3D8' : 'transparent' }]}
          placeholder={placeholder}
          placeholderTextColor="#ddd"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText}
          value={value}
          secureTextEntry={type === 'password' && secureTextEntry}
        />
        {type === 'password' && (
          <TouchableOpacity style={styles.iconRight} onPress={toggleSecureTextEntry}>
            <Image source={secureTextEntry ? icEyeOff : icEye} style={styles.iconImage} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: '100%',
  },
  labelWrapper: {
    position: 'relative',
    marginBottom: 5,
  },
  placeholderLabel: {
    position: 'absolute',
    left: 12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    color: 'black',
    zIndex: 1,
    
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  labeledInput: {
    height: 47,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    paddingHorizontal: 12, // Padding for the input text
    paddingTop: 20, // Space for the label
    textAlign: 'left', // Align text left inside the input
  },
  iconLeft: {
    position: 'absolute',
    left: '90%', // Position the icon to the left
    height: 20,
    width: 20,
    tintColor: '#aaa',
    zIndex: 1,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  errorText: {
    marginTop: 7,
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    width: '100%',
  },
});
export default TextInputLogin;