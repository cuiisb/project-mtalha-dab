import React,{useState} from 'react'
import firebase from "firebase"
import {StyleSheet, View, Text , TextInput,TouchableOpacity } from 'react-native'

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

const onLogin = () =>{
firebase.auth().signInWithEmailAndPassword(email, password)
.then((result)=>{
    console.log(result)
})
.catch((error)=>{
    console.log(error)
})
}

    return (
        <View>
        <TextInput placeholder='email' onChangeText={(email)=>setEmail(email)}/>
        <TextInput placeholder='password' secureTextEntry={true} onChangeText={(password)=>setPassword(password)}/>

<TouchableOpacity style={styles.btnMain} onPress={onLogin}>
    <Text>Login</Text>
</TouchableOpacity>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({

    btnMain: {
        marginTop: 20,
        backgroundColor: "#00d3d5",
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 30,
      },
})
