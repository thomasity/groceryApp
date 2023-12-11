import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groceries from '../screens/Groceries'
import Statistics from '../screens/Statistics'
import Recipes from '../screens/Recipes'
import Profile from '../screens/Profile'
import ListHome from "../screens/listsHome";
import SearchScreen from "../screens/search";
import LoginScreen from "../screens/Login";
import { Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabGroup() {
    return (
        <Tab.Navigator
        initialRouteName="List"
        screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="List" component={Groceries}
            options={{tabBarIcon: () => <Entypo name="list" size={24} color="black" />}}/>
            <Tab.Screen name="Stats" component={Statistics}
            options={{tabBarIcon: () => <Ionicons name="stats-chart-outline" size={24} color="black" />}}/>
            <Tab.Screen name="Profile" component={Profile}
            options={{tabBarIcon: () => <MaterialCommunityIcons name="account-settings-outline" size={24} color="black" />}}/>
        </Tab.Navigator>
    )
}

function HomeStackGroup() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name="Home" component={ListHome} options={{headerShown: false}}/>
            <HomeStack.Screen name="TabGroup" component={TabGroup} options={{headerShown: false}}/>
        </HomeStack.Navigator>
    )
}


{/* <Tab.Screen name="Recipes" component={Recipes}
options={{tabBarIcon: () => <MaterialIcons name="kitchen" size={24} color="black" />}}/> */}

export default function Navigation() {
    return (
        <NavigationContainer>
            <HomeStackGroup/>
        </NavigationContainer>
    )
}

