
import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveEmailToStorage = async (email) => {
    try {
        console.log('Saving email to storage:', email);
        await AsyncStorage.setItem('userEmail', email);
        console.log('Email successfully saved to storage.');
    } catch (error) {
        console.error('Failed to save email to storage:', error);
    }
};



export const retrieveEmailFromStorage = async () => {
    try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email !== null) {
            console.log('Retrieved email from storage:', email);
            return email;
        } else {
            console.log('No email found in storage.');
            return null;
        }
    } catch (error) {
        console.error('Error loading email from storage:', error);
        return null;
    }
};



export const saveTokenToStorage = async (token) => {
    try {
        console.log('Saving token to storage:', token);
        await AsyncStorage.setItem('userToken', token);
        console.log('Token successfully saved to storage.');
    } catch (error) {
        console.error('Failed to save token to storage:', error);
    }
};


export const retrieveTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (token !== null) {
            console.log('Retrieved token from storage:', token);
            return token;
        } else {
            console.log('No token found in storage.');
            return null;
        }
    } catch (error) {
        console.error('Error loading token from storage:', error);
        return null;
    }
};


export const removeTokenFromStorage = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        console.log('Token successfully removed from storage.');
    } catch (error) {
        console.error('Failed to remove token from storage:', error);
    }
};






export const saveToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Failed to save to storage:', error);
    }
};

export const retrieveFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.error('Failed to retrieve from storage:', error);
    }
};
