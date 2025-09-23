"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Share2,
  Star,
  Check,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { globalVariables, Phone } from "@/lib/db";

export default function PhoneDetailPage() {
  const [phone, setPhone] = useState<Phone>();

  const params = useParams();
  const phoneId = params.id;

  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { toast } = useToast();

  const fetchProducts = async () => {
    const response = await fetch(`${globalVariables.url}/api/phones`);
    if (response.ok) {
      const data = await response.json();
      const p = data.find((p: Phone) => p._id === phoneId);
      console.log(p);
      setPhone(p);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!phone) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Phone not found</h1>
        <p className="mb-6">
          The phone you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/phones">Browse Phones</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(phone?._id as string, quantity);
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          href="/phones"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Phones
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[400px] border rounded-lg overflow-hidden">
            <Image
              src={phone?.specs?.image || "/placeholder.svg"}
              alt={phone.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{phone.name}</h1>
              <div className="flex space-x-2"></div>
            </div>
            <div className="text-lg text-muted-foreground">{phone.brand}</div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(phone.ratting || 0)
                      ? "text-yellow-500 fill-yellow-500"
                      : i < Number(phone.ratting)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              ({phone.ratting} rating)
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold">${phone.specs.price}</div>
            {phone.specs.originalPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground line-through">
                  ${phone.specs.originalPrice}
                </span>
                <Badge variant="outline" className="text-green-600">
                  Save $
                  {(phone.specs.originalPrice - phone.specs.price).toFixed(2)}
                </Badge>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium">Storage</label>

              <button
                key={phone.specs.storage}
                className={`px-3 py-1 border rounded-full bg-background hover:bg-muted`}
              >
                {phone.specs.storage}
              </button>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          <div className="text-sm space-y-2">
            <div className="flex items-center text-green-600">
              <Check className="mr-2 h-4 w-4" />
              Free shipping
            </div>
            <div className="flex items-center text-green-600">
              <Check className="mr-2 h-4 w-4" />
              30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="leading-7">{phone.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">General</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Brand", value: phone.brand },
                      { label: "Model", value: phone.name },
                      { label: "Release Date", value: phone.releaseDate },
                      { label: "Dimensions", value: phone.specs.dimensions },
                      { label: "Weight", value: phone.specs.weight },
                      { label: "Operating System", value: phone.specs.os },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium">Display</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Screen", value: phone.specs.display },
                      { label: "Resolution", value: phone.specs.resolution },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Performance</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Processor", value: phone.specs.processor },
                      {
                        label: "Storage",
                        value: phone.specs.storage,
                      },
                      { label: "Battery", value: phone.specs.battery },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium">Camera</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Main Camera", value: phone.specs.camera.main },
                      {
                        label: "Front Camera",
                        value: phone.specs.camera.selfie,
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <Button>Write a Review</Button>
                </div>

                <div className="space-y-4">
                  {/* This would be populated with actual reviews from the database */}
                  <div className="space-y-4 border-b pb-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-muted-foreground">
                          Verified Purchase
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        2 weeks ago
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium">
                      Great phone, amazing camera!
                    </h4>
                    <p className="text-sm">
                      I've been using this phone for two weeks now and I'm very
                      impressed with the camera quality and overall performance.
                    </p>
                  </div>

                  <div className="space-y-4 border-b pb-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Jane Smith</div>
                        <div className="text-sm text-muted-foreground">
                          Verified Purchase
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        1 month ago
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 5
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium">Best phone I've ever owned</h4>
                    <p className="text-sm">
                      The battery life is incredible and the display is
                      stunning. Highly recommend!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
