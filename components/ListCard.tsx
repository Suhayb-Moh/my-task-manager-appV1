import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export interface List {
  _id: string;
  name: string;
  user_id: string;
}

interface ListItemProps {
  list: List;
  onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onDelete }) => {
  const router = useRouter();

  const handleEditPress = () => {
    router.push({
      pathname: "/lists/EditList",
      params: { list: JSON.stringify(list) },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Text style={styles.name}>{list.name}</Text>
        <Text style={styles.meta}>Created by: {list.user_id}</Text>
      </View>

      <View style={styles.actionSection}>
        <Pressable style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  meta: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  actionSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#e2eafc",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#f8d7da",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});
