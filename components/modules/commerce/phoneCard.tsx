"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { TPhone } from "@/lib/db";

type PhoneCardProps = { phone: TPhone };

export default function PhoneCard({ phone }: PhoneCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="overflow-hidden">
      <div className="relative pt-4 px-4">
        {phone.isNew && <Badge className="absolute top-6 right-6 z-10">New</Badge>}
        <Link href={`/phones/${phone._id}`}>
          <div className="relative h-48 w-full mb-2">
            <Image
              src={phone.specs.image || "/placeholder.svg"}
              alt={phone.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{phone.brand}</div>
        <Link href={`/phones/${phone._id}`} className="hover:underline">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{phone.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="font-bold">${phone.specs.originalPrice}</div>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm">{phone.ratting}</span>
          </div>
        </div>
      </CardContent>
      <div className="p-4 pt-0 flex gap-2">
        <Button className="w-full" size="sm" onClick={() => addItem(phone._id as string)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
