import { useState, useEffect } from "react";
import { Tag, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const offers = [
  {
    id: 1,
    title: "Weekend Getaway",
    discount: "20% OFF",
    description: "Book any SUV for weekend trips and get flat 20% discount",
    validTill: "2025-01-15",
    code: "WEEKEND20",
    bgGradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconBg: "bg-amber-500/20",
    popular: true
  },
  {
    id: 2,
    title: "First Ride Free",
    discount: "₹500 OFF",
    description: "New customers get ₹500 off on their first booking",
    validTill: "2025-02-28",
    code: "FIRST500",
    bgGradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    popular: false
  },
  {
    id: 3,
    title: "Airport Transfer",
    discount: "15% OFF",
    description: "Special discount on all airport pickup and drop services",
    validTill: "2025-01-31",
    code: "AIRPORT15",
    bgGradient: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    popular: false
  },
  {
    id: 4,
    title: "Wedding Special",
    discount: "25% OFF",
    description: "Book decorated premium cars for wedding with 25% discount",
    validTill: "2025-03-31",
    code: "WEDDING25",
    bgGradient: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    iconBg: "bg-pink-500/20",
    popular: true
  }
];

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Clock className="w-3 h-3" />
      <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m left</span>
    </div>
  );
};

export const SpecialOffersSection = () => {
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleWhatsAppBooking = (offer: typeof offers[0]) => {
    const message = `Hi, I want to use the ${offer.title} offer (Code: ${offer.code}) for booking a car.`;
    window.open(`https://wa.me/919053860397?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Floating sparkles */}
      <Sparkles className="absolute top-20 right-20 w-6 h-6 text-gold/30 animate-pulse" />
      <Sparkles className="absolute bottom-32 left-32 w-4 h-4 text-gold/20 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-up">
            <Tag className="w-4 h-4" />
            Limited Time Offers
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 animate-fade-up font-playfair">
            Special Discounts For You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-up">
            Grab these exclusive deals before they expire! Save big on your next journey.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={cn(
                "group relative bg-card rounded-2xl p-6 shadow-card border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-up overflow-hidden",
                offer.borderColor
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity",
                offer.bgGradient
              )} />

              {/* Popular Badge */}
              {offer.popular && (
                <div className="absolute -top-1 -right-1 bg-gold text-primary text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                  POPULAR
                </div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                  offer.iconBg
                )}>
                  <Tag className="w-6 h-6 text-foreground" />
                </div>

                {/* Discount */}
                <div className="text-3xl font-bold text-gold mb-2 font-playfair">
                  {offer.discount}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {offer.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {offer.description}
                </p>

                {/* Countdown */}
                <div className="mb-4">
                  <CountdownTimer targetDate={offer.validTill} />
                </div>

                {/* Promo Code */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 bg-background/50 border border-dashed border-border rounded-lg px-3 py-2 text-center">
                    <span className="font-mono font-bold text-foreground tracking-wider">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs font-medium transition-colors"
                  >
                    Copy
                  </button>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleWhatsAppBooking(offer)}
                  className="w-full bg-gold/20 hover:bg-gold text-foreground hover:text-primary border border-gold/30 hover:border-gold transition-all duration-300 group/btn"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          * Terms and conditions apply. Offers cannot be combined with other discounts.
        </p>
      </div>
    </section>
  );
};
