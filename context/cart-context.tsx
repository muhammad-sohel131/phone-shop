"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { globalVariables, type CartItem, type Phone } from "@/lib/db";
import { toast } from "react-toastify";

type CartContextType = {
  items: CartItem[];
  addItem: (phoneId: string, quantity?: number) => void;
  removeItem: (phoneId: string) => void;
  updateQuantity: (phoneId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  getPhone: (phoneId: string) => Phone | undefined;
  phones: Phone[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const [phones, setProducts] = useState<Phone[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${globalVariables.url}/api/phones`);
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
  };

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (phoneId: string, quantity = 1) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.phoneId === phoneId
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };

        toast.success("Cart updated.",)

        return updatedItems;
      } else {
        // Add new item
        toast.success('Added to cart')

        return [...prevItems, { phoneId, quantity }];
      }
    });
  };

  const removeItem = (phoneId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.phoneId !== phoneId);

      toast.success("Item removed")

      return updatedItems;
    });
  };

  const updateQuantity = (phoneId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(phoneId);
      return;
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.phoneId === phoneId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared")
  };

  const getPhone = (phoneId: string) => {
    return phones.find((phone) => phone._id === phoneId);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce((total, item) => {
    const phone = getPhone(item.phoneId);
    return total + (phone?.specs.price || 0) * item.quantity;
  }, 0);

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
        phones,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
