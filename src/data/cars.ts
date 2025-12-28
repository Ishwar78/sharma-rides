export interface Car {
  id: string;
  name: string;
  type: 'sedan' | 'suv' | 'luxury';
  seats: number;
  pricePerDay: number;
  pricePerKm: number;
  image: string;
  features: string[];
  description: string;
  transmission: string;
  fuelType: string;
  luggage: number;
}

export const cars: Car[] = [
  {
    id: "swift-dzire",
    name: "Maruti Swift Dzire",
    type: "sedan",
    seats: 4,
    pricePerDay: 2500,
    pricePerKm: 12,
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=60",
    features: ["AC", "Power Windows", "Music System", "GPS"],
    description: "Perfect compact sedan for city rides and short trips. Fuel efficient and comfortable.",
    transmission: "Manual",
    fuelType: "Petrol",
    luggage: 2,
  },
  {
    id: "honda-city",
    name: "Honda City",
    type: "sedan",
    seats: 4,
    pricePerDay: 3500,
    pricePerKm: 15,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=60",
    features: ["AC", "Power Windows", "Sunroof", "Leather Seats", "GPS"],
    description: "Premium sedan with excellent comfort and style. Ideal for business and leisure travel.",
    transmission: "Automatic",
    fuelType: "Petrol",
    luggage: 3,
  },
  {
    id: "toyota-innova",
    name: "Toyota Innova Crysta",
    type: "suv",
    seats: 7,
    pricePerDay: 5000,
    pricePerKm: 18,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60",
    features: ["AC", "Captain Seats", "Entertainment System", "Ample Luggage Space"],
    description: "Spacious MPV perfect for family trips and group travel. Comfortable and reliable.",
    transmission: "Automatic",
    fuelType: "Diesel",
    luggage: 5,
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    type: "suv",
    seats: 7,
    pricePerDay: 8000,
    pricePerKm: 25,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=60",
    features: ["4x4", "Leather Seats", "Climate Control", "Premium Audio", "Sunroof"],
    description: "Powerful SUV for those who want performance and luxury combined.",
    transmission: "Automatic",
    fuelType: "Diesel",
    luggage: 4,
  },
  {
    id: "mercedes-e",
    name: "Mercedes E-Class",
    type: "luxury",
    seats: 4,
    pricePerDay: 15000,
    pricePerKm: 45,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60",
    features: ["Premium Leather", "Ambient Lighting", "Panoramic Roof", "BOSE Sound", "Massage Seats"],
    description: "Ultimate luxury sedan for VIP travel and special occasions.",
    transmission: "Automatic",
    fuelType: "Petrol",
    luggage: 3,
  },
  {
    id: "bmw-5",
    name: "BMW 5 Series",
    type: "luxury",
    seats: 4,
    pricePerDay: 14000,
    pricePerKm: 42,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=60",
    features: ["Sport Package", "Head-up Display", "Harman Kardon", "Adaptive Cruise"],
    description: "The ultimate driving machine. Perfect for executives and luxury travel.",
    transmission: "Automatic",
    fuelType: "Petrol",
    luggage: 3,
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    type: "suv",
    seats: 7,
    pricePerDay: 3500,
    pricePerKm: 14,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60",
    features: ["AC", "Power Steering", "Music System", "Spacious Interior"],
    description: "Budget-friendly 7-seater perfect for family outings and group travel.",
    transmission: "Manual",
    fuelType: "Petrol/CNG",
    luggage: 4,
  },
  {
    id: "audi-a6",
    name: "Audi A6",
    type: "luxury",
    seats: 4,
    pricePerDay: 13000,
    pricePerKm: 40,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=60",
    features: ["Virtual Cockpit", "Matrix LED", "Quattro AWD", "Bang & Olufsen"],
    description: "Sophisticated luxury with cutting-edge technology and comfort.",
    transmission: "Automatic",
    fuelType: "Petrol",
    luggage: 3,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    text: "Excellent service! The car was spotless and the driver was very professional. Highly recommend Sharma Car Rent for outstation trips.",
    avatar: "RK",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Used their service for my wedding. The cars were beautiful and arrived on time. The team was very cooperative and helpful.",
    avatar: "PS",
  },
  {
    id: 3,
    name: "Amit Verma",
    location: "Jaipur",
    rating: 4,
    text: "Great experience with the Toyota Innova for our family trip. Clean car, good driver, and reasonable pricing. Will book again!",
    avatar: "AV",
  },
  {
    id: 4,
    name: "Sneha Patel",
    location: "Bangalore",
    rating: 5,
    text: "Professional service from start to finish. The airport pickup was seamless and the car was exactly as shown. Thank you!",
    avatar: "SP",
  },
];
