import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Intervals from "../components/timer/Intervals";

export default (props) => {
  const [isRunning, setIsRunning] = useState(false);
  return (
    <View style={styles.container}>
      <Intervals isRunning={isRunning} />
      <TouchableOpacity
        onPress={() => setIsRunning(!isRunning)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
