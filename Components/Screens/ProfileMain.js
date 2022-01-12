import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import UserContext from "../../UserContext.js";
import backHome from "../../Design/backgroundHome.png";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";


const ProfileMain = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
const [picture,setPicture] = useState(currentUser.picture)
const changePic=async()=>{

 await firebase
  .firestore()
  .collection("users")
 .doc(firebase.auth().currentUser.uid)
  .update({
    picture: picture
  })
  .then(() => {
    console.log("Added");
  });

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
    setPicture(result.uri);
    changePic()
  }
};

  const getPosts = async () => {
    try {
      await firebase
        .firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("date", "asc")
        .get()
        .then((snapshot) => {
          let allPosts = snapshot.docs.map((doc) => {
            const data = doc.data();

            const id = doc.id;
            return { id, ...data };
          });
          setPosts(allPosts);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ImageBackground source={backHome} resizeMode="cover" style={styles.imageBg}>

    <View style={{marginTop: 20, marginHorizontal:10}}>
        
    <Text style={{fontSize:25, color:"white", }}>My Profile</Text>
      <View style={{flexDirection:"row", alignItems:"center"}}>
      {typeof picture === "boolean"?
        <Ionicons style={{marginTop:20}} name="person-circle-outline" size={130} color="#d9d9d9" />
      :<Image style={{marginTop:20, width: 130, height: 130,borderRadius: 75}} source={{uri: picture}}/>
}

<TouchableOpacity style={{marginLeft:20}} onPress={pickImage}>
<Ionicons name="create-outline" size={30} color="#00d3d5"  />

</TouchableOpacity>
      </View>
<Text style={{color:"white", fontSize:18, marginTop:25}}>Posts</Text>
      <View style={{marginTop:10}}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerImage}>
                <TouchableOpacity onPress={()=>navigation.navigate("Detail",{itemData:item})}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
    </ImageBackground>

  );
};

export default ProfileMain;

const styles = StyleSheet.create({
  containerGallary: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },

  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    marginHorizontal: 1,
    marginVertical: 1,
  },

  imageBg: {
    flex:1
  },
});
