import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import Tasks from "./views/Tasks";
import Timer from "./views/Timer";

export default function App() {
  return (
    <>
      {/*<Tasks />*/}
      {/*<Timer />*/}
      <StackNavigation />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
