import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import ListTasks from "../components/tasks/ListTasks";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../colors.json";

export default ({ showButton = true, showImage= true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTasks, setListTasks] = useState([]);
  const [isNewTask, setIsNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Carregar tarefas do AsyncStorage ao montar o componente
  useEffect(() => {
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
  }, []);

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
    if (newTaskTitle.trim() === "") return; // Evita adicionar tarefas vazias
    const newTask = {
      id: uuid.v4(), // Gera um novo ID
      title: newTaskTitle,
      completed: false,
    };
    setListTasks([...listTasks, newTask]); // Adiciona a nova tarefa à lista
    setNewTaskTitle(""); // Limpa o campo de entrada
    setIsNewTask(false); // Volta para a lista de tarefas
  };

  return (
    <SafeAreaView style={styles.container}>
      {isNewTask ? (
        <View style={styles.newTaskContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
          />
          <TouchableOpacity onPress={addNewTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsNewTask(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
        {showImage && <Image
            source={require("../../assets/doropomoLogo.png")}
            style={{ marginTop: 20, height: 256, width: 256 }} // ajuste os valores conforme desejar
            resizeMode="contain"
          />}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  buttonAddTaskContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
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
    width: "80%",
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
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
