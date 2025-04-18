"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { globalVariables } from "@/lib/db";
import { useRouter } from "next/compat/router";
import { redirect } from "next/navigation";

export default function ProductsPage() {
   const route = useRouter()
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${globalVariables.url}/api/phones`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setProducts(data);
    }
  };

  const handleUpdateProduct = async (updatedProduct: any) => {
    const response = await fetch("/api/phones", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
    } else {
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    console.log(productId);
    const response = await fetch(`/api/phones?id=${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchProducts();
      toast.success("Deleted Success!");
    } else {
      toast.error("Something Wrong");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <CardDescription>
          Manage product listings, prices, and inventory
        </CardDescription>
        <Button>
          <Link href="/admin/addProductForm/new">Add Product</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${product.specs.variants[0].price}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => redirect(`/admin/addProductForm/${product._id}`)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
