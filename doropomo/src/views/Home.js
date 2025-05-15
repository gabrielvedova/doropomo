import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Tasks from "./Tasks";
import Timer from "./Timer";
import colors from "../colors.json";
import background from "../../assets/BackgroundDoropomo.png";

export default (props) => {
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
      imageStyle={{ opacity: 0.5 }}
    >
      <SafeAreaView style={styles.container}>
        <Timer showButton={false} />
        <Tasks showButton={false} showImage={false} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingTop: 40,
  },
  pomodoroItem: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
});
