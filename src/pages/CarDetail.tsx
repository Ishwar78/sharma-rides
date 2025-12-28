import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { cars } from "@/data/cars";
import { Users, Fuel, Settings, Briefcase, Check, ArrowLeft, Phone } from "lucide-react";

const CarDetail = () => {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id);

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

  const whatsappMessage = `Hello Sharma Car Rent, I want to book ${car.name}. Please share availability and pricing.`;
  const whatsappUrl = `https://wa.me/919053860397?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-28 pb-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-gold transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/cars" className="text-muted-foreground hover:text-gold transition-colors">
              Cars
            </Link>
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
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-gold text-navy text-sm font-semibold px-4 py-2 rounded-full uppercase">
                  {car.type}
                </span>
              </div>
            </div>

            {/* Details */}
            <div>
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cars
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {car.name}
              </h1>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {car.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Seats</div>
                  <div className="font-semibold text-foreground">{car.seats}</div>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Settings className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Transmission</div>
                  <div className="font-semibold text-foreground">{car.transmission}</div>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Fuel className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Fuel Type</div>
                  <div className="font-semibold text-foreground">{car.fuelType}</div>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Briefcase className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Luggage</div>
                  <div className="font-semibold text-foreground">{car.luggage} Bags</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-gold shrink-0" />
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
                    <div className="text-3xl font-bold text-gold">
                      ₹{car.pricePerDay.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Per KM</div>
                    <div className="text-3xl font-bold text-gold">
                      ₹{car.pricePerKm}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="lg" className="flex-1" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Book Now on WhatsApp
                  </a>
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
    </Layout>
  );
};

export default CarDetail;
