"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Package, Truck, CheckCircle } from "lucide-react"

// Mock order data (in a real app, this would come from an API)
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-03-01",
    total: 999,
    status: "Delivered",
    items: [{ id: 1, name: "iPhone 15 Pro", quantity: 1, price: 999 }],
  },
  {
    id: "ORD-002",
    date: "2024-03-05",
    total: 1199,
    status: "Shipped",
    items: [{ id: 2, name: "Samsung Galaxy S23 Ultra", quantity: 1, price: 1199 }],
  },
  {
    id: "ORD-003",
    date: "2024-03-10",
    total: 1798,
    status: "Processing",
    items: [
      { id: 3, name: "Google Pixel 8 Pro", quantity: 1, price: 899 },
      { id: 4, name: "OnePlus 12", quantity: 1, price: 899 },
    ],
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState(mockOrders)

  useEffect(() => {
    if (!user) {
      router.push("/signin")
    } else {
      setIsLoading(false)
    }
  }, [user, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <ShoppingBag className="h-4 w-4" />
      case "Shipped":
        return <Truck className="h-4 w-4" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Order {order.id}</CardTitle>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getStatusIcon(order.status)}
                  {order.status}
                </Badge>
              </div>
              <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

