// components/features/FeaturesSection.tsx
import { SearchIcon, UsersIcon, ShoppingCartIcon } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <SearchIcon className="h-6 w-6 text-primary" />,
      title: "Advanced Search",
      description:
        "Filter and compare phones based on specifications, price, and features.",
    },
    {
      icon: <UsersIcon className="h-6 w-6 text-primary" />,
      title: "Community Reviews",
      description: "Read authentic reviews from verified buyers and tech enthusiasts.",
    },
    {
      icon: <ShoppingCartIcon className="h-6 w-6 text-primary" />,
      title: "Secure Shopping",
      description: "Purchase with confidence through our secure e-commerce platform.",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Phone Shop</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-card rounded-lg p-6 shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
