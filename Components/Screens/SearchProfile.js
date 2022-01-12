import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import backHome from "../../Design/backgroundHome.png";
import * as firebase from "firebase";
import "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';


const SearchProfile = ({ navigation, route }) => {
  const { searchData } = route.params;


  const [searchUser, setSearchUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [following,setFollowing] = useState(false)


const checkFollow=()=>{

  firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(searchData.item.id).
      then((snapshot)=>{
        console.log(snapshot);
setFollowing(true)
      })
}


const follow =async()=>{
  setFollowing(!following)

  try {
    await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(searchData.item.id)
      .set({})
     
      .then(() => {
        console.log("Followed");
        
      });
  } catch (err) {
    console.log(err);
  }  
}

const unfollow =async()=>{
  setFollowing(!following)

  try {
    await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(searchData.item.id)
      .delete()
     
      .then(() => {
        console.log("unfollowed");
        
      });
  } catch (err) {
    console.log(err);
  }  
}


  const getPosts = () => {
    try {
      firebase
        .firestore()
        .collection("posts")
        .doc(searchData.item.id)
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
  useEffect(async () => {
    getPosts();
    checkFollow()

  }, []);

  return (
    <ImageBackground
      source={backHome}
      resizeMode="cover"
      style={styles.imageBg}
    >
<Ionicons name="arrow-back-outline" size={40} 
    color={"#00d3d5"} style={{marginTop:10,marginLeft:10}}
    onPress={() => navigation.goBack()} />
    <View style={{marginTop: 20, marginHorizontal:10}}>

    <Text style={{fontSize:25,marginTop:-10,marginBottom:20, color:"white", }}>{searchData.item.userName}'s Profile</Text>

      <View>
      <View style={{flexDirection:"row", alignItems:"center"}}>
      {typeof searchData.item.picture  === "boolean" ? (
        <Ionicons name="person-circle-outline" size={130} color="#d9d9d9" />
          
        ) : (
          <Image
            style={{ width: 150, height: 150, borderRadius: 75 }}
            source={{ uri: searchData.item.picture }}
          />   
        )}

{following?
  <TouchableOpacity onPress={()=>unfollow()}>
<Text style={{color:"#00d3d5", fontSize:17, marginLeft:20}}>Unfollow</Text>

</TouchableOpacity>
:
<TouchableOpacity onPress={()=>follow()}>
<Text style={{color:"#00d3d5", fontSize:17, marginLeft:20}}>Follow</Text>

</TouchableOpacity>}


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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PostDetail", { itemData: item })
                    }
                  >
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
      </View>
    </ImageBackground>
  );
};

export default SearchProfile;

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
    flex: 1,
  },
});
