import React from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { useAuthHook } from "../hooks/auth_hook";
// import { API_PORT, API_IP } from '@env';

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
        const API_PORT = process.env.API_PORT;
        const API_IP = process.env.API_IP;
        // Rust Backend API
        const response = await fetch(`http://${API_IP}:${API_PORT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        // Now we have Response
        const { isLoggedIn, login } = useAuthHook();
    }
    const handleSignUp = async () => { }
    const handleForgotPw = async () => { }


    return (
        <SafeAreaView style={styles.background}>
            <View style={{ height: 150 }} />
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
        </SafeAreaView>
    )
}


const backgroundColor = "#424242"
const itemColor = '#dadada'
const linkColor = "#0079c7"
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
        backgroundColor: backgroundColor,
        flex: 1,
    },
    login: {
        height: 50,
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
        height: 50,
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
        fontSize: 30,
        fontWeight: '400',
    },
    signUpBox: {
        marginLeft: 20,
        marginRight: 20,
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
    },
    forgotPw: {
        marginLeft: 20,
        marginTop: 10,
    },
    forgotPwText: {
        color: linkColor,
        fontSize: 15,
        fontWeight: '600',
    },
    forgotPwRest: {
        color: itemColor,
        marginTop: 10,
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 2
    },
})
