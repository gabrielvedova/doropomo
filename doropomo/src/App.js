import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import { TimerProvider } from "./context/TimerContext";
import Tasks from "./views/Tasks";
import Timer from "./views/Timer";

export default function App() {
  return (
    <TimerProvider>
      {/*<Tasks />*/}
      {/*<Timer />*/}
      <StackNavigation />
      <StatusBar style="auto" />
    </TimerProvider>
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
