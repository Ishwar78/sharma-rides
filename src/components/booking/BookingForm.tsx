import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Car } from "lucide-react";
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
  });
  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropDate, setDropDate] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    const message = `Hello Sharma Car Rent,

I want to book a car with the following details:

*Car:* ${carName}
*Name:* ${formData.name}
*Mobile:* ${formData.mobile}
*Pickup Date:* ${format(pickupDate, "dd MMM yyyy")}
*Drop Date:* ${format(dropDate, "dd MMM yyyy")}

Please confirm availability and pricing.`;

    const whatsappUrl = `https://wa.me/919053860397?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "Complete your booking on WhatsApp.",
    });

    setFormData({ name: "", mobile: "" });
    setPickupDate(undefined);
    setDropDate(undefined);
    setErrors({});
    onClose();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
        <div className="bg-gradient-hero p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Car className="w-5 h-5 text-gold" />
              </div>
              Book Your Ride
            </DialogTitle>
            <p className="text-primary-foreground/80 text-sm mt-2">
              {carName}
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div className="animate-fade-up stagger-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Name *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={cn("h-12 rounded-xl", errors.name && "border-destructive")}
            />
            {errors.name && (
              <p className="text-destructive text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="animate-fade-up stagger-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Mobile Number *
            </label>
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              className={cn("h-12 rounded-xl", errors.mobile && "border-destructive")}
            />
            {errors.mobile && (
              <p className="text-destructive text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-2 gap-4 animate-fade-up stagger-3">
            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Pickup Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal rounded-xl",
                      !pickupDate && "text-muted-foreground",
                      errors.pickupDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                    {pickupDate ? format(pickupDate, "dd MMM") : "Select"}
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
              <label className="block text-sm font-medium text-foreground mb-2">
                Drop Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal rounded-xl",
                      !dropDate && "text-muted-foreground",
                      errors.dropDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                    {dropDate ? format(dropDate, "dd MMM") : "Select"}
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

          {/* Submit Button */}
          <Button type="submit" variant="gold" size="lg" className="w-full mt-6 h-14 text-base animate-fade-up stagger-4">
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