import { Shield, Sparkles, BadgeDollarSign, Headphones, Users, Check } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted Service",
    description: "Years of experience serving thousands of happy customers with reliability.",
  },
  {
    icon: Sparkles,
    title: "Clean & Well-Maintained",
    description: "All vehicles are regularly serviced and thoroughly sanitized for your safety.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Pricing",
    description: "Competitive rates with no hidden charges. Best value for your money.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you whenever you need.",
  },
  {
    icon: Users,
    title: "Experienced Drivers",
    description: "Professional, courteous drivers with extensive knowledge of routes.",
  },
];

const highlights = [
  "No Hidden Charges",
  "Flexible Booking",
  "Wide Range of Cars",
  "Instant Confirmation",
  "GPS Enabled Vehicles",
  "Insurance Covered",
];

export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--gold)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Why Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-playfair">
              Why Choose{" "}
              <span className="text-gradient-gold">Sharma Car Rent?</span>
            </h2>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
              We are committed to providing you with the best car rental experience. 
              Your comfort, safety, and satisfaction are our top priorities.
            </p>

            {/* Features List */}
            <div className="space-y-5">
              {features.slice(0, 3).map((feature, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 group p-4 rounded-xl hover:bg-card transition-colors duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-foreground">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-5 animate-slide-in-right">
            {features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className={`bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-xl hover:border-gold/30 transition-all duration-500 group hover:-translate-y-2 ${
                  index === 1 || index === 3 ? "translate-y-8" : ""
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-lg group-hover:text-gold transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};