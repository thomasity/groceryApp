import "react-native-gesture-handler";
import styles from './styles/style'
import { Text, View, Dimensions, SafeAreaView, Button, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import {useState, useEffect} from 'react';
import { TextInput } from 'react-native-paper';
import { useWindowDimensions } from "react-native";
import { ApiContext } from "../components/Context";
import { useContext } from "react";


export default function LoginScreen({navigation}) {
    const[username, setUser] = useState();
    const[password, setPW] = useState();
    const {height, width} = useWindowDimensions();
    const { userID, setUserID } = useContext(ApiContext);


    const login = async() => {
        console.log("logging");
        try {
            const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/users");
            if (response.ok){
                const jsonResponse = await response.json()
                console.log(jsonResponse);
                for(let i = 0; i < jsonResponse.length; ++i){
                    if (username == jsonResponse[i]["userID"]){
                        setUserID(username);
                        navigation.navigate('Home');
                    }
                }
            }
        } catch(error){
            alert(error);
            console.log(error);
        }
        return;
    }

    const signUp = async() => {
        if (username == ""){
            alert("Please enter valid username");
            return;
        }
        if (password == ""){
            alert("Please enter valid password");
            return;
        }
        try {
            const response = fetch("https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/users", {
                method: "POST",
                body: JSON.stringify({
                  userID: username,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              });
            if (response.ok){
                console.log("success");
                Alert("Sign-up Success");
            }
        } catch(error){
            console.log(error);
        }
        return;
    }

    return (
        <SafeAreaView style={[styles.loginScreen]}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.loginContainer, {width: width/1.2}]}>
                <View style={styles.loginBox}>
                    <TextInput style={[styles.loginTextBox]} placeholder={'username'} onChangeText={text => setUser(text)}/> 
                    <TextInput type="password" style={[styles.loginTextBox]} placeholder={'password'} onChangeText={text => setPW(text)}/> 
                </View>
                <View style={styles.loginButtons}>
                    <TouchableOpacity onPress={()=>{login()}}>
                        <View style={styles.loginButton}>
                        <Text style={styles.loginText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{signUp()}}>
                        <View style={styles.addWrapper}>
                        <Text style={styles.signUpText}>Sign up</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
      );
}