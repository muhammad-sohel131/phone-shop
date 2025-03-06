"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, BarChart2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { phones } from "@/lib/db"
import { useCart } from "@/context/cart-context"
import { useComparison } from "@/context/comparison-context"

export default function FeaturedPhones() {
  const [featuredPhones, setFeaturedPhones] = useState(phones.filter((phone) => phone.isFeatured))
  const { addItem } = useCart()
  const { addPhone, isInComparison } = useComparison()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredPhones.map((phone) => (
        <Card key={phone.id} className="overflow-hidden">
          <div className="relative pt-4 px-4">
            {phone.isNew && <Badge className="absolute top-6 right-6 z-10">New</Badge>}
            <Link href={`/phones/${phone.id}`}>
              <div className="relative h-48 w-full mb-2">
                <Image src={phone.image || "/placeholder.svg"} alt={phone.name} fill className="object-contain" />
              </div>
            </Link>
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{phone.brand}</div>
            <Link href={`/phones/${phone.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{phone.name}</h3>
            </Link>
            <div className="flex items-center justify-between">
              <div className="font-bold">${phone.price}</div>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm">{phone.rating}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button className="w-full" size="sm" onClick={() => addItem(phone.id)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => addPhone(phone.id)}
              disabled={isInComparison(phone.id)}
            >
              <BarChart2 className="h-4 w-4" />
              <span className="sr-only">Add to comparison</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

