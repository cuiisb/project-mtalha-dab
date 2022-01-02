import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import ProfileMain from './ProfileMain';
import PostDetail from './PostDetail';


const Stack = createStackNavigator();

const Profile = () => {
    return (
            <Stack.Navigator >
                <Stack.Screen name='Profile'  component={ProfileMain}/>
                <Stack.Screen name="Detail" component={PostDetail}/>
            </Stack.Navigator>
        
    )
}

export default Profile

const styles = StyleSheet.create({})
