'use client'

import React, { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import app from "../lib/config";
import { getAuth, User } from "firebase/auth";

const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
