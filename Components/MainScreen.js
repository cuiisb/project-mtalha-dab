import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import UserContext from "../UserContext.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Screens/Home.js";
import Post from "./Screens/Post.js";
import Profile from "./Screens/Profile.js";
import { NavigationContainer, StackActions } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MainScreen = () => {
  const [currentUser, setCurrentUser] = useState({});

  const getUserData = async () => {
    try {
      const documentSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();

      const userData = documentSnapshot.data();
      setCurrentUser(userData);
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{currentUser}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Create Post" component={Post} />
          <Tab.Screen name="ProfileHandle" component={Profile} options={{headerShown: false}} />

        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
