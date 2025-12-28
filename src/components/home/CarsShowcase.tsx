import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";
import { cars } from "@/data/cars";
import { ArrowRight, Sparkles } from "lucide-react";

export const CarsShowcase = () => {
  const featuredCars = cars.slice(0, 4);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold font-semibold text-sm uppercase tracking-widest">
                Our Fleet
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-playfair">
              Popular Cars
            </h2>
          </div>
          <Button variant="outline" asChild className="group animate-fade-up stagger-1 self-start md:self-auto">
            <Link to="/cars">
              View All Cars
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};