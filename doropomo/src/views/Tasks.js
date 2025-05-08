import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import tasks from "../tasks.json";

export default props => {
    
    const [listTasks, setListTasks] = useState(tasks);
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
        <View style={styles.container}>
            <Text>Tasks</Text>
            <FlatList
                data={listTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        {editingTask === item.id ? (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    value={newTitle}
                                    onChangeText={setNewTitle}
                                    placeholder="Edit task title"
                                />
                                <TouchableOpacity onPress={() => editTask(item.id)}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <Text>{item.title}</Text>
                                <TouchableOpacity onPress={() => setEditingTask(item.id)}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Text>Delete</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    taskContainer: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 5,
        marginBottom: 5,
        width: 200,
    },
});