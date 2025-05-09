import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import tasks from "../tasks.json";

export default props => {

    const [listTasks, setListTasks] = useState(tasks);
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);

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
            {isEditing ? (
                <View>
                    <TextInput
                        style={styles.input}
                        value={newTitle}
                        onChangeText={setNewTitle}
                        placeholder="Edit task title"
                    />
                    <TouchableOpacity onPress={() => {editTask(editingTask); setIsEditing(false);}}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            ) : <FlatList
                data={listTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <TouchableOpacity onPress={() => {setEditingTask(item.id); setIsEditing(true);}}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                        <Text>{item.title}</Text>
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
            />}
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
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 5,
        marginBottom: 5,
        width: 200,
    },
});