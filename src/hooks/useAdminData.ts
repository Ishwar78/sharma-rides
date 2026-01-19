import { useState, useEffect } from "react";
import { cars as defaultCars, Car, testimonials as defaultTestimonials } from "@/data/cars";

// Default gallery images
const defaultGalleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop", title: "Toyota Fortuner", category: "SUV" },
  { id: 2, src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop", title: "Honda City", category: "Sedan" },
  { id: 3, src: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&h=600&fit=crop", title: "Maruti Swift", category: "Hatchback" },
  { id: 4, src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop", title: "Toyota Innova Crysta", category: "SUV" },
  { id: 5, src: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop", title: "Hyundai Creta", category: "SUV" },
  { id: 6, src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop", title: "Premium Sports Car", category: "Premium" },
  { id: 7, src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop", title: "Luxury Sedan", category: "Premium" },
  { id: 8, src: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop", title: "Mercedes Benz", category: "Premium" },
  { id: 9, src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop", title: "BMW Series", category: "Premium" },
  { id: 10, src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop", title: "Classic Muscle Car", category: "Premium" },
  { id: 11, src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop", title: "Audi A6", category: "Premium" },
  { id: 12, src: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&h=600&fit=crop", title: "Range Rover", category: "SUV" },
  { id: 13, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", title: "Wedding Car", category: "Wedding" },
  { id: 14, src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop", title: "Vintage Classic", category: "Wedding" },
  { id: 15, src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=600&fit=crop", title: "Executive Sedan", category: "Sedan" },
];

// Default about content
const defaultAboutContent = {
  heroTitle: "Your Trusted Partner for",
  heroHighlight: "Car Rentals",
  heroDescription: "Sharma Car Rent is a trusted car rental service providing safe, affordable, and comfortable rides for local and outstation travel.",
  storyTitle: "A Decade of Excellence in Car Rentals",
  storyContent1: "Founded with a vision to provide hassle-free transportation solutions, Sharma Car Rent has grown to become one of the most trusted names in the car rental industry. Our journey began with just a few cars and a commitment to customer satisfaction.",
  storyContent2: "Today, we proudly serve thousands of customers with a fleet of premium vehicles, ranging from economy sedans to luxury cars. Whether you need a car for a local trip, outstation journey, wedding, or corporate travel, we have the perfect solution for you.",
  stats: {
    years: "10+",
    vehicles: "50+",
    customers: "10K+",
    support: "24/7"
  }
};

// Default contact details
const defaultContactDetails = {
  phone: "+91 9053860397",
  whatsapp: "919053860397",
  email: "info@sharmacarrent.com",
  address1: "Main Market, Near Bus Stand",
  address2: "Your City, India",
  workingHours: "24/7 Available",
  workingDesc: "Always ready to serve you"
};

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
}

export interface AboutContent {
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  storyTitle: string;
  storyContent1: string;
  storyContent2: string;
  stats: {
    years: string;
    vehicles: string;
    customers: string;
    support: string;
  };
}

export interface ContactDetails {
  phone: string;
  whatsapp: string;
  email: string;
  address1: string;
  address2: string;
  workingHours: string;
  workingDesc: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>(defaultCars);

  useEffect(() => {
    const saved = localStorage.getItem("adminCars");
    if (saved) {
      try {
        setCars(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing cars from localStorage:", e);
      }
    }
  }, []);

  return cars;
};

export const useGallery = () => {
  const [gallery, setGallery] = useState<GalleryImage[]>(defaultGalleryImages);

  useEffect(() => {
    const saved = localStorage.getItem("adminGallery");
    if (saved) {
      try {
        setGallery(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing gallery from localStorage:", e);
      }
    }
  }, []);

  return gallery;
};

export const useAboutContent = () => {
  const [about, setAbout] = useState<AboutContent>(defaultAboutContent);

  useEffect(() => {
    const saved = localStorage.getItem("adminAbout");
    if (saved) {
      try {
        setAbout(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing about content from localStorage:", e);
      }
    }
  }, []);

  return about;
};

export const useContactDetails = () => {
  const [contact, setContact] = useState<ContactDetails>(defaultContactDetails);

  useEffect(() => {
    const saved = localStorage.getItem("adminContact");
    if (saved) {
      try {
        setContact(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing contact details from localStorage:", e);
      }
    }
  }, []);

  return contact;
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  useEffect(() => {
    const saved = localStorage.getItem("adminTestimonials");
    if (saved) {
      try {
        setTestimonials(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing testimonials from localStorage:", e);
      }
    }
  }, []);

  return testimonials;
};
