import { TPhone } from "@/lib/db";
import ProductCard from "./ProductCard";
import { Phone } from "@/models/Model";

export default async function FeaturedPhones() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/phones?limit=8&sort=recent`, {
    next: { tags: ["phones"] },
  })

  const featuredPhones: TPhone[] = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredPhones.map((phone) => (
        <ProductCard phone={phone} />
      ))}
    </div>
  );
}
