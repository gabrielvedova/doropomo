import React from "react";
import { View, StyleSheet } from "react-native";
import ListTasks from "../components/tasks/ListTasks";

export default props => {
    return (
        <View style={styles.container}>
            <ListTasks />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
});