"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const userMenu = [
  { title: "Overview", href: "/dashboard" },
  { title: "Orders", href: "/dashboard/user/orders" },
  { title: "Profile", href: "/dashboard/user/profile" },
];

const adminMenu = [
  { title: "Overview", href: "/dashboard" },
  {title: "Add Product", href: "/dashboard/admin/addProductForm/new"},
  {title: "Products", href: "/dashboard/admin/products"},
  {title: "Orders", href: "/dashboard/admin/orders"},
  {title: "Reviews", href: "/dashboard/admin/reviews"},
  { title: "Users", href: "/dashboard/admin/users" },
];


interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "justify-start",
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "block rounded-md px-3 py-2 text-sm font-medium"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function AdminSidebar() {
  const user = useAuth()
  const sidebarNavItems = user?.role === "admin" ? adminMenu : userMenu;
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
            <div className="flex flex-col space-y-3">
              <SidebarNav items={sidebarNavItems} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            <SidebarNav items={sidebarNavItems} />
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
