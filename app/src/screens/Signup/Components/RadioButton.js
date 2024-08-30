import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../../utils/colors';

const RadioButton = ({ selectedGender, onChange }) => {
  const [selected, setSelected] = useState('');

  const options = [
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' }
  ];

  useEffect(() => {
    setSelected(selectedGender); 
  }, [selectedGender]);

  const handleSelection = option => {
    setSelected(option.value);
    onChange(option.value);
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={styles.singleOptionContainer}
          onPress={() => handleSelection(option)}
        >
          <View style={styles.outerCircle}>
            {selected === option.value ? <View style={styles.innerCircle} /> : null}
          </View>
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
   paddingRight:120,
  },
  singleOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10, // Space between options
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.darkprimariColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Space between circle and label
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.darkprimariColor,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.darkprimariColor,
  },
});

export default RadioButton;
