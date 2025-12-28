import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop",
    title: "Toyota Fortuner",
    category: "SUV"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
    title: "Honda City",
    category: "Sedan"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&h=600&fit=crop",
    title: "Maruti Swift",
    category: "Hatchback"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    title: "Toyota Innova Crysta",
    category: "SUV"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop",
    title: "Hyundai Creta",
    category: "SUV"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    title: "Premium Sports Car",
    category: "Premium"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
    title: "Luxury Sedan",
    category: "Premium"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop",
    title: "Mercedes Benz",
    category: "Premium"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop",
    title: "BMW Series",
    category: "Premium"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
    title: "Classic Muscle Car",
    category: "Premium"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
    title: "Audi A6",
    category: "Premium"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&h=600&fit=crop",
    title: "Range Rover",
    category: "SUV"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    title: "Wedding Car",
    category: "Wedding"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop",
    title: "Vintage Classic",
    category: "Wedding"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=600&fit=crop",
    title: "Executive Sedan",
    category: "Sedan"
  },
];

const categories = ["All", "SUV", "Sedan", "Hatchback", "Premium", "Wedding"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <Layout>
      <PageHero
        title="Our Gallery"
        description="Browse our collection of premium vehicles available for rent"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-2.5 rounded-full font-medium transition-all duration-300",
                  selectedCategory === category
                    ? "bg-gold text-primary shadow-gold"
                    : "bg-card text-foreground border border-border hover:border-gold/50 hover:text-gold"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-card border border-border cursor-pointer animate-fade-up hover:shadow-xl hover:border-gold/30 transition-all duration-500"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setLightboxImage(image)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-gold text-sm font-medium">{image.category}</span>
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                    <ZoomIn className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground border border-border">
                  {image.category}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              Like what you see? Book your dream car today!
            </p>
            <a
              href="https://wa.me/919053860397?text=Hi%2C%20I%20saw%20your%20gallery%20and%20I%20am%20interested%20in%20booking%20a%20car."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-gold hover:shadow-lg hover:-translate-y-1"
            >
              Book Now via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="text-gold text-sm font-medium">{lightboxImage.category}</span>
              <h3 className="text-white font-bold text-xl">{lightboxImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
