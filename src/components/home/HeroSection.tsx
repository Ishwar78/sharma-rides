import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "@/components/shared/HeroCarousel";

export const HeroSection = () => {
  const handleWhatsApp = () => {
    const message = "Hello Sharma Car Rent, I want to book a car.";
    window.open(`https://wa.me/919053860397?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <HeroCarousel />

      {/* Animated Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gold/5 rounded-full blur-2xl animate-pulse-soft pointer-events-none" />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-full px-5 py-2.5 mb-8 animate-fade-up shadow-lg">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              Trusted by 10,000+ Happy Customers
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-up stagger-1">
            <span className="font-playfair">Sharma Car Rent</span>
            <br />
            <span className="text-gradient-gold text-3xl md:text-4xl lg:text-5xl">Safe, Reliable & Affordable</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-normal opacity-90">Car Rentals</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up stagger-2">
            Book your ride anytime, anywhere with comfort and trust. 
            Premium vehicles for local rides, outstation trips, and special occasions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
            <Button variant="hero" size="lg" asChild className="group shadow-gold">
              <Link to="/cars">
                Book Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="whatsapp" size="lg" onClick={handleWhatsApp} className="group">
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              WhatsApp Us
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-primary-foreground/20 animate-fade-up stagger-4">
            {[
              { number: "50+", label: "Premium Cars" },
              { number: "10K+", label: "Happy Customers" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-3xl md:text-5xl font-bold text-gold mb-2 group-hover:scale-110 transition-transform font-playfair">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/70 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent" />
    </section>
  );
};