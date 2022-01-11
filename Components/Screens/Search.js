import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList,TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
import backHome from "../../Design/backgroundHome.png";

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
    <ImageBackground
      source={backHome}
      resizeMode="cover"
      style={styles.imageBg}
    >
    <View style={{marginTop: 20, marginHorizontal:10}}>
    <Text style={{fontSize:25,marginBottom:20, color:"white", }}>Search Users</Text>

      <TextInput
      placeholder="Search People"
      placeholderTextColor={"#adadad"}
        style={styles.input}
        onChangeText={(search) => searchUsers(search)}
      />
      <FlatList
      style={{marginTop:20}}
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={(oneUser) => {
          return (
         <View>
              {oneUser.item.id == firebase.auth().currentUser.uid ?null:<TouchableOpacity onPress={()=>navigation.navigate("SearchProfile",{searchData:oneUser})}
           style={styles.searchItem}>
{typeof picture === "boolean"?
(<Ionicons name="person-circle-outline" size={40} color="green" />
)
:(<Image source={{ uri:oneUser.item.picture}} height={40} width={40} borderRadius= {40}/>)
}


              <Text style={{color:"white", marginLeft:20, fontSize:18}}>{oneUser.item.userName}</Text>
          </TouchableOpacity>}
         </View>
          );
        }}
      />
    </View>
    </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({

  imageBg: {
    flex: 1,
  },
  input:{
    paddingHorizontal:10,
    paddingVertical: 10,
    color:"white",
    backgroundColor: "#010101",
    borderRadius: 10,
    fontSize:16
  },
  searchItem:{
    flex:1,
     flexDirection:"row",
      alignItems:"center", 
      backgroundColor: 'rgba(255, 255, 255,0.05)',
      paddingVertical: 10,
      paddingHorizontal:15
  }
});
