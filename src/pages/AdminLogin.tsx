import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_CREDENTIALS = {
  phone: "9306282979",
  password: "20072007"
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (phone === ADMIN_CREDENTIALS.phone && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem("adminAuth", "true");
        toast({
          title: "Welcome Back!",
          description: "You have successfully logged in.",
        });
        navigate("/sharmacar/admin/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid phone number or password.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gold flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Car className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground">Sharma Car Rent</h1>
          <p className="text-primary-foreground/70">Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Sign in to your account
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        <p className="text-center text-primary-foreground/60 text-sm mt-6">
          © 2024 Sharma Car Rent. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
