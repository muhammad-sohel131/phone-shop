"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type CartItem, type Phone, phones } from "@/lib/db"
import { useToast } from "@/components/ui/use-toast"

type CartContextType = {
  items: CartItem[]
  addItem: (phoneId: number, quantity?: number, color?: string, storage?: string) => void
  removeItem: (phoneId: number) => void
  updateQuantity: (phoneId: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  getPhone: (phoneId: number) => Phone | undefined
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (phoneId: number, quantity = 1, color?: string, storage?: string) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.phoneId === phoneId)

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          color: color || updatedItems[existingItemIndex].color,
          storage: storage || updatedItems[existingItemIndex].storage,
        }

        toast({
          title: "Cart updated",
          description: `Quantity increased for ${getPhone(phoneId)?.name}`,
        })

        return updatedItems
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${getPhone(phoneId)?.name} added to your cart`,
        })

        return [...prevItems, { phoneId, quantity, color, storage }]
      }
    })
  }

  const removeItem = (phoneId: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.phoneId !== phoneId)

      toast({
        title: "Item removed",
        description: `${getPhone(phoneId)?.name} removed from your cart`,
      })

      return updatedItems
    })
  }

  const updateQuantity = (phoneId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(phoneId)
      return
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.phoneId === phoneId) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  const getPhone = (phoneId: number) => {
    return phones.find((phone) => phone.id === phoneId)
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = items.reduce((total, item) => {
    const phone = getPhone(item.phoneId)
    return total + (phone?.price || 0) * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        getPhone,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

