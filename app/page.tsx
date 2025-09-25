import { Button } from "@/components/ui/button";
import { SearchIcon, UsersIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import FeaturedPhones from "@/components/modules/commerce/featured-phones";
import SearchBar from "@/components/search-bar";
import { SearchParamsProvider } from "@/components/search-params-provider";
import HeroSection from "@/components/modules/Home/HeroSection";
import FeaturesSection from "@/components/modules/Home/FeaturesSection";

export default function Home() {
  return (
    <SearchParamsProvider>
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        {/* Search Section */}
        <section className="py-12 bg-muted rounded-lg px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Find Your Perfect Match
              </h2>
              <p className="text-muted-foreground">
                Search by brand, price range, features, or specifications to
                find the smartphone that meets your needs.
              </p>
            </div>
            <SearchBar />
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* Featured Phones */}
        <section className="py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Newest Phones</h2>
            <Button asChild variant="outline">
              <Link href="/phones">View All</Link>
            </Button>
          </div>
          <FeaturedPhones />
        </section>
      </div>
    </SearchParamsProvider>
  );
}
