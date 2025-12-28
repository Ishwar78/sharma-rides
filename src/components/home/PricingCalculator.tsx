import { useState } from "react";
import { Calculator, Car, MapPin, ArrowRight, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const carTypes = [
  { id: "hatchback", name: "Hatchback (Swift, i10)", pricePerKm: 10, baseFare: 500 },
  { id: "sedan", name: "Sedan (Dzire, Etios)", pricePerKm: 12, baseFare: 700 },
  { id: "suv", name: "SUV (Ertiga, Innova)", pricePerKm: 15, baseFare: 1000 },
  { id: "premium", name: "Premium (Fortuner, Crysta)", pricePerKm: 20, baseFare: 1500 },
];

const popularRoutes = [
  { id: "delhi-agra", name: "Delhi → Agra", distance: 230 },
  { id: "delhi-jaipur", name: "Delhi → Jaipur", distance: 280 },
  { id: "delhi-chandigarh", name: "Delhi → Chandigarh", distance: 250 },
  { id: "delhi-manali", name: "Delhi → Manali", distance: 530 },
  { id: "delhi-haridwar", name: "Delhi → Haridwar", distance: 220 },
  { id: "custom", name: "Custom Distance", distance: 0 },
];

export const PricingCalculator = () => {
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [customDistance, setCustomDistance] = useState("");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [showResult, setShowResult] = useState(false);

  const selectedCarData = carTypes.find((c) => c.id === selectedCar);
  const selectedRouteData = popularRoutes.find((r) => r.id === selectedRoute);
  
  const distance = selectedRoute === "custom" 
    ? parseInt(customDistance) || 0 
    : selectedRouteData?.distance || 0;
  
  const totalDistance = tripType === "roundtrip" ? distance * 2 : distance;
  
  const estimatedCost = selectedCarData 
    ? selectedCarData.baseFare + (totalDistance * selectedCarData.pricePerKm)
    : 0;

  const handleCalculate = () => {
    if (selectedCar && (distance > 0)) {
      setShowResult(true);
    }
  };

  const handleWhatsAppBooking = () => {
    const message = `Hi, I want to book a ${selectedCarData?.name} for ${selectedRouteData?.name || customDistance + ' km'} (${tripType === 'roundtrip' ? 'Round Trip' : 'One Way'}). Estimated cost: ₹${estimatedCost.toLocaleString()}`;
    window.open(`https://wa.me/919053860397?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-up">
            <Calculator className="w-4 h-4" />
            Pricing Calculator
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 animate-fade-up font-playfair">
            Estimate Your Trip Cost
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-up">
            Get an instant price estimate for your journey. Transparent pricing with no hidden charges.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-card border border-border p-8 md:p-10 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                {/* Car Type */}
                <div className="space-y-2">
                  <Label className="text-foreground font-semibold flex items-center gap-2">
                    <Car className="w-4 h-4 text-gold" />
                    Select Car Type
                  </Label>
                  <Select value={selectedCar} onValueChange={(val) => { setSelectedCar(val); setShowResult(false); }}>
                    <SelectTrigger className="h-12 bg-background border-border">
                      <SelectValue placeholder="Choose a car type" />
                    </SelectTrigger>
                    <SelectContent>
                      {carTypes.map((car) => (
                        <SelectItem key={car.id} value={car.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{car.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCarData && (
                    <p className="text-sm text-muted-foreground">
                      ₹{selectedCarData.pricePerKm}/km + ₹{selectedCarData.baseFare} base fare
                    </p>
                  )}
                </div>

                {/* Route Selection */}
                <div className="space-y-2">
                  <Label className="text-foreground font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    Select Route
                  </Label>
                  <Select value={selectedRoute} onValueChange={(val) => { setSelectedRoute(val); setShowResult(false); }}>
                    <SelectTrigger className="h-12 bg-background border-border">
                      <SelectValue placeholder="Choose a route" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularRoutes.map((route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.name} {route.distance > 0 && `(${route.distance} km)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Distance */}
                {selectedRoute === "custom" && (
                  <div className="space-y-2 animate-fade-in">
                    <Label className="text-foreground font-semibold">Enter Distance (km)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 150"
                      value={customDistance}
                      onChange={(e) => { setCustomDistance(e.target.value); setShowResult(false); }}
                      className="h-12 bg-background border-border"
                    />
                  </div>
                )}

                {/* Trip Type */}
                <div className="space-y-2">
                  <Label className="text-foreground font-semibold">Trip Type</Label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setTripType("oneway"); setShowResult(false); }}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all duration-300",
                        tripType === "oneway"
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border bg-background text-muted-foreground hover:border-gold/50"
                      )}
                    >
                      One Way
                    </button>
                    <button
                      onClick={() => { setTripType("roundtrip"); setShowResult(false); }}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all duration-300",
                        tripType === "roundtrip"
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border bg-background text-muted-foreground hover:border-gold/50"
                      )}
                    >
                      Round Trip
                    </button>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={handleCalculate}
                  disabled={!selectedCar || distance <= 0}
                  className="w-full h-12 bg-gold hover:bg-gold-light text-primary font-semibold text-lg shadow-gold hover:shadow-lg transition-all duration-300"
                >
                  Calculate Estimate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Right Column - Result */}
              <div className="flex items-center justify-center">
                <div className={cn(
                  "w-full h-full min-h-[300px] rounded-2xl flex flex-col items-center justify-center transition-all duration-500",
                  showResult 
                    ? "bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/30" 
                    : "bg-muted/30 border-2 border-dashed border-border"
                )}>
                  {showResult ? (
                    <div className="text-center p-6 animate-scale-in">
                      <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                        <IndianRupee className="w-8 h-8 text-gold" />
                      </div>
                      <p className="text-muted-foreground mb-2">Estimated Cost</p>
                      <div className="text-5xl md:text-6xl font-bold text-gold mb-2 font-playfair">
                        ₹{estimatedCost.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">
                        {totalDistance} km • {tripType === "roundtrip" ? "Round Trip" : "One Way"}
                      </p>
                      
                      <div className="space-y-3 text-sm text-muted-foreground border-t border-border pt-4 mb-6">
                        <div className="flex justify-between">
                          <span>Base Fare</span>
                          <span>₹{selectedCarData?.baseFare}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Distance Charge ({totalDistance} km × ₹{selectedCarData?.pricePerKm})</span>
                          <span>₹{(totalDistance * (selectedCarData?.pricePerKm || 0)).toLocaleString()}</span>
                        </div>
                      </div>

                      <Button
                        onClick={handleWhatsAppBooking}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Book via WhatsApp
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <Calculator className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Select options and click calculate<br />to see your estimate
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-xs text-muted-foreground mt-8">
              * This is an estimated price. Final price may vary based on actual route, waiting time, toll taxes, and parking charges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
