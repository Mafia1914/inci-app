import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutPopup = ({ visible, onClose, onConfirm }) => {
  const navigation = useNavigation();

  const handleConfirm = async () => {
    try {

      await AsyncStorage.removeItem('authToken'); 
      await AsyncStorage.removeItem('userEmail'); 


      onConfirm();


      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], 
      });

    } catch (error) {
      console.error('Failed to clear authentication data:', error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.message}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.noButton]}
              onPress={onClose}
            >
              <Text style={styles.noButtonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.yesButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  popup: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    height:'25%',
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop:10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: 'black',
  },
  yesButton: {
    backgroundColor: '#B1E3D8',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  noButtonText: {
    color: 'white',
  },
});

export default LogoutPopup;
