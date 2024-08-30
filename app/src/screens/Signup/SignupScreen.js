import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import BackgroundContainer from './Components/BackgroundContainer';
import COLORS from '../../utils/colors';

const { height, width } = Dimensions.get('window');

const SignupScreen = () => {
  return (

    <View style={styles.container}>
      <BackgroundContainer />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: width,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover',
  },
  scrollViewContent: {

  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: COLORS.whiteColor,
    fontWeight: 'bold',
  },
});

export default SignupScreen;

