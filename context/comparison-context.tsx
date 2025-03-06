"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Phone } from "@/lib/db"
import { getPhones } from "@/lib/storage"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

type ComparisonContextType = {
  phoneIds: number[]
  addPhone: (phoneId: number) => void
  removePhone: (phoneId: number) => void
  clearComparison: () => void
  getPhone: (phoneId: number) => Phone | undefined
  isInComparison: (phoneId: number) => boolean
  searchPhones: (query: string) => Phone[]
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [phoneIds, setPhoneIds] = useState<number[]>([])
  const [phones, setPhones] = useState<Phone[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load comparison from cookie
    const storedComparison = Cookies.get("comparison")
    if (storedComparison) {
      setPhoneIds(JSON.parse(storedComparison))
    }
    setPhones(getPhones())
  }, [])

  // Save comparison to cookie whenever it changes
  useEffect(() => {
    Cookies.set("comparison", JSON.stringify(phoneIds), { expires: 7 }) // Set cookie to expire in 7 days
  }, [phoneIds])

  const addPhone = (phoneId: number) => {
    if (phoneIds.includes(phoneId)) {
      toast({
        title: "Already in comparison",
        description: `This phone is already in your comparison`,
      })
      return
    }

    if (phoneIds.length >= 3) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 phones at a time. Remove a phone to add another.",
        variant: "destructive",
      })
      return
    }

    setPhoneIds((prev) => [...prev, phoneId])

    toast({
      title: "Added to comparison",
      description: `Phone added to your comparison`,
    })
  }

  const removePhone = (phoneId: number) => {
    setPhoneIds((prev) => prev.filter((id) => id !== phoneId))

    toast({
      title: "Removed from comparison",
      description: `${getPhone(phoneId)?.name} removed from your comparison`,
    })
  }

  const clearComparison = () => {
    setPhoneIds([])
    toast({
      title: "Comparison cleared",
      description: "All phones have been removed from your comparison",
    })
  }

  const getPhone = (phoneId: number) => {
    return phones.find((phone) => phone.id === phoneId)
  }

  const isInComparison = (phoneId: number) => {
    return phoneIds.includes(phoneId)
  }

  const searchPhones = (query: string) => {
    return phones.filter(
      (phone) =>
        phone.name.toLowerCase().includes(query.toLowerCase()) ||
        phone.brand.toLowerCase().includes(query.toLowerCase()),
    )
  }

  return (
    <ComparisonContext.Provider
      value={{
        phoneIds,
        addPhone,
        removePhone,
        clearComparison,
        getPhone,
        isInComparison,
        searchPhones,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}

