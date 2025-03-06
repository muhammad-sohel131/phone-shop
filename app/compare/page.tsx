"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useComparison } from "@/context/comparison-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, X, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import type { Phone } from "@/types/phone"
import { comparePhones } from "@/lib/compare-phones"

export default function ComparePage() {
  const { phoneIds, removePhone, addPhone } = useComparison()
  const { addItem } = useCart()
  const [phones, setPhones] = useState<Phone[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Phone[]>([])
  const [comparison, setComparison] = useState<string>("")

  useEffect(() => {
    const fetchPhones = async () => {
      const response = await fetch("/api/phones")
      if (response.ok) {
        const allPhones = await response.json()
        setPhones(allPhones.filter((phone: Phone) => phoneIds.includes(phone.id)))
      }
    }
    fetchPhones()
  }, [phoneIds])

  useEffect(() => {
    if (phones.length >= 2) {
      setComparison(comparePhones(phones))
    } else {
      setComparison("")
    }
  }, [phones])

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim()) {
      const response = await fetch(`/api/phones?search=${encodeURIComponent(query)}`)
      if (response.ok) {
        const results = await response.json()
        setSearchResults(results)
      }
    } else {
      setSearchResults([])
    }
  }

  const handleAddToComparison = (phone: Phone) => {
    addPhone(phone.id)
    setSearchQuery("")
    setSearchResults([])
  }

  const allSpecs = phones.reduce((acc, phone) => {
    if (phone) {
      Object.keys(phone.specs).forEach((key) => {
        if (!acc.includes(key)) {
          acc.push(key)
        }
      })
    }
    return acc
  }, [] as string[])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Phones</h1>

      {/* Search box for adding phones to comparison */}
      <div className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for phones to compare..."
            value={searchQuery}
            onChange={handleSearch}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {searchResults.length > 0 && (
          <div className="mt-2 bg-white shadow-lg rounded-md overflow-hidden">
            {searchResults.map((phone) => (
              <div
                key={phone.id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={() => handleAddToComparison(phone)}
              >
                <span>{phone.name}</span>
                <Button size="sm" variant="ghost">
                  Add to comparison
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {phones.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-4">No phones selected for comparison.</p>
            <Button asChild>
              <Link href="/phones">Browse Phones</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phones.map((phone) => (
            <Card key={phone.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removePhone(phone.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardHeader>
                <div className="relative h-48 w-full mb-4">
                  <Image src={phone.image || "/placeholder.svg"} alt={phone.name} fill className="object-contain" />
                </div>
                <CardTitle className="text-xl font-bold">{phone.name}</CardTitle>
                <div className="text-lg font-semibold">${phone.price}</div>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{phone.rating}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allSpecs.map((spec) => (
                    <div key={spec} className="border-t pt-2">
                      <div className="font-medium">{spec}</div>
                      <div className="text-sm text-muted-foreground">
                        {phone.specs[spec as keyof typeof phone.specs]?.toString() || "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" onClick={() => addItem(phone.id)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {comparison && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{comparison}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

