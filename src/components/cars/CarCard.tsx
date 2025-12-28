import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car } from "@/data/cars";
import { Users, Fuel, Settings, ArrowRight } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-border">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-[hsl(38,90%,50%)] text-[hsl(220,60%,20%)] text-xs font-semibold px-3 py-1 rounded-full uppercase">
              {car.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-[hsl(38,90%,50%)] transition-colors">
            {car.name}
          </h3>

          {/* Features */}
          <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{car.seats}</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings className="w-4 h-4" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              <span>{car.fuelType}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-2xl font-bold text-[hsl(38,90%,50%)]">₹{car.pricePerDay.toLocaleString()}</span>
            <span className="text-muted-foreground text-sm">/day</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="gold"
              size="sm"
              className="flex-1"
              onClick={() => setIsBookingOpen(true)}
            >
              Book Now
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/cars/${car.id}`}>
                <ArrowRight className="w-4 h-4" />
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
