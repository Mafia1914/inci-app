import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import COLORS from '../../../utils/colors';
import moment from 'moment';
import PropTypes from 'prop-types';

const calendarIcon = require('../../../assets/images/calander_icon.png');

const CalendarField = ({ selectedDate, onDateChange, error }) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setDatePickerVisible(false);
    }
  }, [selectedDate]);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    onDateChange(formattedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <PaperInput
          value={selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : 'DD / MM / YYYY'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onPressIn={showDatePicker}
          editable={false}
          mode="outlined"
          label={!error ? 'Birthday*' : ''}
          theme={{
            colors: {
              primary: COLORS.primariColor,
              text: COLORS.primariColor,
              placeholder: '#BCC9C6',
              background: 'white',
              outline: isFocused ? COLORS.darkprimariColor : (error ? COLORS.red : 'transparent'),
              error: COLORS.red,
            },
          }}
          style={[styles.input, isFocused && styles.inputFocused, error && styles.inputError]}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={showDatePicker}>
          <Image source={calendarIcon} style={styles.calendarIconStyle} />
        </TouchableOpacity>
      </View>
   
      {error && <Text style={styles.errorText}>{error}</Text>}
      <DateTimePickerModal
        date={selectedDate ? new Date(selectedDate) : new Date()}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

CalendarField.propTypes = {
  selectedDate: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 5,
    width: '105%',
    borderRadius: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 46,
  },
  inputFocused: {
    borderColor: COLORS.darkprimariColor,
    borderWidth: 1,
  },
  inputError: {
    borderColor: COLORS.red,
  
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    padding: 10,
  },
  calendarIconStyle: {
    width: 20,
    height: 20,
  },
  errorText: {
    color: COLORS.red,
    marginTop: 5,
    fontSize: 12,
  },
});

export default CalendarField;
