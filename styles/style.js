import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    addButton: {
      marginRight: 25,
      fontSize: 35,
      color: 'black',
    },
    checkbox:{
      marginRight: 10,
      width: 20,
      height: 20,
      borderColor: 'black',
      borderWidth: 1,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderTopColor: 'gray',
      borderBottomColor: 'white',
      borderWidth: '1.5',
    },
    footerItem: {
      padding: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 'auto',
        borderBottomColor: 'gray',
        borderBottomWidth: '1.5',
      },
      headerText: {
        paddingBottom: 15,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gray',
        backgroundColor: 'white',
      },
      subHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gray',
        backgroundColor: 'white',
      },
    listContainer: {
      width:'auto',
      justifyContent: 'flex-start'
  
    },
    listLeaf: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: '1',
      borderColor: 'gray',
      borderTopColor: 'white',
      height: 55,
    },
    homeListLeaf: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: '1',
      borderColor: 'gray',
      borderTopColor: 'white',
      height: 55,
    },
    listText: {
      marginLeft: 10,
      maxWidth: '80%',
      padding: 10,
      fontSize: 24,
      color: 'black',
    },
    loginBox: {
      justifyContent: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 40,
      paddingVertical: 25,
      marginBottom: 15,
      borderRadius: 15,
    },
    loginButton: {
      backgroundColor: 'white',
      borderRadius: 25,
      marginBottom: 10,
    },
    loginButtons: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginContainer: {
      flex: .75,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#a8d38d',
    },
    loginScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginText: {
      fontSize: 30,
      paddingVertical: 10,
      paddingHorizontal: 25,
      color: '#a8d38d',
    },
    loginTextBox: {
      margin: 15,
      backgroundColor: 'white',
    },
    mainContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'space-between'
    },
    nutritionButton: {
      borderWidth: 1,
      borderRadius: 30,
      padding: 20,
      paddingLeft: 30,
      paddingRight: 30,
      borderColor: 'green',
    },
    nutritionButtonText: {
      color: 'green',
      fontSize: 20,
    },
    nutritionButtonView: {
      marginBottom: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nutritionDataBox: {
      flex: 'stretch',
      alignContent: 'center',
      justifyContent: 'center',
      marginTop: 25,

    },
    nutritionText: {
      fontSize: 20,
    },
    profileHeader: {
      marginTop: 50,
      marginLeft: 15,
      flexDirection: 'row',
      alignItems: 'center',
      width: 'auto',
    },
    profileHeaderText: {
      marginLeft: 15,
      paddingBottom: 15,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'gray',
      backgroundColor: 'white',
    },
    signUpText: {
      fontSize: 16,
      color: 'white',
    },
    textInput: {
      backgroundColor: 'white',
      width: 350,
    },
    taskWrapper:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

export default styles;