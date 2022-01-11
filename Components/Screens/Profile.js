import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import ProfileMain from './ProfileMain';
import PostDetail from './PostDetail';


const Stack = createStackNavigator();

const Profile = () => {
    return (
            <Stack.Navigator >
                <Stack.Screen name='My Profile'  component={ProfileMain} options={{headerShown:false}}/>
                <Stack.Screen name="Detail" component={PostDetail} options={{headerShown:false}}/>
            </Stack.Navigator>
        
    )
}

export default Profile

const styles = StyleSheet.create({})
