import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import ListTasks from "../components/tasks/ListTasks";
import Ionicons from "@expo/vector-icons/Ionicons";

import tasks from "../tasks.json";

export default ({ showButton = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTasks, setListTasks] = useState(tasks);
  const [isNewTask, setIsNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addNewTask = () => {
    if (newTaskTitle.trim() === "") return; // Evita adicionar tarefas vazias
    const newTask = {
      id: listTasks.length + 1, // Gera um novo ID
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
          <ListTasks
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            listTasks={listTasks}
            setListTasks={setListTasks}
            showButton={showButton}
          />
          {!isEditing && showButton ? (
            <TouchableOpacity
              onPress={() => {
                setIsNewTask(true);
              }}
              style={styles.buttonAddTaskContainer}
            >
              <Ionicons name="add-circle" size={92} color="black" />
            </TouchableOpacity>
          ) : null}
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
    backgroundColor: "#F5FCFF",
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
