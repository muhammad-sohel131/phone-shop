"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import Link from "next/link";

export default function UnderConstruction() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
          <Construction className="h-12 w-12 text-yellow-500" />

          <h2 className="text-2xl font-bold">Page Under Construction</h2>
          <p className="text-muted-foreground">
            We're working hard to bring you something amazing. Please check back
            later!
          </p>
          <Link href="/">
            <Button className="mt-4">Go Back Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
