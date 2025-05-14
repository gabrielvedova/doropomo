import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, ImageBackground } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import { TimerProvider } from "./context/TimerContext";
import background from "../assets/BackgroundDoropomo.png";

export default function App() {
  return (
      /*<ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.container}
      >
      </ImageBackground>*/
    <TimerProvider>
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
