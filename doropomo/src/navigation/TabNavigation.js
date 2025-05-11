import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../views/Home";
import Tasks from "../views/Tasks";
import Timer from "../views/Timer";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Timer" component={Timer} />
      <Tab.Screen name="Tasks" component={Tasks} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
