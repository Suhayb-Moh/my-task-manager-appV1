import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type AuthState = {
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  error: Error | null;
  logout: () => Promise<void>;
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsAuthLoaded(true);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setIsAuthenticated(false);
    } catch (error) {
      setError(error as Error);
    }
  };
  return { isAuthenticated, isAuthLoaded, logout, error };
}
