import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car } from "@/data/cars";
import { Users, Fuel, Settings, ArrowRight } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";

interface CarCardProps {
  car: Car;
  index?: number;
}

export const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div 
        className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-500 border border-border hover:border-gold/30 animate-fade-up hover:-translate-y-2"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Image - Clickable */}
        <Link to={`/cars/${car.id}`} className="block relative overflow-hidden aspect-[4/3]">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* View Details Arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-gold">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-gold text-primary text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
              {car.type}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          {/* Title - Clickable */}
          <Link to={`/cars/${car.id}`}>
            <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
              {car.name}
            </h3>
          </Link>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gold" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-gold" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-gold" />
              <span>{car.fuelType}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
            <div>
              <span className="text-2xl font-bold text-gold">₹{car.pricePerDay.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm">/day</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">₹{car.pricePerKm}/km</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="gold"
              size="sm"
              className="flex-1 group/btn"
              onClick={() => setIsBookingOpen(true)}
            >
              Book Now
            </Button>
            <Button variant="outline" size="sm" asChild className="group/btn">
              <Link to={`/cars/${car.id}`}>
                Details
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        carName={car.name}
      />
    </>
  );
};