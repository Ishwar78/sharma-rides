import { MapPin, Plane, Heart, Building, Car } from "lucide-react";

const services = [
  {
    icon: MapPin,
    title: "Local City Rides",
    description: "Comfortable rides within the city for shopping, meetings, or daily commute.",
  },
  {
    icon: Car,
    title: "Outstation Trips",
    description: "Long-distance travel made easy with our reliable vehicles and drivers.",
  },
  {
    icon: Plane,
    title: "Airport Pickup & Drop",
    description: "Timely airport transfers to ensure you never miss a flight.",
  },
  {
    icon: Heart,
    title: "Wedding & Event Cars",
    description: "Luxury vehicles to make your special occasions even more memorable.",
  },
  {
    icon: Building,
    title: "Corporate Travel",
    description: "Professional transportation solutions for businesses and executives.",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From daily commutes to special occasions, we have the perfect ride for every journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-navy" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
