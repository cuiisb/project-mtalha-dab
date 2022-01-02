import firebase from "firebase"
import 'firebase/firestore';

import {USER_STATE_CHANGE} from "../constants/index.js"

export default function fetchUser(){
    return((dispatch)=>{
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot)=>{
if(snapshot.exists){
    console.log(snapshot.data())
    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
}
else{
    console.log("Snapshot doesnot exist")
}
        })
    })
}