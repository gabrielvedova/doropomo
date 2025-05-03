import React from "react";
import { Text, View } from "react-native";
import Stopwatch from "../components/timer/Stopwatch";
import Intervals from "../components/timer/Intervals";

export default (props) => {
  return (
    <View>
      <Text>Timer</Text>
      <Intervals />
    </View>
  );
};
