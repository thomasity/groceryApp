import "react-native-gesture-handler";
import styles from './styles/style'
import { Text, View, Dimensions, SafeAreaView, Button, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import {useContext, useEffect, useState} from 'react';
import { TextInput } from 'react-native-paper';
import { ApiContext } from "../components/Context";



function filterActive(i){ 
  return i == false;
}

export default function ListHome({navigation, route}) {
  const { namesList, setNamesList, shoppingList, setShoppingList, index, setIndex, userID} = useContext(ApiContext);
  const [task, setTask] = useState();
  const [edit, setEdit] = useState(false);
  const [isActive, setIsActive] = useState(Array(namesList.length).fill(false));
  useEffect(() => {
    const getLists = async() => {
      try {
        const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/lists");
        if (response.ok){
          const lists = await response.json();
          const listNames = [];
          const listOfItems = [];
          console.log(lists);
          for (let i = 0; i < lists.length; ++i){
            if (lists[i]["userID"] == userID){
              listNames.push(lists[i].List_Name);
              listOfItems.push([lists[i].item1, lists[i].item2, lists[i].item3, lists[i].item4, lists[i].item5, lists[i].item6, lists[i].item7, lists[i].item8, lists[i].item9, lists[i].item10])
            }
          }
          setShoppingList(listOfItems);
          setNamesList(listNames);
          return;
        }
      } catch(error){ 
        console.log(error);
      } 
    }
    setIndex(0)
    getLists();
  }, []);


  const postNewList = async(name) => {
    try {
      fetch("https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/lists", {
        method: "POST",
        body: JSON.stringify({
          List_Name: name,
          userID: userID,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const deleteList = async(name) => {
    try {
      const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/lists/${name}`, {
        method: "DELETE",
        body: JSON.stringify({
          List_Name: name,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      if (response.ok){
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }


  function filterList(task){
    for (let i = 0; i < isActive.length; ++i){
      if (namesList[i] == task && !isActive[i])
        return true;
    }
    return false;
  }

  const doneFunc = () => { 
    setEdit(!edit)
    for (let i = 0; i < isActive.length; ++i){
      if (isActive[i]){
        isActive[i] = !isActive[i];
      }
    }
  }
  
  const handleInput = () => {
    Keyboard.dismiss();
    if (task == null)
    return;
  postNewList(task);
  setNamesList([...namesList, task]);
  setIsActive([...isActive,false]);
  setShoppingList([...shoppingList, []])
  setTask(null);
}

const toggleSelected = (index) => {
  console.log(`index = ${index}`);
  let activeCopy = [...isActive];
  activeCopy[index] = !activeCopy[index];
  setIsActive(activeCopy);
  return;
}

const deleteSelected = () => {
    let filteredList = [...namesList];
    let filteredActive = [...isActive];
    filteredList = filteredList.filter(filterList);
    filteredActive = filteredActive.filter(filterActive);
    for (let i = 0; i < isActive.length; ++i){
      if (isActive[i]){
        deleteList(namesList[i])
      }
    }
    setIsActive(filteredActive);
    setNamesList(filteredList);
  }

  
    const ListLeaf = (props) => {
      return (
      <TouchableOpacity onPress={()=>{
                          if (edit){
                            toggleSelected(props.index)
                           }
                          else {
                            setIndex(props.index);
                            navigation.navigate('TabGroup', {screen: 'List'});
                          }
                        }}>
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
            <TouchableOpacity onPress={()=>{handleInput()}}>
                {edit ? <Text style={styles.subHeaderText} onPress={() => doneFunc()}>Done</Text> : <Text style={styles.subHeaderText} onPress={() => setEdit(!edit)}>Edit</Text>}
            </TouchableOpacity>
            {edit ? <Text style={styles.headerText}>Editing</Text> : <Text style={styles.headerText}>Lists</Text>}
            <TouchableOpacity onPress={()=>{handleInput()}}>
                {edit ? <Text style={styles.subHeaderText} onPress={() => deleteSelected()}>Delete</Text> : null} 
            </TouchableOpacity>
        </View>

        <View style={[styles.listContainer]}>
          {
            namesList.map((list, index)=> {
              return (
                  <ListLeaf key={`leaf${index}`} index={index} text={list}/>
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
    </SafeAreaView>
  );
}


