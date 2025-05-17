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
import { Picker } from "@react-native-picker/picker";

export default ({
  isEditing,
  setIsEditing,
  listTasks,
  setListTasks,
  showButton,
}) => {
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    id: null,
    title: "",
    weight: null,
    completed: false,
    DayWeek: "",
    timeToDo: 0,
  });

  const editTask = (id) => {
    setListTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTask.title,
              weight: newTask.weight,
              timeToDo: newTask.timeToDo,
              DayWeek: newTask.DayWeek,
            }
          : task
      )
    );
    setEditingTask(null); // Finaliza o modo de edição
    setNewTask({
      title: "",
      weight: null,
      DayWeek: "",
      timeToDo: 0,
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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={styles.input}
            value={newTask.title}
            onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            placeholder="Insira o novo título da tarefa"
          />
          <TextInput
            style={styles.input}
            value={newTask.weight}
            onChangeText={(text) => setNewTask({ ...newTask, weight: text })}
            placeholder="Insira o novo peso da tarefa (1 a 4)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={newTask.timeToDo}
            onChangeText={(text) => setNewTask({ ...newTask, timeToDo: text })}
            placeholder="Insira o novo tempo para fazer (em minutos)"
            keyboardType="numeric"
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
              onPress={() => {
                setIsEditing(false);
                setNewTask("");
              }}
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                editTask(editingTask);
                setIsEditing(false);
              }}
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={listTasks}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              width: 300,
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
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Nenhuma tarefa disponível!</Text>
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
    width: "100%",
  },
  listContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#C4C0C088",
    padding: 10,
    minHeight: "60%",
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
    padding: 10,
    marginBottom: 10,
    width: 300,
    backgroundColor: "#ffffffb3",
  },
});
