import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../utils/colors';


const backArrowIcon = require('../assets/images/back_arrow.png');

export default function CustomAppBar({Title}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconWrapper}>
        <Image source={backArrowIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{Title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    height: 60,
   marginVertical:'5%',
  },
  iconWrapper: {
    position: 'absolute',
    left: 15, 
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    color: COLORS.darkprimariColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
