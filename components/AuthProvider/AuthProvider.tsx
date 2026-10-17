"use client";

import { createContext, useContext, useEffect, useState, useCallback, } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/api/firebase";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  refreshUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

 const refreshUser = useCallback(() => setVersion((v) => v + 1), []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);