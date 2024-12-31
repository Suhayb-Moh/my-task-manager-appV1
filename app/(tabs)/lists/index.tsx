import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import ListItem, { List } from "../../../components/ListCard";
import { useLists } from "../../../hooks/useLists";
import { useTheme } from "../../../hooks/theme-context";

const ListScreen = () => {
  const { lists, loading, error } = useLists();
  const { theme } = useTheme();

  useEffect(() => {
    // Load lists when component mounts
  }, []);

  const handleTaskDeletion = (listId: string) => {
    // Implement the logic to delete a list
  };

  if (loading)
    return (
      <Text style={[styles.loadingText, { color: theme.textColor }]}>
        Loading Lists...
      </Text>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.title, { color: theme.textColor }]}>
          Your List
        </Text>
        {lists.length === 0 ? (
          <Text style={[styles.noTasksText, { color: theme.textColor }]}>
            No tasks available.
          </Text>
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
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  outContainer: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  noTasksText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
