"use client"; // Mark as a Client Component

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Define the form schema using Zod
const formSchema = z.object({
  owner: z.string().min(1, "Owner ID is required."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  brand: z.string().min(2, "Brand must be at least 2 characters."),
  price: z.number().min(0, "Price must be a positive number."),
  originalPrice: z.number().min(0, "Original price must be a positive number."),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5."),
  image: z.string().url("Invalid URL."),
  images: z.array(z.string().url("Invalid URL.")),
  isFeatured: z.boolean().default(false),
  description: z.string().min(10, "Description must be at least 10 characters."),
  releaseDate: z.string(), // Use string for native date input
  specs: z.object({
    display: z.string(),
    resolution: z.string(),
    processor: z.string(),
    ram: z.array(z.string()),
    storage: z.array(z.string()),
    battery: z.string(),
    os: z.string(),
    weight: z.string(),
    dimensions: z.string(),
    camera: z.object({
      main: z.string(),
      ultrawide: z.string(),
      telephoto: z.string(),
    }),
    features: z.object({
      faceId: z.boolean(),
      waterResistance: z.boolean(),
      wirelessCharging: z.boolean(),
    }),
    colors: z.array(z.string()),
  }),
});

export default function AddProductForm() {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner: "",
      name: "",
      brand: "",
      price: 0,
      originalPrice: 0,
      rating: 0,
      image: "",
      images: [],
      isFeatured: false,
      description: "",
      releaseDate: "", 
      specs: {
        display: "",
        resolution: "",
        processor: "",
        ram: [],
        storage: [],
        battery: "",
        os: "",
        weight: "",
        dimensions: "",
        camera: {
          main: "",
          ultrawide: "",
          telephoto: "",
        },
        features: {
          faceId: false,
          waterResistance: false,
          wirelessCharging: false,
        },
        colors: [],
      },
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
    // Add your logic to submit the form data to the backend
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8">Add New Product</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4 border-2 p-10 mb-10">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="releaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="w-full p-2 border rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing */}
            <div className="space-y-4 border-2 p-10 mb-10">
              <h3 className="text-lg font-semibold">Pricing</h3>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Original Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Rating" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Images */}
            <div className="space-y-4 border-2 p-10 mb-10">
              <h3 className="text-lg font-semibold">Images</h3>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Main Image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Image URLs</FormLabel>
                    <FormControl>
                      <Input placeholder="Additional Image URLs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Specifications */}
            <div className="space-y-4 border-2 p-10 mb-10">
              <h3 className="text-lg font-semibold">Specifications</h3>
              <FormField
                control={form.control}
                name="specs.display"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display</FormLabel>
                    <FormControl>
                      <Input placeholder="Display" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.resolution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resolution</FormLabel>
                    <FormControl>
                      <Input placeholder="Resolution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.processor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Processor</FormLabel>
                    <FormControl>
                      <Input placeholder="Processor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.ram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RAM</FormLabel>
                    <FormControl>
                      <Input placeholder="RAM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.storage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage</FormLabel>
                    <FormControl>
                      <Input placeholder="Storage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.battery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Battery</FormLabel>
                    <FormControl>
                      <Input placeholder="Battery" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.os"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operating System</FormLabel>
                    <FormControl>
                      <Input placeholder="OS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="Weight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensions</FormLabel>
                    <FormControl>
                      <Input placeholder="Dimensions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.camera.main"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Camera</FormLabel>
                    <FormControl>
                      <Input placeholder="Main Camera" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.camera.ultrawide"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ultrawide Camera</FormLabel>
                    <FormControl>
                      <Input placeholder="Ultrawide Camera" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.camera.telephoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telephoto Camera</FormLabel>
                    <FormControl>
                      <Input placeholder="Telephoto Camera" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.features.faceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Face ID</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.features.waterResistance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Resistance</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.features.wirelessCharging"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wireless Charging</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specs.colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <Input placeholder="Colors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}