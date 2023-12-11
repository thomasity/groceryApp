import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Button, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './styles/style'
import { useContext } from 'react';
import { ApiContext } from '../components/Context';



export default function Profile() {
  const { userID, setUserID } = useContext(ApiContext);
  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <View style={[styles.profileHeader]}>
        <Text style={[styles.profileHeaderText]}>Account: </Text>
        <Text style={[styles.profileHeaderText]}>{userID}</Text>
      </View>
    </SafeAreaView>
  );
}

