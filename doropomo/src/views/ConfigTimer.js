import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default ({ navigation }) => {
  const [Pomodoro, setPomodoro] = useState({
    duration: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    qntdPomodoros: 4,
    cycles: 2,
  });

  return (
    <View style={styles.container}>
      <Text>Doropomo</Text>
      <Text>Configuração</Text>
      <TextInput
        placeholder="Pomodoro Duration (minutes)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPomodoro({ ...Pomodoro, duration: parseInt(text) * 60 })
        }
      />
      <TextInput
        placeholder="Short Break Duration (minutes)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPomodoro({ ...Pomodoro, shortBreak: parseInt(text) * 60 })
        }
      />
      <TextInput
        placeholder="Long Break Duration (minutes)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPomodoro({ ...Pomodoro, longBreak: parseInt(text) * 60 })
        }
      />
      <TextInput
        placeholder="Number of Pomodoros for Cycle"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPomodoro({ ...Pomodoro, qntdPomodoros: parseInt(text) })
        }
      />
      <TextInput
        placeholder="Number of Cycles"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPomodoro({ ...Pomodoro, cycles: parseInt(text) })
        }
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Timer", { Pomodoro })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    width: "100%",
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
  },
  input: {
    height: "auto",
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
