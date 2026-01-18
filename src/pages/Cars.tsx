import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CarCard } from "@/components/cars/CarCard";
import { useCars } from "@/hooks/useAdminData";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/shared/PageHero";

type CarType = "all" | "sedan" | "suv" | "luxury";

const filters: { label: string; value: CarType }[] = [
  { label: "All Cars", value: "all" },
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Luxury", value: "luxury" },
];

const Cars = () => {
  const [activeFilter, setActiveFilter] = useState<CarType>("all");
  const cars = useCars();

  const filteredCars = cars.filter(
    (car) => activeFilter === "all" || car.type === activeFilter
  );

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <PageHero
        badge="Our Fleet"
        title="Choose Your"
        titleHighlight="Perfect Ride"
        description="From compact sedans to luxury cars, find the perfect vehicle for your journey."
      />

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
                    ? "bg-[hsl(38,90%,50%)] text-[hsl(220,60%,20%)] shadow-lg"
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
