import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import UserContext from "../UserContext.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Screens/Home.js";
import Post from "./Screens/Post.js";
import Profile from "./Screens/Profile.js";
import Search from "./Screens/Search.js";
import SearchProfile from "./Screens/SearchProfile.js";
import PostDetail from "./Screens/PostDetail.js";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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
    <UserContext.Provider value={{ currentUser }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#00d3d5",
            tabBarInActiveTintColor: "white",
            tabBarStyle: { backgroundColor: "#181818" },
          }}
          tabBarOptions={{
            
            showLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => (
                <Ionicons name="home-outline" size={25} color={ color } />
              ),
            }}
          />
          <Tab.Screen
            name="Create Post"
            component={Post}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused,color  }) => (
                <Ionicons name="add-circle-outline" color={color} size={28} />
              ),
            }}
          />
          <Tab.Screen
            name="SearchNav"
            component={SearchNav}
            options={{
              headerShown: false,
              title: "Search",
              tabBarIcon: ({ focused ,color}) => (
                <Ionicons name="search-outline" color={color}  size={25} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused,color }) => (
                <Ionicons name="person-outline" color={color}  size={25} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

const SearchNav = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchProfile"
        component={SearchProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: false }}
/>
    </Stack.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
