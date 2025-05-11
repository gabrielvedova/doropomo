import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigTimer from "../views/ConfigTimer";
import Timer from "../views/Timer";
import Tasks from "../views/Tasks";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Config">
        <Stack.Screen
          name="Config"
          component={ConfigTimer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Timer"
          component={Timer}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Tasks"
          component={Tasks}
          options={{ headerTitle: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
