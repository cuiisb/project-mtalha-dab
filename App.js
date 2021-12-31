import React,{useState,useEffect} from "react"

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./Components/Auth/LandingScreen";
import Register from "./Components/Auth/Register.js"
import Login from "./Components/Auth/Login.js"


import * as firebase from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyB7g5qU4FoCuL8DJ1LXLitLK6PPakCt3cA",
  authDomain: "mad-finalproject.firebaseapp.com",
  projectId: "mad-finalproject",
  storageBucket: "mad-finalproject.appspot.com",
  messagingSenderId: "574701671616",
  appId: "1:574701671616:web:961120a2b264a08b2d4925",
  measurementId: "G-VR344H328T"
};

if(firebase.apps.length === 0){
firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

const App = () => {

const [loaded,setLoaded] = useState(false)
const [loggedIn,setLoggedIn] = useState(false)
  

useEffect(() => {
 firebase.auth().onAuthStateChanged((user)=>{
if(!user){
setLoggedIn(false)
setLoaded(true)
}
else{
  setLoggedIn(true)
  setLoaded(true) 
}
 })
}, [])

if(!loaded){
     return(
       <View>
         <Text>Loading</Text>
       </View>
     )
}
if(!loggedIn){
  return (
  
    <NavigationContainer> 
      <Stack.Navigator >
        <Stack.Screen name="LandingScreen" component={LandingScreen} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
 else{
   return(
     <View>
       <Text>Logged in</Text>
     </View>
   )
 }
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
