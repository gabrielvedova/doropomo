import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { TimerContext } from "../context/TimerContext";
import Intervals from "../components/timer/Intervals";
import colors from "../colors.json";
import Ionicons from "@expo/vector-icons/Ionicons";

export default ({ showButton = true }) => {
  const { isRunning, setIsRunning } = useContext(TimerContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: showButton && colors.background },
      ]}
    >
      <Intervals isRunning={isRunning} />
      {showButton && (
        <TouchableOpacity onPress={() => setIsRunning(!isRunning)}>
          <Ionicons
            name={isRunning ? "pause-circle" : "play-circle"}
            size={52}
            color="#000"
          />
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
