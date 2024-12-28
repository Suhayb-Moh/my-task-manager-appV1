import { useState, useEffect } from "react";
import { fetchLists, List } from "../api/listsService";

export function useLists() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedLists = await fetchLists();
        if (fetchedLists) {
          setLists(fetchedLists);
        } else {
          setError("Failed to fetch lists");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lists:", error);
        setError("Failed to fetch lists");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { lists, loading, error };
}
