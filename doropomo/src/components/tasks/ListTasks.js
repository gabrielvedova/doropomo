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
  const [newTitle, setNewTitle] = useState("");

  const editTask = (id) => {
    setListTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
    setEditingTask(null); // Finaliza o modo de edição
    setNewTitle(""); // Limpa o campo de entrada
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
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Edit task title"
          />
          <TouchableOpacity
            onPress={() => {
              editTask(editingTask);
              setIsEditing(false);
            }}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={listTasks}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listContainer}
          renderItem={({ item }) => (
            <View
              style={[
                styles.taskContainer,
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
                  name={item.completed ? "checkbox-active" : "checkbox-passive"}
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  listContainer: {
    width: "80%",
    marginBottom: 10,
  },
  taskContainer: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginBottom: 5,
    width: 200,
  },
});
