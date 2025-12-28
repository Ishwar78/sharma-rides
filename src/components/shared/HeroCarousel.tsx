import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

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
  useVideo?: boolean;
}

export const HeroCarousel = ({ className, useVideo = true }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(useVideo);

  useEffect(() => {
    if (showVideo) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [showVideo]);

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Video Background */}
      {showVideo && (
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            ref={(video) => {
              if (video) {
                if (isVideoPlaying) {
                  video.play().catch(() => {});
                } else {
                  video.pause();
                }
              }
            }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Fallback Images (when video is not used) */}
      {!showVideo && heroImages.map((image, index) => (
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/75 to-primary/90" />

      {/* Video/Image Toggle & Play/Pause Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        {/* Toggle between video and images */}
        <div className="flex bg-primary-foreground/10 backdrop-blur-md rounded-full p-1 border border-primary-foreground/20">
          <button
            onClick={() => setShowVideo(true)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              showVideo 
                ? "bg-gold text-primary" 
                : "text-primary-foreground/70 hover:text-primary-foreground"
            )}
          >
            Video
          </button>
          <button
            onClick={() => setShowVideo(false)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              !showVideo 
                ? "bg-gold text-primary" 
                : "text-primary-foreground/70 hover:text-primary-foreground"
            )}
          >
            Gallery
          </button>
        </div>

        {/* Video Play/Pause */}
        {showVideo && (
          <button
            onClick={toggleVideo}
            className="w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
            {isVideoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
        )}

        {/* Gallery Dots */}
        {!showVideo && (
          <div className="flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-gold w-8"
                    : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};