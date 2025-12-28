import { Shield, Sparkles, BadgeDollarSign, Headphones, Users } from "lucide-react";

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

export const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Why Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose{" "}
              <span className="text-gradient-gold">Sharma Car Rent?</span>
            </h2>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
              We are committed to providing you with the best car rental experience. 
              Your comfort, safety, and satisfaction are our top priorities.
            </p>

            <div className="space-y-6">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-6">
            {features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className={`bg-card rounded-2xl p-6 shadow-card border border-border ${
                  index === 1 ? "translate-y-8" : ""
                } ${index === 3 ? "translate-y-8" : ""}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-navy" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
