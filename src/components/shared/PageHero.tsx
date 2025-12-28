import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HeroCarousel } from "@/components/shared/HeroCarousel";

interface PageHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  children?: ReactNode;
}

export const PageHero = ({ badge, title, titleHighlight, description, children }: PageHeroProps) => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden min-h-[50vh] flex items-center">
      {/* Background Carousel */}
      <HeroCarousel />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {badge && (
            <span className="inline-block text-[hsl(38,90%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}{" "}
            {titleHighlight && (
              <span className="text-gradient-gold">{titleHighlight}</span>
            )}
          </h1>
          {description && (
            <p className="text-lg text-white/80">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
