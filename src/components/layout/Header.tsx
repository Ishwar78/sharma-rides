import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Download, Bell, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { usePushNotifications } from "@/hooks/usePushNotifications";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Our Cars", path: "/cars" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isInstallable, installApp } = usePWAInstall();
  const { isSupported, isSubscribed, requestPermission } = usePushNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-10 rounded-lg overflow-hidden shadow-gold transition-transform group-hover:scale-110">
              <img 
                src={logoImage} 
                alt="Sharma Car Rent" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-bold transition-colors",
                isScrolled ? "text-primary" : "text-primary-foreground"
              )}>
                Sharma Car Rent
              </span>
              <span className={cn(
                "text-xs transition-colors",
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
              )}>
                Safe • Reliable • Affordable
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-all duration-300 relative group",
                  isScrolled ? "text-foreground" : "text-primary-foreground",
                  location.pathname === link.path && "text-gold"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle isScrolled={isScrolled} />
            {isSupported && !isSubscribed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={requestPermission}
                className={cn(
                  "relative",
                  isScrolled ? "text-foreground hover:text-gold" : "text-primary-foreground hover:text-gold"
                )}
                title="Enable notifications"
              >
                <Bell className="w-5 h-5" />
              </Button>
            )}
            {isSubscribed && (
              <div className={cn(
                "p-2",
                isScrolled ? "text-gold" : "text-gold"
              )} title="Notifications enabled">
                <BellRing className="w-5 h-5" />
              </div>
            )}
            {isInstallable && (
              <Button
                variant="outline"
                size="sm"
                onClick={installApp}
                className={cn(
                  "gap-2",
                  isScrolled 
                    ? "border-gold text-gold hover:bg-gold hover:text-primary" 
                    : "border-gold text-gold hover:bg-gold hover:text-primary"
                )}
              >
                <Download className="w-4 h-4" />
                Install App
              </Button>
            )}
            <a href="tel:9053860397" className="flex items-center gap-2">
              <Phone className={cn(
                "w-4 h-4",
                isScrolled ? "text-gold" : "text-gold"
              )} />
              <span className={cn(
                "font-semibold",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}>
                9053860397
              </span>
            </a>
            <Button variant="gold" size="sm" asChild>
              <a
                href="https://wa.me/919053860397?text=Hello%20Sharma%20Car%20Rent%2C%20I%20want%20to%20book%20a%20car."
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={cn(
                "w-6 h-6",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )} />
            ) : (
              <Menu className={cn(
                "w-6 h-6",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
        )}>
          <nav className="flex flex-col gap-2 bg-card rounded-xl p-4 shadow-card">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle isScrolled={true} />
            </div>
            {isSupported && !isSubscribed && (
              <Button
                variant="outline"
                onClick={requestPermission}
                className="gap-2 border-gold text-gold hover:bg-gold hover:text-primary"
              >
                <Bell className="w-4 h-4" />
                Enable Notifications
              </Button>
            )}
            {isInstallable && (
              <Button
                variant="outline"
                onClick={installApp}
                className="gap-2 border-gold text-gold hover:bg-gold hover:text-primary"
              >
                <Download className="w-4 h-4" />
                Install App
              </Button>
            )}
            <a
              href="tel:9053860397"
              className="flex items-center gap-2 px-4 py-3 text-foreground"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span className="font-semibold">9053860397</span>
            </a>
            <Button variant="gold" className="mt-2" asChild>
              <a
                href="https://wa.me/919053860397?text=Hello%20Sharma%20Car%20Rent%2C%20I%20want%20to%20book%20a%20car."
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
