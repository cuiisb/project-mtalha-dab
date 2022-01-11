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

const SearchProfile = ({ navigation, route }) => {
  const [searchUser, setSearchUser] = useState({});
  const [posts, setPosts] = useState([]);

  const { searchData } = route.params;

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
  }, []);

  return (
    <ImageBackground
      source={backHome}
      resizeMode="cover"
      style={styles.imageBg}
    >
      {console.log(searchData.item.picture)}
      <View>
      {typeof searchData.item.picture != false ? (
          <Image
            style={{ width: 150, height: 150, borderRadius: 75 }}
            source={{ uri: searchData.item.picture }}
          />
        ) : (
          <Ionicons name="person-circle-outline" size={32} color="green" />
        )}
        <Text>{searchData.item.userName}'s Posts</Text>
        <View>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={posts}
            renderItem={({ item }) => {
              return (
                <View style={styles.containerImage}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Detail", { itemData: item })
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
