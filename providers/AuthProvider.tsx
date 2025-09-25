"use client";

import { AuthContext } from "@/context/auth-context";
import { TUser } from "@/lib/db";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

const Check = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  if (session.status === "loading") {
    return <h2>Loading...</h2>;
  }
  return (
    <AuthContext.Provider value={{ user: session.data?.user as TUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Check>{children}</Check>
    </SessionProvider>
  );
}

export default AuthProvider;
