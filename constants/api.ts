import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../hooks/useAuth";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// add interceptors to include the access token in the request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving access token:", error);
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// add interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // handle unauthorized requests
      const { logout } = useAuth();
      logout();
      // clear the access token and navigate to the login screen
    } else if (error.response?.status === 404) {
      // handle not found errors
      console.log("Not found");
    }
    console.error("Response interceptor error:", error);
    return Promise.reject(error);
  }
);

// Helper function to handle API GET requests
export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T | null> {
  try {
    const response = await api.get<T>(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`GET ${endpoint} failed:`, error);
    return null;
  }
}

// Helper function to handle API POST requests
export async function apiPost<T>(
  endpoint: string,
  data: Record<string, any>
): Promise<T | null> {
  try {
    const response = await api.post<T>(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    return null;
  }
}

// Helper function to handle API PUT requests
export async function apiPut<T>(
  endpoint: string,
  data: Record<string, any>
): Promise<T | null> {
  try {
    const response = await api.put<T>(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`PUT ${endpoint} failed:`, error);
    return null;
  }
}

// Helper function to handle API DELETE requests
export async function apiDelete<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await api.delete<T>(endpoint);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${endpoint} failed:`, error);
    return null;
  }
}

export default api;
