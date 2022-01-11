import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList,TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

const Search = ({navigation}) => {
  const [users, setUsers] = useState();

  const searchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("userName", "==", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
 
        setUsers(users);
      });
  };

  return (
    <View>
      <TextInput
      placeholder="Search People"
        style={styles.input}
        onChangeText={(search) => searchUsers(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={(oneUser) => {
          return (
         <View>
              {oneUser.item.id == firebase.auth().currentUser.uid ?null:<TouchableOpacity onPress={()=>navigation.navigate("SearchProfile",{searchData:oneUser})}
           style={{flex:1, flexDirection:"row", alignItems:"center"}}>
{oneUser.item.picture?
<Image source={oneUser.item.picture}/>:
<Ionicons name="person-circle-outline" size={32} color="green" />
}
              <Text>{oneUser.item.userName}</Text>
          </TouchableOpacity>}
         </View>
          );
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
