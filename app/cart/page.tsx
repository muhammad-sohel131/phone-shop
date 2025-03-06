"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, getPhone } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would redirect to a checkout page
    toast({
      title: "Checkout initiated",
      description: "This is a demo. In a real app, you would be redirected to a checkout page.",
    })

    // For demo purposes, clear the cart after "checkout"
    clearCart()
    router.push("/checkout-success")
  }

  const handleApplyCoupon = () => {
    toast({
      title: "Coupon applied",
      description: "This is a demo. In a real app, the coupon would be validated and applied.",
    })
    setCouponCode("")
  }

  if (items.length === 0) {
    return (
      <div className="container py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Your Cart is Empty</CardTitle>
            <CardDescription>Add some products to your cart to see them here.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <ShoppingBag className="h-24 w-24 text-muted-foreground" />
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/phones">Browse Phones</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => {
                const phone = getPhone(item.phoneId)
                if (!phone) return null

                return (
                  <div key={item.phoneId} className="flex items-center space-x-4">
                    <div className="relative h-20 w-20">
                      <Image src={phone.image || "/placeholder.svg"} alt={phone.name} fill className="object-contain" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Link href={`/phones/${phone.id}`} className="font-medium hover:underline">
                        {phone.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.storage && <span> | Storage: {item.storage}</span>}
                      </div>
                      <div className="font-medium">${phone.price}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.phoneId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.phoneId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="font-medium w-24 text-right">${(phone.price * item.quantity).toFixed(2)}</div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.phoneId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link href="/phones">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(subtotal * 0.1).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(subtotal * 1.1).toFixed(2)}</span>
              </div>

              <div className="flex space-x-2 pt-4">
                <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <Button onClick={handleApplyCoupon} disabled={!couponCode}>
                  Apply
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

