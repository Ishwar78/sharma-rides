import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";
import { cars } from "@/data/cars";
import { ArrowRight } from "lucide-react";

export const CarsShowcase = () => {
  const featuredCars = cars.slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Our Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Popular Cars
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/cars">
              View All Cars
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};
