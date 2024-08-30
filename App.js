
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './app/src/screens/Splash/SplashScreen';
import LoginScreen from './app/src/screens/Login/LoginScreen';
import ForgetPassword from './app/src/screens/Forgot/ForgetPassword';
import { store } from './app/src/redux/store';
import { Provider } from 'react-redux';
import SignupScreen from './app/src/screens/Signup/SignupScreen';
import OtpScreen from './app/src/screens/Otp/OtpScreen';
import ResetPasswordScreen from './app/src/screens/ResetPassword/ResetPassword';
import SettingScreen from './app/src/screens/Setting/SettingScreen';
import HomeScreen from './app/src/screens/Home/HomeScreen';
import ProfileScreen from './app/src/screens/Profile/ProfileScreen'
import ResultScreen from './app/src/screens/Result/ResultScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
        
            }}
          >
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

           <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
            />

             <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
            />

            <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{ headerShown: false }}
            />
             <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
            />

            <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{ headerShown: false }}
            />
              <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
            />

           <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;





