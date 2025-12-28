import { Star, Quote, Camera } from "lucide-react";

const customerReviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Delhi",
    rating: 5,
    text: "Excellent service! The car was spotless and the driver was very professional. Highly recommend Sharma Car Rent for all your travel needs.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    carRented: "Toyota Innova",
    date: "Dec 2024"
  },
  {
    id: 2,
    name: "Priya Verma",
    location: "Gurugram",
    rating: 5,
    text: "Best car rental experience I've ever had. Affordable prices and premium quality vehicles. Will definitely use again!",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    carRented: "Swift Dzire",
    date: "Dec 2024"
  },
  {
    id: 3,
    name: "Amit Singh",
    location: "Noida",
    rating: 5,
    text: "Very punctual service. The booking process was smooth and the car was exactly as shown. Great value for money!",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    carRented: "Ertiga",
    date: "Nov 2024"
  },
  {
    id: 4,
    name: "Neha Gupta",
    location: "Faridabad",
    rating: 4,
    text: "Comfortable ride and friendly staff. The only minor issue was a slight delay, but overall a great experience.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    carRented: "Honda City",
    date: "Nov 2024"
  },
  {
    id: 5,
    name: "Vikram Patel",
    location: "Ghaziabad",
    rating: 5,
    text: "Used their service for a wedding. Everything was perfect - from the decorated car to the courteous driver. Thank you!",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    carRented: "Fortuner",
    date: "Oct 2024"
  },
  {
    id: 6,
    name: "Kavita Joshi",
    location: "Delhi NCR",
    rating: 5,
    text: "Safe and reliable service. As a solo female traveler, I felt completely secure. The driver was very respectful and professional.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    carRented: "Etios",
    date: "Oct 2024"
  }
];

export const CustomerReviewsSection = () => {
  const averageRating = (customerReviews.reduce((acc, r) => acc + r.rating, 0) / customerReviews.length).toFixed(1);
  
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-up">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 animate-fade-up font-playfair">
            Real Stories, Real Customers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-up mb-8">
            Join thousands of satisfied customers who trust us for their travel needs.
          </p>
          
          {/* Overall Rating Badge */}
          <div className="inline-flex items-center gap-4 bg-card rounded-2xl px-8 py-4 shadow-card border border-gold/20 animate-fade-up">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold">{averageRating}</div>
              <div className="flex gap-1 justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-left">
              <div className="font-bold text-foreground">Excellent</div>
              <div className="text-sm text-muted-foreground">Based on {customerReviews.length * 100}+ reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerReviews.map((review, index) => (
            <div
              key={review.id}
              className="group bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-xl hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 animate-fade-up relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Header with Photo */}
              <div className="flex items-start gap-4 mb-4 relative">
                <div className="relative">
                  <img
                    src={review.photo}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold/30 group-hover:border-gold transition-colors shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                    <Camera className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-foreground">{review.name}</div>
                  <div className="text-muted-foreground text-sm">{review.location}</div>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                          i < review.rating ? "text-gold fill-gold" : "text-muted"
                        }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <Quote className="w-8 h-8 text-gold/20 group-hover:text-gold/40 transition-colors flex-shrink-0" />
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                "{review.text}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border text-xs">
                <span className="text-gold font-medium">{review.carRented}</span>
                <span className="text-muted-foreground">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-up">
          <p className="text-muted-foreground mb-4">
            Want to share your experience?
          </p>
          <a
            href="https://wa.me/919053860397?text=I%20would%20like%20to%20share%20my%20review%20about%20Sharma%20Car%20Rent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors group"
          >
            Write a Review
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
