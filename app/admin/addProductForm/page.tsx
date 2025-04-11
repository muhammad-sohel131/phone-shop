"use client"; // Mark as a Client Component

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
  owner: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters."),
  brand: z.string().min(2, "Brand must be at least 2 characters."),
  price: z.number().min(0, "Price must be a positive number."),
  originalPrice: z.number().min(0, "Original price must be a positive number."),
  image: z.string().url("Invalid URL."),
  isFeatured: z.boolean().default(false),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  releaseDate: z.string(), // Use string for native date input
  specs: z.object({
    display: z.string(),
    resolution: z.string(),
    processor: z.string(),
    variants: z.array(
      z.object({
        ram: z.string().min(1, "RAM is required"),
        storage: z.string().min(1, "Storage is required"),
      })
    ),
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
    colors: z.array(
      z.object({
        color: z.string().min(1, "Color is required"),
        image: z.string().url("Must be a valid URL"),
      })
    ),
  }),
});

export default function AddProductForm() {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner: "662423e97b709cc3a8c3b173",
      name: "",
      brand: "",
      price: 0,
      originalPrice: 0,
      image: "",
      isFeatured: false,
      description: "",
      releaseDate: "",
      specs: {
        display: "",
        resolution: "",
        processor: "",
        variants: [
          {
            ram: "",
            storage: "",
          },
        ],
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
        colors: [{ color: "", image: "" }],
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specs.variants",
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({ control: form.control, name: "specs.colors" });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log("Form submitted:", values);
    // Add your logic to submit the form data to the backend
    try {
      const response = await fetch("http://localhost:3000/api/phones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save phone data");
      }

      const data = await response.json();
      console.log("Data added successfully", data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8">Add New Product</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4 border-2 p-10 mb-10">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
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
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || "")
                        }
                      />
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
                      <Input
                        type="number"
                        placeholder="Original Price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || "")
                        }
                      />
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
                      <Input placeholder="Display type and size" {...field} />
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
                      <Input placeholder="Processor details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Variants (RAM & Storage) */}
              <div className="space-y-2">
                <FormLabel>Variants</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4">
                    <Input
                      placeholder="RAM"
                      {...form.register(`specs.variants.${index}.ram`)}
                    />
                    <Input
                      placeholder="Storage"
                      {...form.register(`specs.variants.${index}.storage`)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ ram: "", storage: "" })}
                >
                  Add Variant
                </Button>
              </div>

              <FormField
                control={form.control}
                name="specs.battery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Battery</FormLabel>
                    <FormControl>
                      <Input placeholder="Battery capacity/type" {...field} />
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
                      <Input
                        placeholder="e.g., Android 13, iOS 17"
                        {...field}
                      />
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
                      <Input placeholder="Weight in grams" {...field} />
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
                      <Input
                        placeholder="e.g., 146.7 x 71.5 x 7.4 mm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Camera */}
              <h4 className="font-medium mt-6">Camera</h4>
              <FormField
                control={form.control}
                name="specs.camera.main"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Camera</FormLabel>
                    <FormControl>
                      <Input placeholder="Main camera specs" {...field} />
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
                      <Input placeholder="Ultrawide camera specs" {...field} />
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
                      <Input placeholder="Telephoto camera specs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Features */}
              <h4 className="font-medium mt-6">Features</h4>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="specs.features.faceId"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Face ID</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specs.features.waterResistance"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Water Resistance</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specs.features.wirelessCharging"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Wireless Charging</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Colors */}
              <h4 className="font-medium mt-6">Available Colors</h4>
              {colorFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-center">
                  <Input
                    placeholder="Color Name"
                    {...form.register(`specs.colors.${index}.color`)}
                  />
                  <Input
                    placeholder="Image URL"
                    {...form.register(`specs.colors.${index}.image`)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeColor(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => appendColor({ color: "", image: "" })}
              >
                Add Color
              </Button>
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
