import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import ListTasks from "../components/tasks/ListTasks";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Picker } from "@react-native-picker/picker";

import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../colors.json";
import background from "../../assets/BackgroundDoropomo.png";

export default ({ showButton = true, showImage = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTasks, setListTasks] = useState([]);
  const [isNewTask, setIsNewTask] = useState(false);
  const [newTask, setNewTask] = useState({
    id: null,
    title: "",
    weight: null,
    completed: false,
    DayWeek: "",
    timeToDo: 0,
  });

  // Carregar tarefas do AsyncStorage ao montar o componente
  useFocusEffect(
    useCallback(() => {
      // Coloque aqui o que você quer "refrescar" ao entrar na tela
      const loadTasks = async () => {
        try {
          const storedTasks = await AsyncStorage.getItem("tasks");
          if (storedTasks) {
            setListTasks(JSON.parse(storedTasks));
          }
        } catch (e) {
          console.error("Erro ao carregar tarefas:", e);
        }
      };
      loadTasks();
    }, [])
  );

  // Salvar tarefas no AsyncStorage sempre que a lista for alterada
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(listTasks));
      } catch (e) {
        console.error("Erro ao salvar tarefas:", e);
      }
    };
    saveTasks();
  }, [listTasks]);

  const addNewTask = () => {
    if (newTask.title.trim() === "") return; // Evita adicionar tarefas vazias
    const task = {
      id: uuid.v4(), // Gera um novo ID
      title: newTask.title,
      weight: newTask.weight,
      completed: false,
    };
    setListTasks([...listTasks, task]); // Adiciona a nova tarefa à lista
    setNewTask({ title: "", weight: null, DayWeek: "", timeToDo: 0 }); // Limpa o campo de entrada
    setIsNewTask(false); // Volta para a lista de tarefas
    console.log("Tarefa adicionada:", task);
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.container}
      imageStyle={{ opacity: showImage ? 0.7 : 0 }} // Ajusta a opacidade da imagem de fundo
    >
      <SafeAreaView style={styles.container}>
        {isNewTask ? (
          <View style={styles.newTaskContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tarefa"
              value={newTask.title}
              onChangeText={(text) =>
                setNewTask({
                  ...newTask,
                  title: text,
                })
              }
              scrollEnabled={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Peso da tarefa (1 a 4)"
              value={newTask.weight}
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewTask({
                  ...newTask,
                  weight: parseInt(text) || 1,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Tempo para fazer (em minutos)"
              value={newTask.timeToDo}
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewTask({
                  ...newTask,
                  timeToDo: parseInt(text) || 0,
                })
              }
            />
            <View
              style={[
                styles.input,
                {
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  margin: 0,
                },
              ]}
            >
              <Picker
                selectedValue={newTask.DayWeek}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                }}
                onValueChange={(itemValue) => {
                  setNewTask({
                    ...newTask,
                    DayWeek: itemValue,
                  });
                }}
              >
                <Picker.Item label="Selecione o dia da semana" value="" />
                <Picker.Item label="Domingo" value="Domingo" />
                <Picker.Item label="Segunda" value="Segunda" />
                <Picker.Item label="Terça" value="Terça" />
                <Picker.Item label="Quarta" value="Quarta" />
                <Picker.Item label="Quinta" value="Quinta" />
                <Picker.Item label="Sexta" value="Sexta" />
                <Picker.Item label="Sábado" value="Sábado" />
              </Picker>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <TouchableOpacity
                onPress={() => setIsNewTask(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addNewTask} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {showImage && (
              <Image
                source={require("../../assets/doropomoLogo.png")}
                style={{ marginTop: 20, height: 256, width: 256 }} // ajuste os valores conforme desejar
                resizeMode="contain"
              />
            )}
            <ListTasks
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              listTasks={listTasks}
              setListTasks={setListTasks}
              showButton={showButton}
            />
            {showButton && !isEditing && (
              <TouchableOpacity
                onPress={() => {
                  setIsNewTask(true);
                }}
                style={styles.buttonAddTaskContainer}
              >
                <Ionicons name="add-circle" size={92} color="black" />
              </TouchableOpacity>
            )}
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAddTaskContainer: {
    position: "absolute",
    bottom: 20,
    right: -20,
    zIndex: 10,
  },
  newTaskContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: 300,
    backgroundColor: "#ffffffb3",
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
