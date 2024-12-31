import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import CategoryItem, { Category } from "../../../components/CategoryCard";
import { useCategories } from "../../../hooks/useCategories";
import { useTheme } from "../../../hooks/theme-context";

const CategoryScreen = () => {
  const { categories, loading, error } = useCategories();
  const { theme } = useTheme();

  useEffect(() => {}, []);

  const handleCategoryDeletion = (categoryId: string) => {
    // Implement the logic to delete a category
  };

  if (loading)
    return (
      <Text style={[styles.loadingText, { color: theme.textColor }]}>
        Loading Categories...
      </Text>
    );
  if (error)
    return (
      <Text style={[styles.errorText, { color: theme.textColor }]}>
        Error: {error}
      </Text>
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.title, { color: theme.textColor }]}>
          Your Categories
        </Text>
        {categories.length === 0 ? (
          <Text style={[styles.noTasksText, { color: theme.textColor }]}>
            No Categories available.
          </Text>
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
    </SafeAreaView>
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
  errorText: {
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
