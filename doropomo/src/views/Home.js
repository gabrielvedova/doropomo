import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Tasks from "./Tasks";
import Timer from "./Timer";
import colors from "../colors.json";

export default (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Timer showButton={false}/>
      <Tasks showButton={false} showImage={false}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
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
