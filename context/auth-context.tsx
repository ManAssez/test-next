"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import type { User } from "@/types/user";
import users from "@/data/users.json";
import { sleep } from "@/lib/utils";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const cookieUser = Cookies.get("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erreur parsing localStorage:", error);
        localStorage.removeItem("user");
      }
    } else if (cookieUser && typeof cookieUser === "string") {
      try {
        setUser(JSON.parse(cookieUser));
        localStorage.setItem("user", cookieUser);
      } catch (error) {
        console.error("Erreur parsing cookie:", error);
        Cookies.remove("user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await sleep(300);

    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const userTyped: User = {
        ...userWithoutPassword,
        id: String(userWithoutPassword.id),
      };
      setUser(userTyped as User);

      const serializedUser = JSON.stringify(userWithoutPassword);
      localStorage.setItem("user", serializedUser);
      Cookies.set("user", serializedUser, { path: "/" });
      return true;
    }

    return false;
  };

  const logout = () => {
    Cookies.remove("user", { path: "/" });
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
