"use client";

import { useEffect, useState} from "react";
import { globalVariables, type TPhone } from "@/lib/db";
import PhonesFilters from "@/components/modules/commerce/phoneFilters";
import PhoneGrid from "@/components/modules/commerce/phoneGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function PhonesPage() {
  const [phones, setPhones] = useState<TPhone[]>([]);
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    brands: [] as string[],
    priceRange: [0, 200000] as [number, number],
    sortBy: "featured",
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch(`${globalVariables.url}/api/brands`);
      const data = await res.json();
      setAllBrands(data);
    };
    fetchBrands();
  }, []);

  const fetchPhones = async () => {
    setIsLoading(true);
    const query = new URLSearchParams({
      brand: filters.brands.join(","),
      minPrice: filters.priceRange[0].toString(),
      maxPrice: filters.priceRange[1].toString(),
      sort: filters.sortBy,
      limit: "9",
      page: filters.page.toString(),
    });

    const res = await fetch(`${globalVariables.url}/api/phones?${query}`);
    const data = await res.json();
    if (filters.page === 1) setPhones(data);
    else setPhones((prev) => [...prev, ...data]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPhones();
  }, [filters]);

  const handleBrandChange = (brand: string) => {
    const updated = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    setFilters({ ...filters, brands: updated, page: 1 });
  };

  const handlePriceChange = (range: [number, number]) => {
    setFilters({ ...filters, priceRange: range, page: 1 });
  };

  const handleSortChange = (sortBy: string) => {
    setFilters({ ...filters, sortBy, page: 1 });
  };

  const handleReset = () => {
    setFilters({
      brands: [],
      priceRange: [0, 200000],
      sortBy: "featured",
      page: 1,
    });
  };

  const handleLoadMore = () => {
    setFilters({ ...filters, page: filters.page + 1 });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/4">
        <PhonesFilters
          brands={allBrands}
          selectedBrands={filters.brands}
          priceRange={filters.priceRange}
          onBrandChange={handleBrandChange}
          onPriceChange={handlePriceChange}
          onReset={handleReset}
        />
      </div>
      <div className="w-full lg:w-3/4">
       <div className="flex justify-between items-center mb-4">
          <div className="flex items-center w-full justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {phones.length} results
            </p>
            {/* Sorting dropdown */}
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
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
          </div>
        </div>
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-1/3 bg-gray-100 animate-pulse rounded-lg"
                />
              ))}
          </div>
        )}

        <PhoneGrid phones={phones} />
        {phones.length > 0 && (
          <div className="flex justify-center mt-8">
            <button className="btn btn-outline" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
