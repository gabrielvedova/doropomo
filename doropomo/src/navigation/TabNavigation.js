import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../views/Home";
import Tasks from "../views/Tasks";
import Timer from "../views/Timer";
import PlayerMusic from "../views/PlayerMusic";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../colors.json";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={34} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="timer" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="task" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
