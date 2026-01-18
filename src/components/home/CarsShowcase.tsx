import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";
import { useCars } from "@/hooks/useAdminData";
import { ArrowRight, Sparkles } from "lucide-react";

export const CarsShowcase = () => {
  const cars = useCars();
  const featuredCars = cars.slice(0, 4);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                Popular Cars
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Premium <span className="text-gold">Fleet</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Choose from our carefully selected premium vehicles for a comfortable journey.
            </p>
          </div>
          <Button variant="outline" className="border-gold/30 text-foreground hover:border-gold hover:text-gold group" asChild>
            <Link to="/cars">
              View All Cars
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car, index) => (
            <div 
              key={car.id} 
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
