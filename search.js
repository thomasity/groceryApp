import "react-native-gesture-handler";
import styles from './styles/style'
import { Text, View, Dimensions, SafeAreaView, Button, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import {useState, useEffect} from 'react';
import { TextInput } from 'react-native-paper';


export default function SearchScreen({navigation}) {
    const[searchQuery, setSearch] = useState();
    const[groceryList, setList] = useState([]);

    const handleInput = async() => {
        console.log("searching...");
        const groceryKey = "&apiKey=22d9e4974ed94351b264a7b186ee1bc8";
        const groceryURL = "https://api.spoonacular.com/food/products/search";
        const groceryParams = `search?query=${searchQuery}&number=15`
        try {
            console.log(`${groceryURL}${groceryParams}${groceryKey}`)
            const response = await fetch(`${groceryURL}${groceryParams}${groceryKey}`)
            if (response.ok){
                const dataToList = await response.json();
                console.log(`DatatoList: ${dataToList}`);
                setList(dataToList);
                return;
            }
        } catch(error){
            console.log(error);
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

            <TextInput style={[styles.textInput]} placeholder={'Search for Groceries...'} value={searchQuery} onChangeText={text => setSearch(text)}/> 

            <TouchableOpacity onPress={()=>{handleInput()}}>
                <View style={styles.addWrapper}>
                <Text style={styles.addButton}>Search</Text>
                </View>
            </TouchableOpacity>
            </KeyboardAvoidingView>

            <View style={[styles.listContainer]}>
            {
                groceryList.map((list, index)=> {
                return (
                    <ListLeaf key={`leaf${index}`} index={index} text={list}/>
                )
                })
            }
            </View>
        </SafeAreaView>
      );
}