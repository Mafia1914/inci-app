import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomAppBar from '../../components/CustomAppBar';
import AppConstants from '../../utils/Constants';
import Button from '../../components/CustomButton';
import COLORS from '../../utils/colors';

const imgeResultlogo = require('../../assets/images/reslut_imge.png');
const forwardlogo = require('../../assets/images/Icon.png');

export default function ResultScreen({ route }) {
    const navigation = useNavigation();
    const { recognizedText } = route.params;

    return (
        <View style={styles.container}>
            <CustomAppBar Title={"Result"} />
            <View style={styles.imgeContiner}>
                <Image source={imgeResultlogo} style={styles.imageStyle} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.text}>{recognizedText}</Text>
                <Button
                    title={AppConstants.contineText}
                    color={COLORS.primariColor}
                    textColor={COLORS.darkprimariColor}
                    onPress={() => navigation.navigate('home')}
                    iconRight={forwardlogo}
                    width={300}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9', 
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, 
    },
    text: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    imageStyle: {
        width: 131,
        height: 109,
    },
    imgeContiner: {
        alignItems: 'center',
        marginVertical: 20,
    },
});
