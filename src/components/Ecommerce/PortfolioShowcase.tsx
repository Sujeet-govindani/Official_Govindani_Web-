import EcommercePage from "@/pages/EcommercePage";
import { ExternalLink, Play } from "lucide-react";
import EcommercePortfolio from "./EcommercePortfolio";

const portfolioItems = [
  {
    category: "Fashion",
    title: "Luxury Clothing Brand",
    description: "Complete e-commerce with size guides, wishlist & AR try-on",
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/20",
  },
  {
    category: "Jewelry",
    title: "Premium Jewelry Store",
    description: "360° product views, custom engraving, gift packaging",
    gradient: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/20",
  },
  {
    category: "Electronics",
    title: "Tech Gadgets Store",
    description: "Compare products, EMI options, warranty tracking",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
  },
  {
    category: "Home Decor",
    title: "Interior Design Shop",
    description: "Room visualizer, bulk ordering, trade discounts",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
  },
];

const PortfolioShowcase = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 8%) 0%, hsl(0 0% 6%) 100%)" }}>
      <EcommercePortfolio />
    </section>
  );
};

export default PortfolioShowcase;