import { createContext, useState, useEffect } from "react";


export const ApiContext = createContext({
    userID: "",
    setUserID: () => {},
    namesList: [],
    setNamesList: () => {},
    shoppingList: [],
    setShoppingList: () => {},
    index: 0,
    setIndex: () => {},
    nutritionFacts: {
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
    }
});

export const ApiContextProvider = ({children}) => {
    const[userID, setUserID] = useState();
    const[namesList, setNamesList] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [index, setIndex] = useState();
    const[nutritionFacts, setFacts] = useState({});
    // useEffect(() => {
    //     const getLists = async() => {
    //       try {
    //         const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:5TkTPzrX/lists");
    //         if (response.ok){
    //           const lists = await response.json();
    //           const listNames = [];
    //           const listOfItems = [];
    //           for (let i = 0; i < lists.length; ++i){
    //             listNames.push(lists[i].List_Name);
    //             listOfItems.push([lists[i].item1, lists[i].item2, lists[i].item3, lists[i].item4, lists[i].item5, lists[i].item6, lists[i].item7, lists[i].item8, lists[i].item9, lists[i].item10])
    //           }
    //           setShoppingList(listOfItems);
    //           setNamesList(listNames);
    //           return;
    //         }
    //       } catch(error){ 
    //         console.log(error);
    //       } 
    //     }
    
    //     getLists();
    //   }, []);

    return <ApiContext.Provider value={{namesList, setNamesList, shoppingList, setShoppingList, index, setIndex, nutritionFacts, setFacts, userID, setUserID}}>
        {children}
    </ApiContext.Provider>
}


