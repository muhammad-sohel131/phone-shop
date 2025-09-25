import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
import { ToastContainer} from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Finder - Find Your Perfect Phone",
  description: "Compare, discuss, and purchase the latest smartphones",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <CartProvider>
                  <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <ToastContainer />
                    <Footer />
                  </div>
              </CartProvider>
               
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}

import "./globals.css";import AuthProvider from "@/providers/AuthProvider";
import { useSession } from "next-auth/react";

