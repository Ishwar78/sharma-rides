import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cars as initialCars, Car, testimonials as initialTestimonials } from "@/data/cars";
import {
  Car as CarIcon,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Menu,
  Home,
  Users,
  Settings,
  FileText,
  Phone,
  Image,
  Info,
  LogOut,
  Star,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ImageUpload } from "@/components/admin/ImageUpload";

type Tab = "about" | "cars" | "gallery" | "testimonials" | "contact" | "settings";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
}

interface AboutContent {
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  storyTitle: string;
  storyDescription1: string;
  storyDescription2: string;
  yearsExperience: string;
  premiumVehicles: string;
  happyCustomers: string;
  supportHours: string;
}

interface ContactDetails {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
}

const defaultGalleryImages: GalleryImage[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop", title: "Toyota Fortuner", category: "SUV" },
  { id: 2, src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop", title: "Honda City", category: "Sedan" },
  { id: 3, src: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&h=600&fit=crop", title: "Maruti Swift", category: "Hatchback" },
  { id: 4, src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop", title: "Toyota Innova Crysta", category: "SUV" },
  { id: 5, src: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop", title: "Hyundai Creta", category: "SUV" },
  { id: 6, src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop", title: "Premium Sports Car", category: "Premium" },
];

const defaultAboutContent: AboutContent = {
  heroTitle: "Your Trusted Partner for",
  heroTitleHighlight: "Car Rentals",
  heroDescription: "Sharma Car Rent is a trusted car rental service providing safe, affordable, and comfortable rides for local and outstation travel.",
  storyTitle: "A Decade of Excellence in Car Rentals",
  storyDescription1: "Founded with a vision to provide hassle-free transportation solutions, Sharma Car Rent has grown to become one of the most trusted names in the car rental industry. Our journey began with just a few cars and a commitment to customer satisfaction.",
  storyDescription2: "Today, we proudly serve thousands of customers with a fleet of premium vehicles, ranging from economy sedans to luxury cars. Whether you need a car for a local trip, outstation journey, wedding, or corporate travel, we have the perfect solution for you.",
  yearsExperience: "10+",
  premiumVehicles: "50+",
  happyCustomers: "10K+",
  supportHours: "24/7",
};

const defaultContactDetails: ContactDetails = {
  phone: "9053860397",
  whatsapp: "919053860397",
  email: "info@sharmacarrent.com",
  address: "Main Market, Near Bus Stand, Your City, India",
  workingHours: "24/7 Available",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Cars State
  const [cars, setCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem("adminCars");
    return saved ? JSON.parse(saved) : initialCars;
  });
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [newCar, setNewCar] = useState<Partial<Car>>({
    name: "",
    type: "sedan",
    seats: 4,
    pricePerDay: 0,
    pricePerKm: 0,
    image: "",
    description: "",
    transmission: "Manual",
    fuelType: "Petrol",
    luggage: 2,
    features: [],
  });

  // Gallery State
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem("adminGallery");
    return saved ? JSON.parse(saved) : defaultGalleryImages;
  });
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [newImage, setNewImage] = useState({ src: "", title: "", category: "SUV" });
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // About Content State
  const [aboutContent, setAboutContent] = useState<AboutContent>(() => {
    const saved = localStorage.getItem("adminAbout");
    return saved ? JSON.parse(saved) : defaultAboutContent;
  });

  // Contact Details State
  const [contactDetails, setContactDetails] = useState<ContactDetails>(() => {
    const saved = localStorage.getItem("adminContact");
    return saved ? JSON.parse(saved) : defaultContactDetails;
  });

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("adminTestimonials");
    return saved ? JSON.parse(saved) : initialTestimonials;
  });
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    location: "",
    rating: 5,
    text: "",
    avatar: "",
  });
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/sharmacar/admin");
    }
  }, [navigate]);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("adminCars", JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem("adminGallery", JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem("adminAbout", JSON.stringify(aboutContent));
  }, [aboutContent]);

  useEffect(() => {
    localStorage.setItem("adminContact", JSON.stringify(contactDetails));
  }, [contactDetails]);

  useEffect(() => {
    localStorage.setItem("adminTestimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({ title: "Logged Out", description: "You have been logged out successfully." });
    navigate("/sharmacar/admin");
  };

  // Car Functions
  const handleDeleteCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
    toast({ title: "Car Deleted", description: "The car has been removed from the fleet." });
  };

  const handleSaveCar = () => {
    if (editingCar) {
      setCars(cars.map((car) => (car.id === editingCar.id ? editingCar : car)));
      setEditingCar(null);
      toast({ title: "Car Updated", description: "The car details have been saved." });
    }
  };

  const handleAddCar = () => {
    if (!newCar.name || !newCar.image) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    const car: Car = {
      ...newCar,
      id: `car-${Date.now()}`,
      features: newCar.features || [],
    } as Car;
    setCars([...cars, car]);
    setIsAddingCar(false);
    setNewCar({
      name: "",
      type: "sedan",
      seats: 4,
      pricePerDay: 0,
      pricePerKm: 0,
      image: "",
      description: "",
      transmission: "Manual",
      fuelType: "Petrol",
      luggage: 2,
      features: [],
    });
    toast({ title: "Car Added", description: "The new car has been added to the fleet." });
  };

  // Gallery Functions
  const handleAddGalleryImage = () => {
    if (!newImage.src || !newImage.title) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    const image: GalleryImage = {
      id: Date.now(),
      ...newImage,
    };
    setGalleryImages([...galleryImages, image]);
    setIsAddingImage(false);
    setNewImage({ src: "", title: "", category: "SUV" });
    toast({ title: "Image Added", description: "The new image has been added to the gallery." });
  };

  const handleDeleteGalleryImage = (id: number) => {
    setGalleryImages(galleryImages.filter((img) => img.id !== id));
    toast({ title: "Image Deleted", description: "The image has been removed from the gallery." });
  };

  const handleSaveGalleryImage = () => {
    if (editingImage) {
      setGalleryImages(galleryImages.map((img) => (img.id === editingImage.id ? editingImage : img)));
      setEditingImage(null);
      toast({ title: "Image Updated", description: "The image details have been saved." });
    }
  };

  // About Functions
  const handleSaveAbout = () => {
    localStorage.setItem("adminAbout", JSON.stringify(aboutContent));
    toast({ title: "About Content Saved", description: "The about page content has been updated." });
  };

  // Contact Functions
  const handleSaveContact = () => {
    localStorage.setItem("adminContact", JSON.stringify(contactDetails));
    toast({ title: "Contact Details Saved", description: "The contact information has been updated." });
  };

  // Testimonial Functions
  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.text) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    const testimonial: Testimonial = {
      id: Date.now(),
      name: newTestimonial.name || "",
      location: newTestimonial.location || "",
      rating: newTestimonial.rating || 5,
      text: newTestimonial.text || "",
      avatar: newTestimonial.avatar || newTestimonial.name?.slice(0, 2).toUpperCase() || "NA",
    };
    setTestimonials([...testimonials, testimonial]);
    setIsAddingTestimonial(false);
    setNewTestimonial({ name: "", location: "", rating: 5, text: "", avatar: "" });
    toast({ title: "Testimonial Added", description: "The new testimonial has been added." });
  };

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    toast({ title: "Testimonial Deleted", description: "The testimonial has been removed." });
  };

  const handleSaveTestimonial = () => {
    if (editingTestimonial) {
      setTestimonials(testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t)));
      setEditingTestimonial(null);
      toast({ title: "Testimonial Updated", description: "The testimonial has been saved." });
    }
  };

  const tabs = [
    { id: "about" as Tab, label: "About Page", icon: Info },
    { id: "cars" as Tab, label: "Manage Cars", icon: CarIcon },
    { id: "gallery" as Tab, label: "Gallery", icon: Image },
    { id: "testimonials" as Tab, label: "Testimonials", icon: MessageSquare },
    { id: "contact" as Tab, label: "Contact Details", icon: Phone },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-primary text-primary-foreground transition-all duration-300 flex flex-col fixed h-full z-40 lg:relative",
          sidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-primary-foreground/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center shrink-0">
              <CarIcon className="w-6 h-6 text-primary" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold">Admin Panel</h1>
                <p className="text-xs text-primary-foreground/70">Sharma Car Rent</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                activeTab === tab.id
                  ? "bg-gold text-primary"
                  : "hover:bg-primary-foreground/10"
              )}
            >
              <tab.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">{tab.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary-foreground/20 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">View Website</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/20 text-destructive-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Users className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-medium text-foreground hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* About Page Management */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                <h3 className="text-lg font-semibold mb-6">Hero Section</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Hero Title</label>
                    <Input
                      value={aboutContent.heroTitle}
                      onChange={(e) => setAboutContent({ ...aboutContent, heroTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title Highlight</label>
                    <Input
                      value={aboutContent.heroTitleHighlight}
                      onChange={(e) => setAboutContent({ ...aboutContent, heroTitleHighlight: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Hero Description</label>
                  <Textarea
                    value={aboutContent.heroDescription}
                    onChange={(e) => setAboutContent({ ...aboutContent, heroDescription: e.target.value })}
                  />
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                <h3 className="text-lg font-semibold mb-6">Story Section</h3>
                <div>
                  <label className="block text-sm font-medium mb-2">Story Title</label>
                  <Input
                    value={aboutContent.storyTitle}
                    onChange={(e) => setAboutContent({ ...aboutContent, storyTitle: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Story Paragraph 1</label>
                  <Textarea
                    value={aboutContent.storyDescription1}
                    onChange={(e) => setAboutContent({ ...aboutContent, storyDescription1: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Story Paragraph 2</label>
                  <Textarea
                    value={aboutContent.storyDescription2}
                    onChange={(e) => setAboutContent({ ...aboutContent, storyDescription2: e.target.value })}
                  />
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                <h3 className="text-lg font-semibold mb-6">Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Years Experience</label>
                    <Input
                      value={aboutContent.yearsExperience}
                      onChange={(e) => setAboutContent({ ...aboutContent, yearsExperience: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Premium Vehicles</label>
                    <Input
                      value={aboutContent.premiumVehicles}
                      onChange={(e) => setAboutContent({ ...aboutContent, premiumVehicles: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Happy Customers</label>
                    <Input
                      value={aboutContent.happyCustomers}
                      onChange={(e) => setAboutContent({ ...aboutContent, happyCustomers: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Support Hours</label>
                    <Input
                      value={aboutContent.supportHours}
                      onChange={(e) => setAboutContent({ ...aboutContent, supportHours: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button variant="gold" onClick={handleSaveAbout}>
                <Save className="w-4 h-4" />
                Save About Content
              </Button>
            </div>
          )}

          {/* Cars Management */}
          {activeTab === "cars" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button variant="gold" onClick={() => setIsAddingCar(true)} disabled={isAddingCar}>
                  <Plus className="w-4 h-4" />
                  Add New Car
                </Button>
              </div>

              {/* Add Car Form */}
              {isAddingCar && (
                <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Add New Car</h3>
                    <button onClick={() => setIsAddingCar(false)} className="p-2 hover:bg-muted rounded-lg">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Car Name *</label>
                        <Input placeholder="e.g. Toyota Innova Crysta" value={newCar.name} onChange={(e) => setNewCar({ ...newCar, name: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Type</label>
                          <select
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                            value={newCar.type}
                            onChange={(e) => setNewCar({ ...newCar, type: e.target.value as Car["type"] })}
                          >
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="luxury">Luxury</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Seats</label>
                          <Input type="number" placeholder="4" value={newCar.seats} onChange={(e) => setNewCar({ ...newCar, seats: Number(e.target.value) })} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Price/Day (₹)</label>
                          <Input type="number" placeholder="3000" value={newCar.pricePerDay} onChange={(e) => setNewCar({ ...newCar, pricePerDay: Number(e.target.value) })} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Price/KM (₹)</label>
                          <Input type="number" placeholder="15" value={newCar.pricePerKm} onChange={(e) => setNewCar({ ...newCar, pricePerKm: Number(e.target.value) })} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Transmission</label>
                          <select
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                            value={newCar.transmission}
                            onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })}
                          >
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Fuel Type</label>
                          <select
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                            value={newCar.fuelType}
                            onChange={(e) => setNewCar({ ...newCar, fuelType: e.target.value })}
                          >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Petrol/CNG">Petrol/CNG</option>
                            <option value="Electric">Electric</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Luggage Capacity</label>
                        <Input type="number" placeholder="3" value={newCar.luggage} onChange={(e) => setNewCar({ ...newCar, luggage: Number(e.target.value) })} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Car Image *</label>
                        <ImageUpload
                          value={newCar.image || ""}
                          onChange={(value) => setNewCar({ ...newCar, image: value })}
                        />
                      </div>
                    </div>
                  </div>
                  <Textarea className="mt-4" placeholder="Description" value={newCar.description} onChange={(e) => setNewCar({ ...newCar, description: e.target.value })} />
                  <Input className="mt-4" placeholder="Features (comma separated, e.g. AC, GPS, Sunroof)" onChange={(e) => setNewCar({ ...newCar, features: e.target.value.split(",").map(f => f.trim()) })} />
                  <div className="flex gap-2 mt-4">
                    <Button variant="gold" onClick={handleAddCar}>
                      <Save className="w-4 h-4" />
                      Save Car
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingCar(false)}>Cancel</Button>
                  </div>
                </div>
              )}

              {/* Cars List */}
              <div className="grid gap-4">
                {cars.map((car) => (
                  <div key={car.id} className="bg-card rounded-xl p-4 border border-border shadow-card flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img src={car.image} alt={car.name} className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {car.type.toUpperCase()} • {car.seats} seats • ₹{car.pricePerDay}/day • ₹{car.pricePerKm}/km
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{car.transmission} • {car.fuelType}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingCar(car)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteCar(car.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Car Modal */}
              {editingCar && (
                <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Edit Car</h3>
                      <button onClick={() => setEditingCar(null)} className="p-2 hover:bg-muted rounded-lg">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Car Name</label>
                          <Input placeholder="Car Name" value={editingCar.name} onChange={(e) => setEditingCar({ ...editingCar, name: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <select
                              className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                              value={editingCar.type}
                              onChange={(e) => setEditingCar({ ...editingCar, type: e.target.value as Car["type"] })}
                            >
                              <option value="sedan">Sedan</option>
                              <option value="suv">SUV</option>
                              <option value="luxury">Luxury</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Seats</label>
                            <Input type="number" value={editingCar.seats} onChange={(e) => setEditingCar({ ...editingCar, seats: Number(e.target.value) })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Price/Day (₹)</label>
                            <Input type="number" value={editingCar.pricePerDay} onChange={(e) => setEditingCar({ ...editingCar, pricePerDay: Number(e.target.value) })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Price/KM (₹)</label>
                            <Input type="number" value={editingCar.pricePerKm} onChange={(e) => setEditingCar({ ...editingCar, pricePerKm: Number(e.target.value) })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Transmission</label>
                            <select
                              className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                              value={editingCar.transmission}
                              onChange={(e) => setEditingCar({ ...editingCar, transmission: e.target.value })}
                            >
                              <option value="Manual">Manual</option>
                              <option value="Automatic">Automatic</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Fuel Type</label>
                            <select
                              className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                              value={editingCar.fuelType}
                              onChange={(e) => setEditingCar({ ...editingCar, fuelType: e.target.value })}
                            >
                              <option value="Petrol">Petrol</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Petrol/CNG">Petrol/CNG</option>
                              <option value="Electric">Electric</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Luggage Capacity</label>
                          <Input type="number" value={editingCar.luggage} onChange={(e) => setEditingCar({ ...editingCar, luggage: Number(e.target.value) })} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Car Image</label>
                        <ImageUpload
                          value={editingCar.image}
                          onChange={(value) => setEditingCar({ ...editingCar, image: value })}
                        />
                      </div>
                    </div>
                    <Textarea className="mt-4" placeholder="Description" value={editingCar.description} onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })} />
                    <Input className="mt-4" placeholder="Features (comma separated)" value={editingCar.features.join(", ")} onChange={(e) => setEditingCar({ ...editingCar, features: e.target.value.split(",").map(f => f.trim()) })} />
                    <div className="flex gap-2 mt-6">
                      <Button variant="gold" onClick={handleSaveCar}>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingCar(null)}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Gallery Management */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button variant="gold" onClick={() => setIsAddingImage(true)} disabled={isAddingImage}>
                  <Plus className="w-4 h-4" />
                  Add New Image
                </Button>
              </div>

              {/* Add Image Form */}
              {isAddingImage && (
                <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Add New Image</h3>
                    <button onClick={() => setIsAddingImage(false)} className="p-2 hover:bg-muted rounded-lg">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Image *</label>
                      <ImageUpload
                        value={newImage.src}
                        onChange={(value) => setNewImage({ ...newImage, src: value })}
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Image Title *</label>
                        <Input placeholder="e.g. Toyota Fortuner" value={newImage.title} onChange={(e) => setNewImage({ ...newImage, title: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                          value={newImage.category}
                          onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                        >
                          <option value="SUV">SUV</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="Premium">Premium</option>
                          <option value="Wedding">Wedding</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button variant="gold" onClick={handleAddGalleryImage}>
                      <Save className="w-4 h-4" />
                      Add Image
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingImage(false)}>Cancel</Button>
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image) => (
                  <div key={image.id} className="bg-card rounded-xl border border-border shadow-card overflow-hidden group relative">
                    <img src={image.src} alt={image.title} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="font-medium text-sm truncate">{image.title}</h4>
                      <p className="text-xs text-muted-foreground">{image.category}</p>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingImage(image)}
                        className="p-1.5 bg-card/90 rounded-lg hover:bg-card"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteGalleryImage(image.id)}
                        className="p-1.5 bg-destructive/90 text-destructive-foreground rounded-lg hover:bg-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Image Modal */}
              {editingImage && (
                <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-card rounded-xl p-6 max-w-md w-full shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Edit Image</h3>
                      <button onClick={() => setEditingImage(null)} className="p-2 hover:bg-muted rounded-lg">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Image</label>
                        <ImageUpload
                          value={editingImage.src}
                          onChange={(value) => setEditingImage({ ...editingImage, src: value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input placeholder="Title" value={editingImage.title} onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                          value={editingImage.category}
                          onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                        >
                          <option value="SUV">SUV</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="Premium">Premium</option>
                          <option value="Wedding">Wedding</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Button variant="gold" onClick={handleSaveGalleryImage}>
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingImage(null)}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Testimonials Management */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button variant="gold" onClick={() => setIsAddingTestimonial(true)} disabled={isAddingTestimonial}>
                  <Plus className="w-4 h-4" />
                  Add New Testimonial
                </Button>
              </div>

              {/* Add Testimonial Form */}
              {isAddingTestimonial && (
                <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Add New Testimonial</h3>
                    <button onClick={() => setIsAddingTestimonial(false)} className="p-2 hover:bg-muted rounded-lg">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Customer Name *</label>
                      <Input placeholder="e.g. Rajesh Kumar" value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Input placeholder="e.g. Delhi" value={newTestimonial.location} onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                        value={newTestimonial.rating}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                      >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Avatar Initials</label>
                      <Input placeholder="e.g. RK (auto-generated if empty)" value={newTestimonial.avatar} onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar: e.target.value.toUpperCase().slice(0, 2) })} maxLength={2} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Review Text *</label>
                    <Textarea placeholder="Customer review text..." value={newTestimonial.text} onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })} />
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button variant="gold" onClick={handleAddTestimonial}>
                      <Save className="w-4 h-4" />
                      Add Testimonial
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingTestimonial(false)}>Cancel</Button>
                  </div>
                </div>
              )}

              {/* Testimonials List */}
              <div className="grid gap-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-card rounded-xl p-4 border border-border shadow-card flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-primary font-bold shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <span className="text-sm text-muted-foreground">• {testimonial.location}</span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "text-gold fill-gold" : "text-muted"}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingTestimonial(testimonial)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Testimonial Modal */}
              {editingTestimonial && (
                <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-card rounded-xl p-6 max-w-md w-full shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Edit Testimonial</h3>
                      <button onClick={() => setEditingTestimonial(null)} className="p-2 hover:bg-muted rounded-lg">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Customer Name</label>
                        <Input value={editingTestimonial.name} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input value={editingTestimonial.location} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Rating</label>
                        <select
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                          value={editingTestimonial.rating}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                        >
                          <option value={5}>5 Stars</option>
                          <option value={4}>4 Stars</option>
                          <option value={3}>3 Stars</option>
                          <option value={2}>2 Stars</option>
                          <option value={1}>1 Star</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Avatar Initials</label>
                        <Input value={editingTestimonial.avatar} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value.toUpperCase().slice(0, 2) })} maxLength={2} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Review Text</label>
                        <Textarea value={editingTestimonial.text} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })} />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Button variant="gold" onClick={handleSaveTestimonial}>
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingTestimonial(null)}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contact Details Management */}
          {activeTab === "contact" && (
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <h3 className="text-lg font-semibold mb-6">Contact Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input value={contactDetails.phone} onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">WhatsApp Number (with country code)</label>
                  <Input value={contactDetails.whatsapp} onChange={(e) => setContactDetails({ ...contactDetails, whatsapp: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input value={contactDetails.email} onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Working Hours</label>
                  <Input value={contactDetails.workingHours} onChange={(e) => setContactDetails({ ...contactDetails, workingHours: e.target.value })} />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Address</label>
                <Textarea value={contactDetails.address} onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })} />
              </div>
              <Button variant="gold" className="mt-6" onClick={handleSaveContact}>
                <Save className="w-4 h-4" />
                Save Contact Details
              </Button>
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <h3 className="text-lg font-semibold mb-6">Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Admin Credentials</h4>
                  <p className="text-sm text-muted-foreground">Phone: 9306282979</p>
                  <p className="text-sm text-muted-foreground">Password: ••••••••</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Data Management</h4>
                  <p className="text-sm text-muted-foreground mb-3">All changes are saved to browser storage.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      localStorage.removeItem("adminCars");
                      localStorage.removeItem("adminGallery");
                      localStorage.removeItem("adminAbout");
                      localStorage.removeItem("adminContact");
                      localStorage.removeItem("adminTestimonials");
                      window.location.reload();
                    }}
                  >
                    Reset All Data to Defaults
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
