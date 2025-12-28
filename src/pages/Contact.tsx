import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/shared/PageHero";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", mobile: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 9053860397"],
      action: { href: "tel:9053860397", label: "Call Now" },
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@sharmacarrent.com"],
      action: { href: "mailto:info@sharmacarrent.com", label: "Send Email" },
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Main Market, Near Bus Stand", "Your City, India"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["24/7 Available", "Always ready to serve you"],
    },
  ];

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <PageHero
        badge="Get In Touch"
        title="Contact"
        titleHighlight="Us"
        description="Have questions or need to book a car? We're here to help you 24/7."
      />

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Whether you need a car for a local trip, outstation journey, or 
                special event, we're always ready to assist you. Reach out to us 
                through any of the following channels.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(38,90%,50%)] to-[hsl(38,85%,60%)] flex items-center justify-center shrink-0">
                      <info.icon className="w-6 h-6 text-[hsl(220,60%,20%)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                      {info.action && (
                        <a
                          href={info.action.href}
                          className="inline-block mt-2 text-[hsl(38,90%,50%)] font-medium text-sm hover:underline"
                        >
                          {info.action.label}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-10 p-6 bg-[#25D366]/10 rounded-2xl border border-[#25D366]/20">
                <h3 className="font-semibold text-foreground mb-2">
                  Quick Response via WhatsApp
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get instant replies on WhatsApp. We typically respond within minutes.
                </p>
                <Button variant="whatsapp" asChild>
                  <a
                    href="https://wa.me/919053860397?text=Hello%20Sharma%20Car%20Rent%2C%20I%20want%20to%20book%20a%20car."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Mobile Number
                    </label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      required
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
