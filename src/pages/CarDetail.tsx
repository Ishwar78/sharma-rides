import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCars } from "@/hooks/useAdminData";
import { Users, Fuel, Settings, Briefcase, Check, ArrowLeft, Phone, ArrowRight } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { CarCard } from "@/components/cars/CarCard";

const CarDetail = () => {
  const { id } = useParams();
  const cars = useCars();
  const car = cars.find((c) => c.id === id);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Related cars (same type, excluding current)
  const relatedCars = car ? cars.filter((c) => c.type === car.type && c.id !== car.id).slice(0, 4) : [];

  if (!car) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Car Not Found</h1>
            <Button asChild>
              <Link to="/cars">
                <ArrowLeft className="w-4 h-4" />
                Back to Cars
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleWhatsApp = () => {
    const message = `Hello Sharma Car Rent, I want to book ${car.name}.`;
    window.open(`https://wa.me/919053860397?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-28 pb-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-gold transition-colors">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/cars" className="text-muted-foreground hover:text-gold transition-colors">Cars</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{car.name}</span>
          </div>
        </div>
      </section>

      {/* Car Details */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative animate-fade-up">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-gold text-primary text-sm font-semibold px-4 py-2 rounded-full uppercase shadow-lg">
                  {car.type}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="animate-fade-up stagger-1">
              <Link to="/cars" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-4 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Cars
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">{car.name}</h1>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{car.description}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Users, label: "Seats", value: car.seats },
                  { icon: Settings, label: "Transmission", value: car.transmission },
                  { icon: Fuel, label: "Fuel Type", value: car.fuelType },
                  { icon: Briefcase, label: "Luggage", value: `${car.luggage} Bags` },
                ].map((spec, i) => (
                  <div key={i} className="bg-muted rounded-xl p-4 text-center group hover:bg-gold/10 transition-colors">
                    <spec.icon className="w-6 h-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-sm text-muted-foreground">{spec.label}</div>
                    <div className="font-semibold text-foreground">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-gold" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-muted rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Pricing</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Per Day</div>
                    <div className="text-3xl font-bold text-gold">₹{car.pricePerDay.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Per KM</div>
                    <div className="text-3xl font-bold text-gold">₹{car.pricePerKm}</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="lg" className="flex-1" onClick={() => setIsBookingOpen(true)}>
                  Book Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:9053860397">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-playfair">Related Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} carName={car.name} />
    </Layout>
  );
};

export default CarDetail;