import "react-native-gesture-handler";
import styles from './styles/style'
import { Text, View, useWindowDimensions, SafeAreaView, Button, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Pressable, ScrollView } from 'react-native';
import {useState, useEffect, useContext} from 'react';
import { TextInput } from 'react-native-paper';
import { ApiContext } from "../components/Context";
import { PieChart, LineChart } from "react-native-chart-kit";



export default function Statistics({navigation, route}) {
  const {height, width} = useWindowDimensions();
  const { namesList, setNamesList, shoppingList, setShoppingList, index, setIndex, nutritionFacts, setFacts, userID} = useContext(ApiContext);
  const[checked, setChecked] = useState(false);
  const[loaded, setload] = useState(false);
  const[macroRatio, setRatio] = useState({carbRatio: 0, fatRatio: 0, proteinRatio: 0,});
  const[avgCarbs, setAvgCarbs] = useState([]);
  const[avgFat, setAvgFat] = useState([]);
  const[avgProtein, setAvgProtein] = useState([]);
  
  const getAvgNutrition = async() => {
    const carbs = [];
    const fat = [];
    const protein = [];
    try{
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/liststotalnutrition');
      if (response.ok){
        const jsonResponse = await response.json();
        console.log(`avg data: ${jsonResponse}`);
        for (let i = 0; i < jsonResponse.length; ++i){
          if (jsonResponse[i]['totalCarbs_g'] && jsonResponse[i]['userID'] == userID){
            carbs.push(jsonResponse[i]['totalCarbs_g']);
            fat.push(jsonResponse[i]['totalFat_g']);
            protein.push(jsonResponse[i]['protein_g']);
          }
        }
        setAvgCarbs(carbs);
        setAvgFat(fat);
        setAvgProtein(protein);
        setload(true);
      }
      } catch (error){
        console.log(error);
      }
  }

  const getNutrition = async() => {
    const app_key = 'QRH2KnDDr1e7g6TkpSck9w==3iTxwXRt9MOAGqrr';
    console.log(userID);
    let query = "";
    for (let i = 0; i < shoppingList[index].length; ++i){
      if (i === shoppingList[index].length-1)
        query += `and ${shoppingList[index][i]}.`;
      else
        query += `${shoppingList[index][i]}, `;
    }
    console.log(`query: ${query}`);
    try {
      const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {headers:{'X-Api-Key': app_key}});
      if (response.ok){
        const jsonResponse = await response.json();
        console.log(jsonResponse);
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
        console.log(factsObject);
        let totalMac = factsObject.totalCarbs_g + factsObject.totalFat_g + factsObject.protein_g;
        let ratio = {
          carbRatio: 0,
          fatRatio: 0,
          proteinRatio: 0,
        }
        ratio.carbRatio = factsObject.totalCarbs_g/totalMac;
        ratio.fatRatio = factsObject.totalFat_g/totalMac;
        ratio.proteinRatio = factsObject.protein_g/totalMac;
        setRatio(ratio);
        setFacts(factsObject);
      }
    } catch (error){
      console.log(error)
    }
  }

  const NutritionBlock = () => {
    return (
      <View style={styles.nutritionDataBox}>
        <Text style={styles.nutritionText}>Calories: {nutritionFacts.calories}</Text>
        <Text style={styles.nutritionText}>Carbs: {nutritionFacts.totalCarbs_g}g</Text>
        <Text style={styles.nutritionText}>Fat: {nutritionFacts.totalFat_g}g</Text>
        <Text style={styles.nutritionText}>Saturated Fat: {nutritionFacts.saturatedFat_g}g</Text>
        <Text style={styles.nutritionText}>Protein: {nutritionFacts.protein_g}g</Text>
        <Text style={styles.nutritionText}>Sugar: {nutritionFacts.sugar_g}g</Text>
        <Text style={styles.nutritionText}>Fiber: {nutritionFacts.fiber_g}g</Text>
        <Text style={styles.nutritionText}>Sodium: {nutritionFacts.sodium_mg}mg</Text>
        <Text style={styles.nutritionText}>Cholesterol: {nutritionFacts.cholesterol_mg}mg</Text>
        <Text style={styles.nutritionText}>Potassium: {nutritionFacts.potassium_mg}mg</Text>
      </View>
    )
  }
  const ratioData = [
    {
      name: "Carbs",
      population: Math.floor(macroRatio.carbRatio * 100),
      color: "red",
      legendFontColor: "black",
      legendFontSize: 15,
    },
    {
      name: "Fat",
      population: Math.floor(macroRatio.fatRatio * 100),
      color: "yellow",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Protein",
      population: Math.floor(macroRatio.proteinRatio * 100),
      color: "blue",
      legendFontColor: "black",
      legendFontSize: 15
    },
  ];

const avgCarbData = {
  datasets: [
    {
      data: avgCarbs,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Tracked Carbs"] // optional
}

const avgFatData = {
  datasets: [
    {
      data: avgFat,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Tracked Fat"] // optional
}

const avgProteinData = {
  datasets: [
    {
      data: avgProtein,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Tracked Protein"] // optional
}
  return (
    <SafeAreaView style={[styles.mainContainer]}>
        <View style={[styles.header]}>
          <Text style={styles.headerText}>Shopping Stats</Text>
        </View>
      <ScrollView styles={[styles.nutritionDataBox]}>
        {loaded ? <NutritionBlock/> : null }
        {loaded ? <PieChart
          data={ratioData}
          width={"100%"}
          height={220} 
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[300, 0]}
          absolute
        /> : null }
        {loaded ?
        <View>
          <LineChart
            data={avgCarbData}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
          />
          <LineChart
            data={avgFatData}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
          />
          <LineChart
            data={avgProteinData}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
          />
        </View>
        : null}
      </ScrollView>

        <Pressable style={styles.nutritionButtonView}onPress={()=> {
                  setChecked(true);
                  getNutrition();
                  getAvgNutrition();}} 
                  title='Calculate Nutrition'>
          {checked ? <Text style={[styles.nutritionButton, styles.nutritionButtonText]}>Update Nutrition</Text> : <Text style={[styles.nutritionButton, styles.nutritionButtonText]}>Calculate Nutrition</Text>}
        </Pressable>

    </SafeAreaView>
  );
}

