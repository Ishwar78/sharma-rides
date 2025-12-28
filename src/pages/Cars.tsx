import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CarCard } from "@/components/cars/CarCard";
import { cars, Car } from "@/data/cars";
import { cn } from "@/lib/utils";

type CarType = "all" | "sedan" | "suv" | "luxury";

const filters: { label: string; value: CarType }[] = [
  { label: "All Cars", value: "all" },
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Luxury", value: "luxury" },
];

const Cars = () => {
  const [activeFilter, setActiveFilter] = useState<CarType>("all");

  const filteredCars = cars.filter(
    (car) => activeFilter === "all" || car.type === activeFilter
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Our Fleet
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Choose Your <span className="text-gradient-gold">Perfect Ride</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              From compact sedans to luxury cars, find the perfect vehicle for your journey.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Filters & Cars */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-all duration-300",
                  activeFilter === filter.value
                    ? "bg-gold text-navy shadow-gold"
                    : "bg-muted text-foreground hover:bg-muted/80"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-8 text-center">
            Showing {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"}
          </p>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* No Results */}
          {filteredCars.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No cars found in this category. Please try a different filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cars;
