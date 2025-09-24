"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">404</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
