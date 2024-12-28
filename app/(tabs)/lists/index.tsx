import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ListItem, { List } from "../../../components/ListCard";
import { useLists } from "../../../hooks/useLists";

const ListScreen = () => {
  const { lists, loading, error } = useLists();

  useEffect(() => {
    // Load lists when component mounts
  }, []);

  const handleTaskDeletion = (listId: string) => {
    // Implement the logic to delete a list
  };

  if (loading) return <Text>Loading Lists...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your List</Text>
      {lists.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks available.</Text>
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item: List) => item._id}
          renderItem={({ item }) => (
            <ListItem
              list={item}
              onDelete={() => handleTaskDeletion(item._id)}
            />
          )}
        />
      )}
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9faff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F41BB",
  },
  noTasksText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
