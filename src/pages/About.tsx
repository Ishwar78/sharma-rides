import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Award, Users, Clock, ArrowRight, CheckCircle } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Your safety is our top priority. All vehicles undergo regular maintenance checks.",
  },
  {
    icon: Award,
    title: "Quality Service",
    description: "We strive to exceed expectations with premium vehicles and professional drivers.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do. Your satisfaction matters most.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Count on us for timely service. We value your time and commitments.",
  },
];

const achievements = [
  "10+ Years of Experience",
  "50+ Premium Vehicles",
  "10,000+ Happy Customers",
  "24/7 Customer Support",
  "Professional Drivers",
  "Affordable Pricing",
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Your Trusted Partner for <span className="text-gradient-gold">Car Rentals</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Sharma Car Rent is a trusted car rental service providing safe, affordable, 
              and comfortable rides for local and outstation travel.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                A Decade of Excellence in Car Rentals
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded with a vision to provide hassle-free transportation solutions, 
                Sharma Car Rent has grown to become one of the most trusted names in 
                the car rental industry. Our journey began with just a few cars and a 
                commitment to customer satisfaction.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Today, we proudly serve thousands of customers with a fleet of premium 
                vehicles, ranging from economy sedans to luxury cars. Whether you need 
                a car for a local trip, outstation journey, wedding, or corporate travel, 
                we have the perfect solution for you.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-foreground text-sm font-medium">{achievement}</span>
                  </div>
                ))}
              </div>

              <Button variant="gold" asChild>
                <Link to="/cars">
                  Explore Our Fleet
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-primary rounded-2xl p-8 text-center">
                  <div className="text-4xl font-bold text-gold mb-2">10+</div>
                  <div className="text-primary-foreground text-sm">Years Experience</div>
                </div>
                <div className="bg-card rounded-2xl p-8 text-center shadow-card border border-border">
                  <div className="text-4xl font-bold text-gold mb-2">50+</div>
                  <div className="text-foreground text-sm">Premium Vehicles</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card rounded-2xl p-8 text-center shadow-card border border-border">
                  <div className="text-4xl font-bold text-gold mb-2">10K+</div>
                  <div className="text-foreground text-sm">Happy Customers</div>
                </div>
                <div className="bg-primary rounded-2xl p-8 text-center">
                  <div className="text-4xl font-bold text-gold mb-2">24/7</div>
                  <div className="text-primary-foreground text-sm">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values define who we are and how we serve our customers every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 text-center shadow-card border border-border hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Book your ride today and discover why thousands of customers trust Sharma Car Rent.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/cars">
                View Our Cars
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
