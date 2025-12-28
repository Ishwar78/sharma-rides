import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cars as initialCars, Car } from "@/data/cars";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

type Tab = "cars" | "content" | "contact" | "settings";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("cars");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cars, setCars] = useState(initialCars);
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

  const handleDeleteCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
    toast({
      title: "Car Deleted",
      description: "The car has been removed from the fleet.",
    });
  };

  const handleSaveCar = () => {
    if (editingCar) {
      setCars(cars.map((car) => (car.id === editingCar.id ? editingCar : car)));
      setEditingCar(null);
      toast({
        title: "Car Updated",
        description: "The car details have been saved.",
      });
    }
  };

  const handleAddCar = () => {
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
    toast({
      title: "Car Added",
      description: "The new car has been added to the fleet.",
    });
  };

  const tabs = [
    { id: "cars" as Tab, label: "Manage Cars", icon: CarIcon },
    { id: "content" as Tab, label: "Homepage Content", icon: FileText },
    { id: "contact" as Tab, label: "Contact Details", icon: Phone },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-primary text-primary-foreground transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-primary-foreground/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
              <CarIcon className="w-6 h-6 text-navy" />
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
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                activeTab === tab.id
                  ? "bg-gold text-navy"
                  : "hover:bg-primary-foreground/10"
              )}
            >
              <tab.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">{tab.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary-foreground/20">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">View Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-foreground">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Users className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-medium text-foreground">Admin</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === "cars" && (
            <div className="space-y-6">
              {/* Add Car Button */}
              <div className="flex justify-end">
                <Button
                  variant="gold"
                  onClick={() => setIsAddingCar(true)}
                  disabled={isAddingCar}
                >
                  <Plus className="w-4 h-4" />
                  Add New Car
                </Button>
              </div>

              {/* Add Car Form */}
              {isAddingCar && (
                <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Add New Car</h3>
                    <button
                      onClick={() => setIsAddingCar(false)}
                      className="p-2 hover:bg-muted rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Input
                      placeholder="Car Name"
                      value={newCar.name}
                      onChange={(e) =>
                        setNewCar({ ...newCar, name: e.target.value })
                      }
                    />
                    <select
                      className="h-10 px-3 rounded-lg border border-input bg-background"
                      value={newCar.type}
                      onChange={(e) =>
                        setNewCar({ ...newCar, type: e.target.value as Car["type"] })
                      }
                    >
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="luxury">Luxury</option>
                    </select>
                    <Input
                      type="number"
                      placeholder="Seats"
                      value={newCar.seats}
                      onChange={(e) =>
                        setNewCar({ ...newCar, seats: Number(e.target.value) })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Price per Day"
                      value={newCar.pricePerDay}
                      onChange={(e) =>
                        setNewCar({ ...newCar, pricePerDay: Number(e.target.value) })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Price per KM"
                      value={newCar.pricePerKm}
                      onChange={(e) =>
                        setNewCar({ ...newCar, pricePerKm: Number(e.target.value) })
                      }
                    />
                    <Input
                      placeholder="Image URL"
                      value={newCar.image}
                      onChange={(e) =>
                        setNewCar({ ...newCar, image: e.target.value })
                      }
                    />
                  </div>
                  <Textarea
                    className="mt-4"
                    placeholder="Description"
                    value={newCar.description}
                    onChange={(e) =>
                      setNewCar({ ...newCar, description: e.target.value })
                    }
                  />
                  <div className="flex gap-2 mt-4">
                    <Button variant="gold" onClick={handleAddCar}>
                      <Save className="w-4 h-4" />
                      Save Car
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingCar(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Cars List */}
              <div className="grid gap-4">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-card rounded-xl p-4 border border-border shadow-card flex items-center gap-4"
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {car.type.toUpperCase()} • {car.seats} seats • ₹
                        {car.pricePerDay}/day
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCar(car)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteCar(car.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Modal */}
              {editingCar && (
                <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-card rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-auto shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Edit Car</h3>
                      <button
                        onClick={() => setEditingCar(null)}
                        className="p-2 hover:bg-muted rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <Input
                        placeholder="Car Name"
                        value={editingCar.name}
                        onChange={(e) =>
                          setEditingCar({ ...editingCar, name: e.target.value })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Price per Day"
                        value={editingCar.pricePerDay}
                        onChange={(e) =>
                          setEditingCar({
                            ...editingCar,
                            pricePerDay: Number(e.target.value),
                          })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Price per KM"
                        value={editingCar.pricePerKm}
                        onChange={(e) =>
                          setEditingCar({
                            ...editingCar,
                            pricePerKm: Number(e.target.value),
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        value={editingCar.image}
                        onChange={(e) =>
                          setEditingCar({ ...editingCar, image: e.target.value })
                        }
                      />
                      <Textarea
                        placeholder="Description"
                        value={editingCar.description}
                        onChange={(e) =>
                          setEditingCar({ ...editingCar, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Button variant="gold" onClick={handleSaveCar}>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingCar(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "content" && (
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <h3 className="text-lg font-semibold mb-6">Homepage Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hero Title
                  </label>
                  <Input
                    defaultValue="Sharma Car Rent – Safe, Reliable & Affordable Car Rentals"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hero Subtitle
                  </label>
                  <Input
                    defaultValue="Book your ride anytime, anywhere with comfort and trust."
                  />
                </div>
                <Button variant="gold">
                  <Save className="w-4 h-4" />
                  Save Content
                </Button>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <h3 className="text-lg font-semibold mb-6">Contact Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input defaultValue="9053860397" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    WhatsApp Number
                  </label>
                  <Input defaultValue="919053860397" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input defaultValue="info@sharmacarrent.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address
                  </label>
                  <Textarea defaultValue="Main Market, Near Bus Stand, Your City, India" />
                </div>
                <Button variant="gold">
                  <Save className="w-4 h-4" />
                  Save Contact Details
                </Button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <h3 className="text-lg font-semibold mb-6">Settings</h3>
              <p className="text-muted-foreground">
                Additional settings and configurations will appear here.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
