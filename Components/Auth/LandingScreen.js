import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Logo from "../../Design/Logo.png";
import BgImage from "../../Design/background.png";

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={BgImage} resizeMode="cover" style={styles.image}>
        <View style={styles.items}>
          <Image style={styles.Logo} source={Logo} />

          <View>
            <View style={styles.itemsText}>
              <Text style={styles.heading}>Welcome to PalCircle</Text>
              <Text style={{ color: "#bababa" }}>
                Connect with your friends and family online
              </Text>
            </View>

            <TouchableOpacity
              style={styles.btnMain}
              onPress={() => navigation.navigate("Register")}
            >
              <Text
                style={{ textAlign: "center", fontWeight: "700", fontSize: 15 }}
              >
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 5, paddingHorizontal: 20 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 15,
                  color: "#00d3d5",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  items: {
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#dedede",
    marginBottom: 5,
  },
  itemsText: {
    alignItems: "center",
  },
  Logo: {
    width: 250,
    height: 47,
  },
  btnMain: {
    marginTop: 20,
    backgroundColor: "#00d3d5",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
});
