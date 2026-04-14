import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PopularTools } from "@/components/PopularTools";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PopularTools />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
