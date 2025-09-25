"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Grid3X3, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { globalVariables, type TPhone } from "@/lib/db";
import { useCart } from "@/context/cart-context";

const FilterButton = ({ children }: { children: React.ReactNode }) => {
  return <div className="lg:sticky lg:top-6">{children}</div>;
};

export default function PhonesPage() {
  const [filteredPhones, setFilteredPhones] = useState<TPhone[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState("featured");
  const { addItem } = useCart();
  const searchParams = useSearchParams();

  const [phones, setProducts] = useState<TPhone[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${globalVariables.url}/api/phones`);
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
      setFilteredPhones(data);
    }
  };

  useEffect(() => {
    const uniqueBrands = Array.from(
      new Set(phones.map((phone) => phone.brand))
    );
    setBrands(uniqueBrands);
    // Apply initial filters from URL
    const urlBrands = searchParams.get("brand")?.split(",") || [];
    const urlMinPrice = Number(searchParams.get("minPrice")) || 0;
    const urlMaxPrice = Number(searchParams.get("maxPrice")) || 2000000;
    const urlSortBy = searchParams.get("sortBy") || "featured";

    setSelectedBrands(urlBrands);
    setPriceRange([urlMinPrice, urlMaxPrice]);
    setSortBy(urlSortBy);

    applyFilters(urlBrands, [urlMinPrice, urlMaxPrice], urlSortBy);
  }, [searchParams, phones]);

  const applyFilters = (
    brands: string[],
    price: [number, number],
    sort: string
  ) => {
    const filtered = phones.filter((phone) => {
      const brandMatch = brands.length === 0 || brands.includes(phone.brand);
      const priceMatch =
        phone.specs.originalPrice >= price[0] &&
        phone.specs.originalPrice <= price[1];

      return brandMatch && priceMatch;
    });

    // Apply sorting
    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.specs.originalPrice - b.specs.originalPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.specs.originalPrice - a.specs.originalPrice);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
        );
        break;
      // case "rating":
      //   filtered.sort((a, b) => b.rating - a.rating);
      //   break;
      default:
        // 'featured' - no specific sorting, assume phones are already in featured order
        break;
    }

    setFilteredPhones(filtered);
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
    applyFilters(
      updatedBrands,
      priceRange,
      sortBy
    );
  };



  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
    applyFilters(
      selectedBrands,
      value as [number, number],
      sortBy
    );
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters(
      selectedBrands,
      priceRange,
      value
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setSortBy("featured");
    applyFilters([], [0, 2000], "featured");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Filters */}
        <div className="w-full lg:w-1/4 space-y-6">
          <FilterButton>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Brand Filter */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Brand</h3>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <div
                          key={brand}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`brand-${brand.toLowerCase()}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => handleBrandChange(brand)}
                          />
                          <label
                            htmlFor={`brand-${brand.toLowerCase()}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Price Range</h3>
                    <Slider
                      defaultValue={[0, 2000]}
                      max={2000}
                      step={50}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FilterButton>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 space-y-6">
          {/* Search Bar */}
          <Card>
            <CardContent className="p-6">
              {/* <SearchBar /> */}
            </CardContent>
          </Card>

          {/* Results Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                Showing {filteredPhones?.length} of {phones.length} results
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="rounded-none">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-none">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhones?.map((phone) => (
              <Card key={phone._id} className="overflow-hidden">
                <div className="relative pt-4 px-4">
                  {phone.isNew && (
                    <Badge className="absolute top-6 right-6 z-10">New</Badge>
                  )}
                  <Link href={`/phones/${phone._id}`}>
                    <div className="relative h-48 w-full mb-2">
                      <Image
                        src={phone.specs.image || "/placeholder.svg"}
                        alt={phone.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    {phone.brand}
                  </div>
                  <Link
                    href={`/phones/${phone._id}`}
                    className="hover:underline"
                  >
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      {phone.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div className="font-bold">
                      ${phone.specs.originalPrice}
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm">{phone.ratting}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex gap-2">
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => addItem(phone._id as string)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {/* For simplicity, we'll just show a "Load More" button instead of full pagination */}
          {filteredPhones?.length < phones.length && (
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
