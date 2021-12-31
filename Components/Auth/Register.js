import React ,{useState}from 'react'
import firebase from "firebase"

import {StyleSheet, View, Text , TextInput,TouchableOpacity } from 'react-native'

const Register = () => {
    const [email,setEmail] = useState("")
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")

const onRegister = () =>{
firebase.auth().createUserWithEmailAndPassword(email, password)
.then((result)=>{
    console.log(result)
})
.catch((error)=>{
    console.log(error)
})
}

    return (
        <View>
        <TextInput placeholder='userName' onChangeText={(name)=>setUserName(name)}/>
        <TextInput placeholder='email' onChangeText={(email)=>setEmail(email)}/>
        <TextInput placeholder='password' secureTextEntry={true} onChangeText={(password)=>setPassword(password)}/>

<TouchableOpacity style={styles.btnMain} onPress={onRegister}>
    <Text>Register</Text>
</TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnMain: {
        marginTop: 20,
        backgroundColor: "#00d3d5",
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 30,
      },
})

export default Register
