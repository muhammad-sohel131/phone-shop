"use client";

import { createContext, useContext } from "react";
import { TUser } from "@/lib/db";

type AuthContextType = {
  user: TUser;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context.user;
}
