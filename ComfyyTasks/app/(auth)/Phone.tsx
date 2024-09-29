import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { Axios } from "axios";


export default function Phone() {
    const [phone, setPhone] = useState<string>('');

    const sendOtp = async () => {
        console.log(phone);
        if(phone.length <= 0 || phone.length > 10) {
            alert('Please enter a valid phone number');
            return;
        }
        // Make the api request to the rust server
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Phone Number"
                style={styles.phoneInput}
                keyboardType="phone-pad"
                placeholderTextColor={itemColor}
                value={phone}
                onChangeText={setPhone}
            />
            <TouchableOpacity style={styles.submit} onPress={() => sendOtp()}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const backgroundColor = "#424242"
const itemColor = '#dadada'
const linkColor = "#0079c7"
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    phoneInput: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        height: 50,
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        fontFamily: 'Arial',
        fontWeight: 'bold',
    },
    submit: {
        borderWidth: 1,
        borderRadius: 10,
        height: 60,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});
