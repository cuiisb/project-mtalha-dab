import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import UserContext from "../../UserContext.js";

const ProfileMain = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

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
    <View>
      <Text>{currentUser.userName}</Text>
      <Text>My Posts</Text>
      <View>
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
});
