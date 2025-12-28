import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  pickupLocation: z.string().trim().min(3, "Pickup location is required").max(200, "Location must be less than 200 characters"),
  dropLocation: z.string().trim().min(3, "Drop location is required").max(200, "Location must be less than 200 characters"),
});

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
}

export const BookingForm = ({ isOpen, onClose, carName }: BookingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pickupLocation: "",
    dropLocation: "",
  });
  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropDate, setDropDate] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const result = bookingSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!pickupDate) {
      setErrors((prev) => ({ ...prev, pickupDate: "Please select pickup date" }));
      return;
    }

    if (!dropDate) {
      setErrors((prev) => ({ ...prev, dropDate: "Please select drop date" }));
      return;
    }

    if (dropDate < pickupDate) {
      setErrors((prev) => ({ ...prev, dropDate: "Drop date must be after pickup date" }));
      return;
    }

    // Build WhatsApp message
    const message = `Hello Sharma Car Rent,

I want to book a car with the following details:

*Car:* ${carName}
*Name:* ${formData.name}
*Mobile:* ${formData.mobile}
*Pickup Date:* ${format(pickupDate, "dd MMM yyyy")}
*Drop Date:* ${format(dropDate, "dd MMM yyyy")}
*Pickup Location:* ${formData.pickupLocation}
*Drop Location:* ${formData.dropLocation}

Please confirm availability and pricing.`;

    const whatsappUrl = `https://wa.me/919053860397?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "Complete your booking on WhatsApp.",
    });

    // Reset form and close
    setFormData({ name: "", mobile: "", pickupLocation: "", dropLocation: "" });
    setPickupDate(undefined);
    setDropDate(undefined);
    setErrors({});
    onClose();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-[hsl(220,60%,20%)] to-[hsl(220,50%,30%)] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Book Your Ride
            </DialogTitle>
            <p className="text-white/80 text-sm mt-1">
              {carName}
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Your Name *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={cn("h-11", errors.name && "border-destructive")}
            />
            {errors.name && (
              <p className="text-destructive text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Mobile Number *
            </label>
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              className={cn("h-11", errors.mobile && "border-destructive")}
            />
            {errors.mobile && (
              <p className="text-destructive text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Pickup Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal",
                      !pickupDate && "text-muted-foreground",
                      errors.pickupDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? format(pickupDate, "dd MMM yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={(date) => {
                      setPickupDate(date);
                      setErrors((prev) => ({ ...prev, pickupDate: "" }));
                    }}
                    disabled={(date) => date < today}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.pickupDate && (
                <p className="text-destructive text-xs mt-1">{errors.pickupDate}</p>
              )}
            </div>

            {/* Drop Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Drop Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal",
                      !dropDate && "text-muted-foreground",
                      errors.dropDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dropDate ? format(dropDate, "dd MMM yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dropDate}
                    onSelect={(date) => {
                      setDropDate(date);
                      setErrors((prev) => ({ ...prev, dropDate: "" }));
                    }}
                    disabled={(date) => date < (pickupDate || today)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.dropDate && (
                <p className="text-destructive text-xs mt-1">{errors.dropDate}</p>
              )}
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Pickup Location *
            </label>
            <Input
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Enter pickup address"
              className={cn("h-11", errors.pickupLocation && "border-destructive")}
            />
            {errors.pickupLocation && (
              <p className="text-destructive text-xs mt-1">{errors.pickupLocation}</p>
            )}
          </div>

          {/* Drop Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Drop Location *
            </label>
            <Input
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleChange}
              placeholder="Enter drop address"
              className={cn("h-11", errors.dropLocation && "border-destructive")}
            />
            {errors.dropLocation && (
              <p className="text-destructive text-xs mt-1">{errors.dropLocation}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="gold" size="lg" className="w-full mt-6">
            Book via WhatsApp
          </Button>

          <p className="text-center text-muted-foreground text-xs">
            You'll be redirected to WhatsApp to complete your booking
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
