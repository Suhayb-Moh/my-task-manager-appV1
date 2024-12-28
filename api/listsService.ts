import { apiDelete, apiGet, apiPost, apiPut } from "../constants/api";

export interface List {
  _id: string;
  name: string;
  user_id: string;
}

export const fetchLists = async (): Promise<List[] | null> => {
  try {
    const response = await apiGet<{ lists: List[] }>("/list");
    if (response && response.lists) {
      return response.lists;
    } else {
      console.error("Unexpected response format:", response);
      return null;
    }
  } catch (error) {
    console.error("Error fetching lists:", error);
    return null;
  }
};
