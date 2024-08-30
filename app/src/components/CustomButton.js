import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import COLORS from '../utils/colors';

const Button = ({ title, onPress = () => {}, color = Colors.primaryColor, textColor = Colors.white, width, iconRight }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, { backgroundColor: color, width: width }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.text,  { color: textColor }]}>
          {title}
        </Text>
        {iconRight && (
          <Image source={iconRight} style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height:48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '400',
    fontSize: 14,
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 10,
  }
});

export default Button;
