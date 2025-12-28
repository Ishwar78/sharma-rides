import { MapPin, Plane, Heart, Building, Car, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: MapPin,
    title: "Local City Rides",
    description: "Comfortable rides within the city for shopping, meetings, or daily commute.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Car,
    title: "Outstation Trips",
    description: "Long-distance travel made easy with our reliable vehicles and drivers.",
    color: "from-gold to-gold-light",
  },
  {
    icon: Plane,
    title: "Airport Pickup & Drop",
    description: "Timely airport transfers to ensure you never miss a flight.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Heart,
    title: "Wedding & Event Cars",
    description: "Luxury vehicles to make your special occasions even more memorable.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Building,
    title: "Corporate Travel",
    description: "Professional transportation solutions for businesses and executives.",
    color: "from-violet-500 to-violet-600",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-up">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 animate-fade-up stagger-1 font-playfair">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-up stagger-2">
            From daily commutes to special occasions, we have the perfect ride for every journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border hover:border-gold/30 animate-fade-up relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-gold transition-all transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};