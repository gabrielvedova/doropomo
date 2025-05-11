import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import ListTasks from "../components/tasks/ListTasks";

export default (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ListTasks />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
