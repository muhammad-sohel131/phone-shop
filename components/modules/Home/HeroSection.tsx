import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Choose your dream phone
          </h1>
          <p className="text-xl text-muted-foreground">
            Compare features, read reviews, and make informed decisions
            with our comprehensive phone finder platform.
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
            src="/phoneBanner.jpg"
            alt="Latest smartphones"
            width={600}
            height={800}
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
