import React, { useState, useContext, useEffect } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import UserContext from "../../UserContext.js";
import * as firebase from "firebase"
import { getAuth, signOut } from "firebase/auth";


const Home = () => {

    const { currentUser } = useContext(UserContext);

    const logout = () =>{
        
        firebase.auth().signOut().then(() => {
console.log("Logged Out");         
 }).catch((error) => {
    console.log("Error Logging out");         
});
    }

    return (
        <View style={{flex:1, flexDirection:"row", justifyContent:"flex-end"}}>
            <Text style={{fontSize:18, marginRight:15,marginTop:12, alignItems:"center"}}>Hi <Text style={{fontWeight:"bold"}}> {currentUser.userName}</Text></Text>
            <TouchableOpacity style={styles.btnMain} onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    btnMain: {
        width: 87,
        height:50,
        backgroundColor: "#00d3d5",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginRight:10        
      },

})
