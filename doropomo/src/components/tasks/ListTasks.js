import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

import Fontisto from "@expo/vector-icons/Fontisto";

export default ({
  isEditing,
  setIsEditing,
  listTasks,
  setListTasks,
  showButton,
}) => {
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    weight: null,
  });

  const editTask = (id) => {
    setListTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTask.title, weight: newTask.weight }
          : task
      )
    );
    setEditingTask(null); // Finaliza o modo de edição
    setNewTask({
      title: "",
      weight: null,
    }); // Limpa o campo de entrada
  };

  const deleteTask = (id) => {
    setListTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: showButton ? 50 : 10 }]}
    >
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            value={newTask.title}
            onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            placeholder="Edit task title"
          />
          <TextInput
            style={styles.input}
            value={newTask.weight}
            onChangeText={(text) => setNewTask({ ...newTask, weight: text })}
            placeholder="Edit task weight"
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => {
              editTask(editingTask);
              setIsEditing(false);
            }}
          >
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsEditing(false);
              setNewTask("");
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={listTasks}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemTask,
                  {
                    width: showButton ? "85%" : "95%",
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setListTasks((prevTasks) =>
                      prevTasks.map((task) =>
                        task.id === item.id
                          ? { ...task, completed: !task.completed }
                          : task
                      )
                    );
                  }}
                >
                  <Fontisto
                    name={
                      item.completed ? "checkbox-active" : "checkbox-passive"
                    }
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEditingTask(item.id);
                    setIsEditing(true);
                  }}
                >
                  <Text
                    style={
                      item.completed
                        ? { textDecorationLine: "line-through" }
                        : null
                    }
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Fontisto name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => (
              <View>
                <Text>No tasks available</Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#C4C0C088",
    padding: 10,
    minHeight: "80%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTask: {
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "auto",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginBottom: 5,
    width: 200,
  },
});
