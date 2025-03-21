"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const response = await fetch("/api/phones")
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      setProducts(data)
    }
  }

  const handleUpdateProduct = async (updatedProduct: any) => {
    const response = await fetch("/api/phones", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })

    if (response.ok) {
      setEditingProduct(null)
      fetchProducts()
      toast({
        title: "Product updated",
        description: "The product information has been successfully updated.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    const response = await fetch(`/api/phones?id=${productId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      fetchProducts()
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <CardDescription>Manage product listings, prices, and inventory</CardDescription>
        <Button><Link href='/admin/addProductForm'>Add Product</Link></Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product: any) => (
            <div key={product.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">${product.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>Make changes to product information.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          defaultValue={product.name}
                          onChange={(e) => setEditingProduct({ ...product, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          defaultValue={product.price}
                          onChange={(e) => setEditingProduct({ ...product, price: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => editingProduct && handleUpdateProduct(editingProduct)}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

