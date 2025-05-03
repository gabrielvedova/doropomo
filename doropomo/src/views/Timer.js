import React from "react";
import { Text, View } from "react-native";
import Stopwatch from "../components/timer/Stopwatch";

export default (props) => {
  return (
    <View>
      <Text>Timer</Text>
      <Stopwatch />
    </View>
  );
};
