import React, { useState, useContext, useEffect } from "react";

import { StyleSheet, Text, TouchableOpacity, View ,Image, StatusBar, ImageBackground} from 'react-native'
import UserContext from "../../UserContext.js";
import * as firebase from "firebase"
import LogoWhite from "../../Design/LogoWhite.png";
import backHome from "../../Design/backgroundHome.png";


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
        <ImageBackground source={backHome} resizeMode="cover" style={styles.image}>

<View style={{flex:1}}>
<StatusBar
        animated={true}
        backgroundColor="#dedede"        
        hidden={false} />
        <View style={{ flexDirection:"row", alignItems:"center", marginTop:10}}>
           <Image source={LogoWhite} style={styles.logoWhite}/>
            <View style={{flex:1, flexDirection:"row", marginLeft:100,alignItems:"center"}}>
            <Text style={{color:"#dedede" ,fontSize:17, marginRight:15, alignItems:"center"}}>Hi <Text > {currentUser.userName}</Text></Text>
            <TouchableOpacity style={styles.btnMain} onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
        </ImageBackground>

    )
}

export default Home

const styles = StyleSheet.create({

    btnMain: {
        width: 87,
        height:43,
        backgroundColor: "#00d3d5",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginRight:10        
      },
logoWhite:{
    width: 100,
    height: 19,
    marginLeft:15
},
image: {
    flex: 1,
    justifyContent: "center",
  },
})
