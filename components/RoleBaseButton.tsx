"use client";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function RoleBasedButton() {
  const user = useAuth();
  if (user) {
    return (
      <>
       <Button variant='secondary' size='sm'>
         <Link
          href="/dashboard"
        >
          Dashboard
        </Link>
       </Button>
        <Button onClick={() => signOut()} variant='outline'  size="sm" className="text-sm">
          Sign Out
        </Button>
      </>
    );
  }
  return (
    <Button asChild size="sm" variant='secondary' className="text-sm">
      <Link href="/signin">Sign In</Link>
    </Button>
  );
}
