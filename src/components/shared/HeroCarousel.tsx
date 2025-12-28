import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=80",
    alt: "Luxury sports car on road",
  },
  {
    url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&auto=format&fit=crop&q=80",
    alt: "Premium SUV for family travel",
  },
  {
    url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&auto=format&fit=crop&q=80",
    alt: "Mercedes luxury sedan",
  },
  {
    url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&auto=format&fit=crop&q=80",
    alt: "BMW premium car",
  },
];

interface HeroCarouselProps {
  className?: string;
}

export const HeroCarousel = ({ className }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          )}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,60%,15%)/95] via-[hsl(220,60%,20%)/85] to-[hsl(220,60%,15%)/95]" />

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-[hsl(38,90%,50%)] w-8"
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
