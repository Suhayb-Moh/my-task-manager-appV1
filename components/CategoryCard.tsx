import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export interface Category {
  _id: string;
  name: string;
}

interface CategoryItemProps {
  category: Category;
  onDelete: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onDelete }) => {
  const router = useRouter();

  const handleEditPress = () => {
    router.push({
      pathname: "/categories/EditCategory",
      params: { category: JSON.stringify(category) },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Text style={styles.name}>{category.name}</Text>
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

export default CategoryItem;

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
