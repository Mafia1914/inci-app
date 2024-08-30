import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Animated, ScrollView } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const cameraIcon = require('../../assets/images/cameraicon.png');
const galleryIcon = require('../../assets/images/gallery_img.png');
const settingIcon = require('../../assets/images/setting_icon.png');

export default function HomeScreen() {
  const devices = useCameraDevice('back');
  const camera = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const lineAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    console.log('TextRecognition:', TextRecognition);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const checkPermissions = async () => {
        try {
          const cameraPermission = await Camera.requestCameraPermission();
          const microphonePermission = await Camera.requestMicrophonePermission();
          console.log('Camera Permission:', cameraPermission);
          console.log('Microphone Permission:', microphonePermission);

          if (cameraPermission !== 'authorized' || microphonePermission !== 'authorized') {
            console.log('Permissions not granted');
          }
        } catch (error) {
          console.error('Error checking permissions:', error);
        }
      };

      checkPermissions();
      setImageData(null);
    }, [])
  );

  useEffect(() => {
    if (imageData) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(lineAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(lineAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [imageData, lineAnim]);

  const lineTranslateY = lineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 600],
  });

  const recognizeText = async (imageUri) => {
    try {
      const result = await TextRecognition.recognize(imageUri);
      if (result) {
        setRecognizedText(result.text);
        navigation.navigate('ResultScreen', { recognizedText: result.text });
      }
    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  };

  const takePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        const photoUri = `file://${photo.path}`;
        setImageData(photoUri);
        console.log('Photo taken:', photo.path);
        await recognizeText(photoUri);
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  const selectImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImageData(imageUri);
      await recognizeText(imageUri);
    }
  };

  const openSettings = () => {
    navigation.navigate('SettingScreen');
  };

  if (!devices) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <View style={styles.appbarContainer}>
        <Text style={styles.appbarText}>INCI</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {imageData ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageData }}
              style={styles.photo}
              resizeMode="cover"
            />
            <Animated.View style={[styles.animatedLine, { transform: [{ translateY: lineTranslateY }] }]} />
          </View>
        ) : (
          <Camera
            ref={camera}
            style={styles.cameraStyle}
            device={devices}
            isActive={true}
            photo={true}
          />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={selectImageFromGallery}
        >
          <Image source={galleryIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={takePhoto}
        >
          <Image source={cameraIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={openSettings}
        >
          <Image source={settingIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  appbarContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  appbarText: {
    color: '#B1E3D8',
    fontSize: 36,
    fontWeight: '600',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {
    height: '75%',
    width: '100%',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '75%',
  },
  animatedLine: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#B1E3D8',
    bottom: 0,
    top: 0,
  },
  icon: {
    width: 55,
    height: 55,
  },
});
