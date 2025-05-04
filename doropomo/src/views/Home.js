import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Doropomo</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Timer")}>
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
};
