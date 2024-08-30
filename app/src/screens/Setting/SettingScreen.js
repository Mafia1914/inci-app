import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import CustomAppBar from '../../components/CustomAppBar';
import COLORS from '../../utils/colors';
import LogoutPopup from './Components/LogoutPopup'; 

const profileIcon = require('../../assets/images/User.png');
const forwardIcon = require('../../assets/images/forward_icon.png');
const fingerPrintIcon = require('../../assets/images/fingerprint_icon.png');
const facePrintIcon = require('../../assets/images/faceprint_icon.png');
const logotIcon = require('../../assets/images/logout_icon.png');

export default function SettingScreen({ navigation }) {
  const [isLogoutPopupVisible, setLogoutPopupVisible] = useState(false);

  const showLogoutPopup = () => {
    setLogoutPopupVisible(true);
  };

  const hideLogoutPopup = () => {
    setLogoutPopupVisible(false);
  };

  const openSettings = () => {
    navigation.navigate('profile');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    hideLogoutPopup();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <CustomAppBar Title={"Setting"} />
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.card} onPress={openSettings}>
          <View style={styles.profileContent}>
            <Image source={profileIcon} style={styles.icon} />
            <Text style={styles.profileText}>Profile</Text>
          </View>
          <Image source={forwardIcon} style={styles.forwardIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.profileContent}>
            <Image source={fingerPrintIcon} style={styles.icon} />
            <Text style={styles.profileText}>Set Finger Print Login</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.profileContent}>
            <Image source={facePrintIcon} style={styles.icon} />
            <Text style={styles.profileText}>Set FaceID Login</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={showLogoutPopup}>
          <View>
            <View style={styles.profileContent}>
              <Text style={styles.profileText}>Logout</Text>
              <Image source={logotIcon} style={styles.logouticon} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <LogoutPopup
        visible={isLogoutPopupVisible}
        onClose={hideLogoutPopup}
        onConfirm={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  profileContainer: {
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 20,
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  
    
  },
  icon: {
    width: 42,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
    
  },
  logouticon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  profileText: {
    fontSize: 16,
    color: COLORS.darkprimariColor,
    fontWeight: '600',
  },
  forwardIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
});
