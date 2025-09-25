// app/dashboard/page.tsx
"use client"
import { useAuth } from "@/context/auth-context";
import AdminOverview from "./admin/overview/page";
import UserOverview from "./user/overview/page";


export default function DashboardHome() {
  const user = useAuth();

  if (!user) {
    return <p>Access denied</p>;
  }

  return user.role === "admin" ? <AdminOverview /> : <UserOverview />;
}
