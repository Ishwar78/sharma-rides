import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Award, Users, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { useAboutContent } from "@/hooks/useAdminData";

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
  const aboutContent = useAboutContent();

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <PageHero
        badge="About Us"
        title={aboutContent.heroTitle}
        titleHighlight={aboutContent.heroHighlight}
        description={aboutContent.heroDescription}
      />

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-[hsl(38,90%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {aboutContent.storyTitle}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {aboutContent.storyContent1}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {aboutContent.storyContent2}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[hsl(38,90%,50%)] shrink-0" />
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
                  <div className="text-4xl font-bold text-[hsl(38,90%,50%)] mb-2">{aboutContent.stats.years}</div>
                  <div className="text-primary-foreground text-sm">Years Experience</div>
                </div>
                <div className="bg-card rounded-2xl p-8 text-center shadow-card border border-border">
                  <div className="text-4xl font-bold text-[hsl(38,90%,50%)] mb-2">{aboutContent.stats.vehicles}</div>
                  <div className="text-foreground text-sm">Premium Vehicles</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card rounded-2xl p-8 text-center shadow-card border border-border">
                  <div className="text-4xl font-bold text-[hsl(38,90%,50%)] mb-2">{aboutContent.stats.customers}</div>
                  <div className="text-foreground text-sm">Happy Customers</div>
                </div>
                <div className="bg-primary rounded-2xl p-8 text-center">
                  <div className="text-4xl font-bold text-[hsl(38,90%,50%)] mb-2">{aboutContent.stats.support}</div>
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
            <span className="inline-block text-[hsl(38,90%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">
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
                className="bg-card rounded-2xl p-8 text-center shadow-card border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(38,90%,50%)] to-[hsl(38,85%,60%)] flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-[hsl(220,60%,20%)]" />
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
