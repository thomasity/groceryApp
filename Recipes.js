import "react-native-gesture-handler";
import styles from './styles/style'
import { Text, View, Dimensions, SafeAreaView, Button, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import {useState, useEffect} from 'react';
import { TextInput } from 'react-native-paper';


export default function SearchScreen({navigation}) {
    const[searchQuery, setSearch] = useState();
    const[recipeList, setList] = useState([]);

    const handleInput = async() => {
      let query = `${searchQuery}`
      console.log(searchQuery);
      try {
        const response = await fetch('https://api.calorieninjas.com/v1/recipe?query=' + query, {
        method: 'GET',
        headers: { 'X-Api-Key': 'QRH2KnDDr1e7g6TkpSck9w==3iTxwXRt9MOAGqrr'},
        contentType: 'application/json',
        });
        if (response.ok){
          let jsonResponse = await response.json();
          console.log(jsonResponse)
        }
        throw new Error(`${response.status} ${response.statusText}`);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }

    const toggleSelected = (index) => {
        console.log(`index = ${index}`);
        let activeCopy = [...isActive];
        activeCopy[index] = !activeCopy[index];
        setIsActive(activeCopy);
        return;
      }


    const ListLeaf = (props) => {
        return (
        <TouchableOpacity onPress={()=>{toggleSelected(props.index)}}>
          <View style={[styles.listLeaf]}>
            <Text style={[styles.listText]}>{props.text}</Text>
            <View style={[styles.checkbox, {backgroundColor: isActive[props.index] ? "gray" : "white"}]} ></View>
          </View>
        </TouchableOpacity>
        )
      }

    return (
        <SafeAreaView style={[styles.mainContainer]}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.taskWrapper}>

              <TextInput style={[styles.textInput]} placeholder={'Search for Recipes...'} value={searchQuery} onChangeText={text => setSearch(text)}/> 

              <TouchableOpacity onPress={()=>handleInput()}>
                  <View style={styles.addWrapper}>
                  <Text style={styles.addButton}>Search</Text>
                  </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>

            <View style={[styles.listContainer]}>
            {
                recipeList.map((list, index)=> {
                return (
                    <ListLeaf key={`leaf${index}`} index={index} text={list}/>
                )
                })
            }
            </View>
        </SafeAreaView>
      );
}