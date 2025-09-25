"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { TPhone } from "@/lib/db"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [suggestions, setSuggestions] = useState<typeof phones>([])
  const [phones, setPhones] = useState<TPhone[]>([])
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = phones.filter(
        (phone) =>
          phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phone.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phone.specs.processor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/phones?search=${encodeURIComponent(searchTerm.trim())}`)
      setSuggestions([])
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto items-center space-x-2">
        <Input
          type="text"
          placeholder="Search phones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full max-w-lg mx-auto mt-1 bg-background border rounded-md shadow-lg">
          {suggestions.map((phone) => (
            <button
              key={phone._id}
              className="w-full px-4 py-2 text-left hover:bg-accent transition-colors"
              onClick={() => {
                router.push(`/phones/${phone._id}`)
                setSuggestions([])
                setSearchTerm("")
              }}
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="font-medium">{phone.name}</p>
                  <p className="text-sm text-muted-foreground">{phone.brand}</p>
                </div>
                <p className="font-medium">${phone.specs.price}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

