import { Button } from "@/components/ui/button";
import { SearchIcon, UsersIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FeaturedPhones from "@/components/modules/commerce/featured-phones";
import SearchBar from "@/components/search-bar";
import { Suspense } from "react";
import { SearchParamsProvider } from "@/components/search-params-provider";

export default function Home() {
  return (
    <SearchParamsProvider>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Choose your dream phone
              </h1>
              <p className="text-xl text-muted-foreground">
                Compare features, read reviews, and make informed decisions with
                our comprehensive phone finder platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/phones">Browse Phones</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/phoneBanner.jpg?height=800&width=600"
                alt="Latest smartphones"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

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
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Phone Shop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <SearchIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Search</h3>
              <p className="text-muted-foreground">
                Filter and compare phones based on specifications, price, and
                features.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Reviews</h3>
              <p className="text-muted-foreground">
                Read authentic reviews from verified buyers and tech
                enthusiasts.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <ShoppingCartIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Shopping</h3>
              <p className="text-muted-foreground">
                Purchase with confidence through our secure e-commerce platform.
              </p>
            </div>
          </div>
        </section>

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
