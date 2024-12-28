import { useState, useEffect } from "react";
import { fetchCategories, Categories } from "../api/categoriesService";

export function useCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await fetchCategories();
        if (fetchedCategories) {
          setCategories(fetchedCategories);
        } else {
          setError("Failed to fetch categories");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { categories, loading, error };
}
