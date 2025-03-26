"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { checkAuthStatus, consumeTokenAPI, logoutUser } from "@/utils/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; tokens: number } | null;
  login: (userData: any) => void;
  loginUser: () => Promise<void>; // ✅ Add this
  logout: () => void;
  consumeToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; tokens: number } | null>(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authData = await checkAuthStatus();
      if (authData && authData.name !== "Guest") {
        setIsAuthenticated(true);
        setUser(authData);
      }
    };
    fetchAuthStatus();
  }, []);

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
  };

  const loginUser = async () => {
    const authData = await checkAuthStatus();
    if (authData && authData.name !== "Guest") {
      setIsAuthenticated(true);
      setUser(authData);
    }
  };

  const consumeToken = async (): Promise<boolean> => {
    if (!user || user.tokens <= 0) {
      return false; // No tokens left
    }
  
    const newTokenCount = await consumeTokenAPI(); // Calls backend API
  
    if (newTokenCount !== false) {
      // ✅ Update only if API returns a valid new token count
      setUser((prev) => (prev ? { ...prev, tokens: newTokenCount } : null));
      return true;
    }
  
    return false; // ❌ Backend failed, prevent frontend update
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginUser, login, logout, consumeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
