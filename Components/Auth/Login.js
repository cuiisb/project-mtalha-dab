import React, { useState } from "react";
import firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import BgImage from "../../Design/background.png";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground source={BgImage} resizeMode="cover" style={styles.image}>
      <StatusBar animated={true} backgroundColor="#dedede" hidden={false} />
      <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
        <Text
          style={{ color: "#00d3d5", fontSize: 18 }}
          onPress={() => navigation.navigate("LandingScreen")}
        >
          Back
        </Text>
        <Text style={{ color: "#dedede", fontSize: 20, marginLeft: 105 }}>
          Log In
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={{ color: "#dedede", fontSize: 20, textAlign: "center" }}>
          WELCOME BACK
        </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#adadad"}
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"#adadad"}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity style={styles.btnMain} onPress={onLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  btnMain: {
    marginTop: 20,
    backgroundColor: "#00d3d5",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#00d3d5",
    padding: 10,
    color:"#f7f7f7"
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
