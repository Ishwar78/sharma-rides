import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "@/components/shared/HeroCarousel";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <HeroCarousel />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(38,90%,50%)]/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(220,50%,30%)]/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-[hsl(38,90%,50%)] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Trusted by 10,000+ Happy Customers
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Sharma Car Rent – <br />
            <span className="text-gradient-gold">Safe, Reliable & Affordable</span><br />
            Car Rentals
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Book your ride anytime, anywhere with comfort and trust. 
            Premium vehicles for local rides, outstation trips, and special occasions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/cars">
                Book Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href="https://wa.me/919053860397?text=Hello%20Sharma%20Car%20Rent%2C%20I%20want%20to%20book%20a%20car."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { number: "50+", label: "Premium Cars" },
              { number: "10K+", label: "Happy Customers" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[hsl(38,90%,50%)] mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
