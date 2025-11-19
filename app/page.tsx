import Hero from "@/components/sections/Hero";
import QuickQuote from "@/components/sections/QuickQuote";
import HowItWorks from "@/components/sections/HowItWorks";
import DumpsterSizesPreview from "@/components/sections/DumpsterSizesPreview";
import TrustSection from "@/components/sections/TrustSection";
import ServicePreview from "@/components/sections/ServicePreview";
import FAQPreview from "@/components/sections/FAQPreview";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickQuote />
      <HowItWorks />
      <DumpsterSizesPreview />
      <TrustSection />
      <ServicePreview />
      <FAQPreview />
      <CTASection />
    </>
  );
}
