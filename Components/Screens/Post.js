import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import "firebase/firestore";
import UserContext from "../../UserContext.js";
import backHome from "../../Design/backgroundHome.png";
import camera from "../../Design/camera.png";

const Post = ({ navigation }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const [date, setDate] = useState(new Date());
  const { currentUser } = useContext(UserContext);

  const addPost = async () => {
    try {
      await firebase
        .firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
          caption,
          image,
          date,
        })
        .then(() => {
          Alert.alert("Post Added", "", [
            { text: "OK", onPress: () => console.log("OK Press") },
          ]);
          navigation.navigate("Home");
          setImage(null);
          setCaption(null);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground source={backHome} resizeMode="cover" style={styles.image}>
        <Text style={{ fontSize:25,marginTop:20,marginLeft:20, color:"white", }}>Create Post</Text>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{backgroundColor: 'rgba(255, 255, 255,0.05)', width:350, alignItems:"center",paddingVertical:20}}>
      <TextInput
        multiline={true}
          style={styles.input}
          placeholder="Enter Caption"
          value={caption}
          placeholderTextColor={"#adadad"}
          onChangeText={(caption) => setCaption(caption)}
        />
        <TouchableOpacity style={{marginBottom:10}} onPress={pickImage}>

<Text style={{fontSize:15, color:"white",textDecorationLine: 'underline'}}>Choose Image</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />
        )}

        
        </View>
        <TouchableOpacity style={styles.btnMain} onPress={addPost}>
          <Text>Create Post </Text>
        </TouchableOpacity>
      </View>
     
    </ImageBackground>
  );
};

export default Post;

const styles = StyleSheet.create({
  btnMain: {
    marginTop: 20,
    backgroundColor: "#00d3d5",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input:{
    width:300,
    height:100,
    borderColor: "#00797a",
  borderWidth:1,
  borderRadius:5,
color:"white",
marginBottom:20,
padding:5
}
});
