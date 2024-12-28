import { apiDelete, apiGet, apiPost, apiPut } from "../constants/api";

export interface Categories {
  _id: string;
  name: string;
}

/**
 * Fetches the list of categories from the API.
 *
 * @returns {Promise<Categories[] | null>} A promise that resolves to an array of categories if successful, or null if an error occurs or the response format is unexpected.
 *
 * @throws Will log an error message to the console if the fetch operation fails.
 */
export const fetchCategories = async (): Promise<Categories[] | null> => {
  try {
    const response = await apiGet<{ categories: Categories[] }>("/categories");
    if (Array.isArray(response)) {
      return response;
    } else {
      console.error("Unexpected response format:", response);
      return null;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};
