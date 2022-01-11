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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground source={backHome} resizeMode="cover" style={styles.image}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        multiline
        numberOfLines={4}
          editable
          style={styles.input}
          maxLength={40}
          placeholder="Enter Caption"
          value={caption}
          onChangeText={(caption) => setCaption(caption)}
        />
        <TouchableOpacity onPress={pickImage}>
        <Image source={camera} style={{marginBottom:100}}/>

        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        
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
height:100,
margin:20,
padding:20,
backgroundColor: "white"  }
});
