import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

export const CTASection = () => {
  const handleWhatsApp = () => {
    const message = "Hello Sharma Car Rent, I want to book a car.";
    window.open(`https://wa.me/919053860397?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-soft" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <Phone className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-medium">Available 24/7</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up stagger-1 font-playfair">
            Need a Car Right Now?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-xl mx-auto animate-fade-up stagger-2">
            Contact us instantly for immediate booking. We're available 24/7 to serve you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleWhatsApp}
              className="group shadow-gold animate-glow"
            >
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              WhatsApp Now
            </Button>
            <Button variant="heroOutline" size="lg" asChild className="group">
              <a href="tel:9053860397">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Call: 9053860397
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};