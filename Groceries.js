import "react-native-gesture-handler";
import styles from './styles/style'
import { Text, View, Dimensions, SafeAreaView, Button, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import {useState, useEffect, useContext} from 'react';
import { TextInput } from 'react-native-paper';
import { ApiContext } from "../components/Context";

function filterActive(i){
  return !i;
}

export default function Groceries({navigation, route}) {
  const { namesList, setNamesList, shoppingList, setShoppingList, index, setIndex, nutritionFacts, setFacts, userID} = useContext(ApiContext);

  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState();
  const [isActive, setIsActive] = useState(Array(shoppingList[index].length).fill(false));

  useEffect(() => {

  },[]);

  const getNutrition = async() => {
    const apiKey = "QRH2KnDDr1e7g6TkpSck9w==3iTxwXRt9MOAGqrr"
    let query = "";
    for (let i = 0; i < shoppingList[index].length; ++i){
      if (i === shoppingList[index].length-1)
        query += `and ${shoppingList[index][i]}.`;
      else
        query += `${shoppingList[index][i]}, `;
    }
    console.log(query);
    try {
      const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`,{
        method: 'GET',
        headers: { 'X-Api-Key': apiKey},
        contentType: 'application/json',
      });
      if (response.ok){
        const jsonResponse = await response.json();
        let factsObject = {
          calories: 0,
          totalCarbs_g: 0,
          cholesterol_mg: 0,
          saturatedFat_g: 0,
          totalFat_g: 0,
          fiber_g: 0,
          potassium_mg: 0,
          protein_g: 0,
          sodium_mg: 0,
          sugar_g: 0,
          userID: userID,
        };
        for (let i = 0; i < jsonResponse["items"].length; ++i){
          console.log(jsonResponse["items"][i].calories);
          factsObject.calories += Math.floor(jsonResponse["items"][i].calories);
          factsObject.totalCarbs_g += Math.floor(jsonResponse["items"][i].carbohydrates_total_g);
          factsObject.cholesterol_mg += Math.floor(jsonResponse["items"][i].cholesterol_mg);
          factsObject.saturatedFat_g += Math.floor(jsonResponse["items"][i].fat_saturated_g);
          factsObject.totalFat_g += Math.floor(jsonResponse["items"][i].fat_total_g);
          factsObject.fiber_g += Math.floor(jsonResponse["items"][i].fiber_g);
          factsObject.potassium_mg += Math.floor(jsonResponse["items"][i].potassium_mg);
          factsObject.protein_g += Math.floor(jsonResponse["items"][i].protein_g);
          factsObject.sodium_mg += Math.floor(jsonResponse["items"][i].sodium_mg);
          factsObject.sugar_g += Math.floor(jsonResponse["items"][i].sugar_g);
        }
        console.log("facts")
        console.log(factsObject)
        setFacts(factsObject);
      }
    } catch (error){
      console.log(error)
    }
  }

  const sendData = async(list) => {
    let listData = {};
    for (let i = 0; i < list.length; ++i){
      let property = `item${i+1}`
      listData[property] = list[i];
    }
    listData["userID"] = userID;
    console.log(listData);
    try {
      fetch("https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/liststotal", {
        method: "POST",
        body: JSON.stringify(listData),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    } catch (error) {
      console.log(error)
    }
    try {
      fetch("https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/liststotalnutrition", {
        method: "POST",
        body: JSON.stringify(nutritionFacts),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const updateExistingList = async(name, list) => {
    let data = {};
    data.List_Name = name;
    for (let i = 0; i < list.length; ++i){
      let property = `item${i+1}`
      data[property] = list[i];
    }
    data['userID'] = userID;
    console.log(data);
    try {
      const response = fetch(`https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/lists/${name}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
      if (response.ok){
        response = await response.json();
        console.log(response);
      }
    } catch (error) {
      console.log(error)
    }

  }

  function filterList(task){
    for (let i = 0; i < isActive.length; ++i){
      if (shoppingList[index][i] == task && !isActive[i])
        return true;
    }
    return false;
  }

  const setThisList = () => {
    let copyList = [...shoppingList];
    copyList[index].push(task);
    setShoppingList(copyList);
  }
  const setThisFilteredList = (thisList) => {
    let copyList = [...shoppingList];
    copyList[index] = thisList;
    setShoppingList(copyList);
  }

  const handleInput = async() => {
    Keyboard.dismiss();
    if (task == null || shoppingList[index].length >= 10)
      return;
    setThisList();
    setIsActive([...isActive,false]);
    try {
      const repsponse = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/groceryitems', {
        method: "POST",
        body: JSON.stringify({
          item: task,
          list_id: namesList[index],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    } catch (error) {
      console.log(error);
    }
    setTask(null);
  }

  const toggleSelected = (index) => {
    console.log(`index = ${index}`);
    let activeCopy = [...isActive];
    activeCopy[index] = !activeCopy[index];
    setIsActive(activeCopy);
    return;
  }

  const deleteSelected = async() => {
    let filteredList = [...shoppingList];
    let filteredActive = [...isActive];
    for (let i = 0; i < shoppingList.length; ++i){
      if (isActive[i] && shoppingList[i] != ""){
        try {
          const response = fetch('https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/groceryitems/'+shoppingList[i]);
          if (response.ok){
            continue;
          }
        } catch(error){
          console.log(error);
        }
      }
    }
    filteredList = filteredList[index].filter(filterList);
    filteredActive = isActive.filter(filterActive);
    setIsActive(filteredActive);
    setThisFilteredList(filteredList);
  }

 
  const LittleListLeaf = (props) => {
    return (
    <TouchableOpacity onPress={ ()=> toggleSelected(props.index)}>
      <View style={[styles.listLeaf]}>
        <Text style={[styles.listText]}>{props.text}</Text>
        <View style={[styles.checkbox, {backgroundColor: isActive[props.index] ? "gray" : "white"}]} ></View>
      </View>
    </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={[styles.mainContainer]}> 
      <View style={[styles.headerAndList]}>

        <View style={[styles.header]}>
          {edit ? <Text style={styles.backButton} onPress={() => {
            setEdit(!edit);
            updateExistingList(namesList[index], shoppingList[index])}}>Save</Text> : <Text style={styles.backButton} onPress={() => navigation.navigate("Home")}>Back</Text>} 
          <Text style={styles.headerText}>{namesList[index]}</Text>
          {edit ? <Text style={styles.addListItemButton} onPress={() => deleteSelected()}>Delete</Text> : <Text style={styles.backButton} onPress={() => setEdit(!edit)}>Edit</Text>}
        </View>

        <View style={[styles.listContainer]}>
          {
            shoppingList[index].map((task, index)=> {
              if(task == ""){
                <LittleListLeaf key={`leaf${index%10}`} index={index%10} text={task}/>
              }
              return (
                  <LittleListLeaf key={`leaf${index}`} index={index} text={task}/>
              )
            })
          }
        </View>

        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.taskWrapper}>

          <TextInput style={[styles.textInput]} placeholder={'Add to List'} value={task} onChangeText={text => setTask(text)}/> 

          <TouchableOpacity onPress={()=>{handleInput()}}>
            <View style={styles.addWrapper}>
              <Text style={styles.addButton}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        
      </View>
      <Pressable style={styles.nutritionButtonView}onPress={()=> {
                getNutrition();
                sendData(shoppingList[index]);
                navigation.navigate('Stats');}}>
        <Text style={[styles.nutritionButton, styles.nutritionButtonText]} >All Done</Text>
      </Pressable>
    </SafeAreaView>
  );
}


