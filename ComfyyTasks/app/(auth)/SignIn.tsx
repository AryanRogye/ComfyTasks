import React from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Alert } from "react-native";
import { useAuthHook } from "../hooks/auth_hook";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn({ props }: any) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const handleSignIn = async () => {
        // Validate email and password
        if (email.length === 0 || password.length === 0) {
            alert('Please enter your email and password');
            return;
        }
        // ENV Variables
        const API_PORT = process.env.EXPO_PUBLIC_PORT;
        const API_IP = process.env.EXPO_PUBLIC_IP;
        // Rust Backend API
        try {
            console.log(`http://${API_IP}:${API_PORT}/phone_number_sign_in`);
            const response = await fetch(`http://${API_IP}:${API_PORT}/phone_number_sign_in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
        } catch (e : any) {
            Alert.alert('Error:\n', e.message);
        }
    }
    const handleSignUp = async () => { }
    const handleForgotPw = async () => { }


    return (
        <SafeAreaView style={styles.background}>
            <View style={{ height: 130 }} />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#666666"
                style={styles.login}
                // Keey lowercase
                autoCapitalize={'none'}
            />
            <View style={{ height: 20 }} />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#666666"
                style={styles.login}
            />
            <View style={{ height: 20 }} />
            {/* Sign In Button */}
            <View style={styles.loginButton}>
                <TouchableOpacity style={styles.opacity} onPress={() => handleSignIn()}>
                    <Text style={styles.loginText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            {/* Sign Up Page */}
            <View style={styles.signUpBox}>
                <Text style={styles.signUpRest}>Dont Have an Account?</Text>
                <TouchableOpacity onPress={() => handleSignUp()}>
                    <Text style={styles.signUpNow}>Sign Up Now</Text>
                </TouchableOpacity>
            </View>
            {/* Forgot PW*/}
            <View style={styles.forgotPwBox}>
                <TouchableOpacity style={styles.forgotPw} onPress={() => handleForgotPw()}>
                    <Text style={styles.forgotPwText}>Forgot Password?</Text>
                </TouchableOpacity>
                <Text style={styles.forgotPwRest}>
                    {" Dont Worry"}
                </Text>
            </View>
            {/* Continue With */}
            <View style={styles.continue}>
                <Text style={styles.continueText}> ------ Or Continue With ------</Text>
            </View>
            <View style={styles.circleIcons}>
                <View style={styles.phoneCircle}>
                    <Ionicons name="call" style={styles.phoneIcon}/>
                </View>
                <View style={styles.googleCircle}>
                    <Ionicons name="logo-google" style={styles.phoneIcon}/>
                </View>
            </View>
        </SafeAreaView>
    )
}


const backgroundColor = "#424242"
const itemColor = '#dadada'
const linkColor = "#0079c7"
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    phoneIcon: {
        fontSize: 45,
        color: 'black',
        textAlign: 'center',
        marginTop: 5,
    },
    phoneCircle: {
        backgroundColor: 'green',
        width: 55,
        height: 55,
        borderWidth: 1,
        borderRadius: 50,
        marginRight: 20,
    },
    googleCircle: {
        backgroundColor: 'lightblue',
        width: 55,
        height: 55,
        borderWidth: 1,
        borderRadius: 50,
        marginLeft: 20,
    },
    circleIcons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    background: {
        backgroundColor: backgroundColor,
        flex: 1,
    },
    login: {
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        fontSize: 20,
        color: itemColor,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#0099ff',
        height: 70,
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    opacity: {
        flex: 1,
        justifyContent: 'center',
    },
    loginText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '400',
    },
    signUpBox: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpRest: {
        color: itemColor,
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center'
    },
    signUpNow: {
        color: linkColor,
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center'
    },
    forgotPwBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    forgotPw: {
        marginLeft: 20,
    },
    forgotPwText: {
        color: linkColor,
        fontSize: 15,
        fontWeight: '600',
    },
    forgotPwRest: {
        color: itemColor,
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 2
    },
    continue: {
        marginTop: 20,
    },
    continueText: {
        color: itemColor,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})
