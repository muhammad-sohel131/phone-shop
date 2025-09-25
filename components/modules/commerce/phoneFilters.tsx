"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type FiltersProps = {
  brands: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  onBrandChange: (brand: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
};

export default function PhonesFilters({
  brands,
  selectedBrands,
  priceRange,
  onBrandChange,
  onPriceChange,
  onReset,
}: FiltersProps) {
  return (
    <div className="space-y-6 lg:sticky lg:top-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => onBrandChange(brand)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Price Range</h3>
        <Slider
          max={2000}
          step={50}
          value={priceRange}
          onValueChange={onPriceChange}
          className="my-6"
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
