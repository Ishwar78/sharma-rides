import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { CarsShowcase } from "@/components/home/CarsShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CustomerReviewsSection } from "@/components/home/CustomerReviewsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CarsShowcase />
      <TestimonialsSection />
      <CustomerReviewsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
