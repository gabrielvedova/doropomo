import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { TimerContext } from "../context/TimerContext";
import Intervals from "../components/timer/Intervals";
import colors from "../colors.json";

export default ({ showButton = true }) => {
  const { isRunning, setIsRunning } = useContext(TimerContext);

  return (
    <View style={styles.container}>
      <Intervals isRunning={isRunning} />
      {showButton && (
        <TouchableOpacity
          onPress={() => setIsRunning(!isRunning)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
