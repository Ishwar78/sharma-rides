import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What documents are required to rent a car?",
    answer: "You'll need a valid government-issued ID (Aadhaar Card/PAN Card), a valid driving license, and address proof. For chauffeur-driven services, only ID proof is required."
  },
  {
    question: "Do you provide both self-drive and chauffeur-driven cars?",
    answer: "Yes! We offer both options. You can choose to drive yourself or opt for our professional chauffeur service for a comfortable and hassle-free journey."
  },
  {
    question: "What is the fuel policy?",
    answer: "For self-drive rentals, we provide the car with a full tank and expect it to be returned with a full tank. For chauffeur-driven services, fuel cost is included in the package or charged separately based on the trip."
  },
  {
    question: "Can I book a car for outstation trips?",
    answer: "Absolutely! We specialize in outstation trips. Whether it's Delhi to Agra, Jaipur, or any other destination, we offer competitive rates for long-distance travel."
  },
  {
    question: "What happens if I need to cancel my booking?",
    answer: "Cancellations made 24 hours before the scheduled pickup are fully refundable. For cancellations within 24 hours, a small cancellation fee may apply. Contact us for specific details."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No hidden charges! Our pricing is transparent. The quoted price includes the vehicle, driver allowance (for chauffeur service), and basic insurance. Toll taxes and parking fees are charged as per actuals."
  },
  {
    question: "Do you offer airport pickup and drop services?",
    answer: "Yes, we provide 24/7 airport pickup and drop services at all major airports including IGI Delhi, with meet and greet service available."
  },
  {
    question: "How do I make a booking?",
    answer: "You can book through our website, call us at 9053860397, or simply WhatsApp us with your travel details. We'll confirm your booking within minutes!"
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold) / 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-up">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 animate-fade-up font-playfair">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-up">
            Got questions? We've got answers. Find everything you need to know about our car rental services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border shadow-card hover:border-gold/30 transition-all duration-300 px-6 animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-gold transition-colors py-5 [&[data-state=open]>svg]:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-up">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href="https://wa.me/919053860397?text=Hi%2C%20I%20have%20a%20question%20about%20your%20car%20rental%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-gold hover:shadow-lg hover:-translate-y-1"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
