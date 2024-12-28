import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import CategoryItem, { Category } from "../../../components/CategoryCard";
import { useCategories } from "../../../hooks/useCategories";

const CategoryScreen = () => {
  const { categories, loading, error } = useCategories();

  useEffect(() => {}, []);

  const handleCategoryDeletion = (categoryId: string) => {
    // Implement the logic to delete a category
  };

  if (loading) return <Text>Loading Categories...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Categories</Text>
      {categories.length === 0 ? (
        <Text style={styles.noTasksText}>No Categories available.</Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item: Category) => item._id}
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onDelete={() => handleCategoryDeletion(item._id)}
            />
          )}
        />
      )}
    </View>
  );
};

export default CategoryScreen;

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
