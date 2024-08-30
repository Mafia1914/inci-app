import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import COLORS from '../../utils/colors';
import AppConstants from '../../utils/Constants';

const appLogo = require('../../assets/images/app_logo.png');

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken'); 
                if (token) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'home' }],
                        })
                    );
                } else {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        })
                    );
                }
            } catch (error) {
                console.error('Error fetching token:', error);

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
            }
        };

        checkAuthToken();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{AppConstants.Animal}</Text>
            <Image source={appLogo} style={styles.imageStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primariColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: 'Inter',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        color: 'black', 
    },
    imageStyle: {
        width: 230,
        height: 241,
        margin: 20,
        borderColor: COLORS.primariColor,
        borderWidth: 2,
        borderRadius: 10,
    },
});

export default SplashScreen;
