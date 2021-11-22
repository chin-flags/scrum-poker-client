import axios from "axios";
import { createContext, ReactNode } from "react";
import { User } from "../types";

type AuthProviderType = {
  user: User;
  login: (name: string) => Promise<void>;
  logout: () => void;
};

const createLocaluser = (name: string, userId: string) => {
  const user: { userId: string; name: string } = {
    userId,
    name,
  };
  localStorage.setItem("poker-user", JSON.stringify(user));
  return user;
};

export const AuthContext = createContext<AuthProviderType>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("poker-user")!);

  const login = async (name: string) => {
    const response = await axios.post("http://localhost:3001/login", {
      name,
    });
    const { userId } = response.data;
    createLocaluser(name, userId);
  };

  const logout = () => {};
console.log('user', user);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
