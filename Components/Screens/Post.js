import React,{useState,useContext} from 'react'
import { StyleSheet, Text,TextInput, View,TouchableOpacity,Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase"
import 'firebase/firestore';
import UserContext from "../../UserContext.js";


const Post = ({navigation}) => {

    const [caption , setCaption] = useState("")
    const [image , setImage] = useState(null)

const [date,setDate] = useState(new Date())
const { currentUser } = useContext(UserContext);

const addPost = async () =>{
try{
   await firebase.firestore().collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .add({ 
        caption,
        image,
        date
    })
    .then(
        ()=>{
            Alert.alert(
                "Post Added",
                "",
                [{ text: "OK", onPress: () => console.log("OK Press")}]
              );
            navigation.navigate("Home")
setImage(null)
setCaption(null)
        }
    )
} catch (err){
    console.log(err);
  }
}

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       
       <TouchableOpacity onPress={pickImage} >
           <Text>Pick an image from camera roll </Text>
       </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <TextInput placeholder='Enter Caption' value={caption} onChangeText={(caption)=>setCaption(caption)}/>
        <TouchableOpacity style={styles.btnMain} onPress={addPost} >
           <Text>Create Post </Text>
       </TouchableOpacity>
      </View>
    )
}

export default Post

const styles = StyleSheet.create({

    btnMain: {
        marginTop: 20,
        backgroundColor: "#00d3d5",
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 30,
      },
})
