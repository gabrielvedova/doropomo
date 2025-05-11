import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Timer from "../views/Timer";
import Tasks from "../views/Tasks";
import Home from "../views/Home";
import TabNavi from "./TabNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pomodoro">
        <Stack.Screen
          name="Pomodoro"
          component={TabNavi}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
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
