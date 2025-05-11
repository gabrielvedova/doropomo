import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Tasks from "./Tasks";
import Timer from "./Timer";
import colors from "../colors.json";

export default (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ color: colors.text }}>Media Player</Text>
        <Text>Home</Text>
      </View>
      <View style={styles.pomodoroContainer}>
        <TouchableOpacity style={styles.pomodoroItem}>
          <Tasks showButton={false} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pomodoroItem}>
          <Timer />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Relatory</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  pomodoroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "30%",
    padding: 20,
  },
  pomodoroItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C4C0C0",
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
});
