"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Package, Truck, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Order } from "@/types/order"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const response = await fetch("/api/orders")
    if (response.ok) {
      const data = await response.json()
      setOrders(data)
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: "processing" | "shipped" | "delivered") => {
    const response = await fetch("/api/orders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: orderId, status }),
    })

    if (response.ok) {
      fetchOrders()
      toast({
        title: "Order updated",
        description: `Order ${orderId} status has been updated to ${status}.`,
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <ShoppingBag className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
        <CardDescription>View and manage customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">Total: ${order.total.toFixed(2)}</p>
                <Badge variant="outline" className="mt-1 flex items-center gap-1">
                  {getStatusIcon(order.status)}
                  {order.status}
                </Badge>
              </div>
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant={order.status === "processing" ? "default" : "outline"}
                  onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                >
                  Processing
                </Button>
                <Button
                  size="sm"
                  variant={order.status === "shipped" ? "default" : "outline"}
                  onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                >
                  Shipped
                </Button>
                <Button
                  size="sm"
                  variant={order.status === "delivered" ? "default" : "outline"}
                  onClick={() => handleUpdateOrderStatus(order.id, "delivered")}
                >
                  Delivered
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

