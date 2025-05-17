import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { TimerContext } from "../context/TimerContext";
import Intervals from "../components/timer/Intervals";
import colors from "../colors.json";
import Ionicons from "@expo/vector-icons/Ionicons";

export default ({ showButton = true }) => {
  const { isRunning, setIsRunning } = useContext(TimerContext);
  const [nextCurrent, setNextCurrent] = useState("Intervalo Curto");
  console.log("Próximo intervalo: ", nextCurrent);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: showButton && colors.background },
      ]}
    >
      <Intervals
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setNextCurrent={setNextCurrent}
      />
      {showButton && (
        <>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Próximo intervalo:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {nextCurrent}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsRunning(!isRunning)}>
            <Ionicons
              name={isRunning ? "pause-circle" : "play-circle"}
              size={52}
              color="#000"
            />
          </TouchableOpacity>
        </>
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
