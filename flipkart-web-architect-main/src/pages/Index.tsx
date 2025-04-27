
import { useEffect } from "react";
import BannerSlider from "@/components/BannerSlider";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import { banners, categories, products } from "@/data/mock-data";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products for different sections
  const newArrivals = products.filter(product => product.isNew);
  const onSale = products.filter(product => product.isSale);
  const topRated = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 5);

  return (
    <main>
      <BannerSlider banners={banners} />
      <CategorySection categories={categories} />

      <div className="flipkart-container">
        <ProductGrid products={newArrivals} title="New Arrivals" />
        <ProductGrid products={onSale} title="On Sale" />
        <ProductGrid products={topRated} title="Top Rated" />
      </div>
    </main>
  );
};

export default Index;
