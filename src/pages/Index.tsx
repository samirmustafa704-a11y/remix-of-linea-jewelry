import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeroGrid from "../components/content/HeroGrid";
import CategoryPills from "../components/content/CategoryPills";
import ProductGrid from "../components/content/ProductGrid";
import OneThirdTwoThirdsSection from "../components/content/OneThirdTwoThirdsSection";
import EditorialSection from "../components/content/EditorialSection";
import SustainabilityBanner from "../components/content/SustainabilityBanner";
import { useTheme } from "@/contexts/ThemeContext";

const AnnouncementBar = () => {
  const { theme } = useTheme();
  return (
    <div
      className="w-full py-2.5 text-center text-[11px] tracking-widest uppercase font-light transition-colors duration-300"
      style={{
        background: theme === "dark" ? "hsl(var(--primary))" : "hsl(var(--foreground))",
        color: theme === "dark" ? "hsl(155 80% 90%)" : "hsl(var(--background))",
      }}
    >
      Free UK delivery on orders over £75 &nbsp;·&nbsp; Use code SUMMER10 for 10% off
    </div>
  );
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <AnnouncementBar />
    <Header />
    <main>
      <HeroGrid />
      <CategoryPills />
      <ProductGrid />
      <OneThirdTwoThirdsSection />
      <SustainabilityBanner />
      <EditorialSection />
    </main>
    <Footer />
  </div>
);

export default Index;
