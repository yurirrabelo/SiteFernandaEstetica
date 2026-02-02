import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedTreatments from "@/components/home/FeaturedTreatments";
import Benefits from "@/components/home/Benefits";
import Testimonials from "@/components/home/Testimonials";
import BeforeAfterPreview from "@/components/home/BeforeAfterPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedTreatments />
      <Benefits />
      <Testimonials />
      <BeforeAfterPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
