
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/types";
import { products as allProducts } from "@/data/mock-data";
import ProductGrid from "@/components/ProductGrid";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

const getUniqueCategories = (products: Product[]) => {
  return Array.from(new Set(products.map(product => product.category)));
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = getUniqueCategories(allProducts);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategories([category]);
    }
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...allProducts];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case "price-low-high":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          result.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategories, priceRange, sortOption]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 50000]);
    setSelectedCategories([]);
    setSortOption("");
  };

  return (
    <main className="flipkart-container py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters for desktop */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-lg">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-flipkart-blue"
              >
                Clear All
              </button>
            </div>

            {/* Price Range Filter */}
            <div className="border-t pt-4 pb-6">
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 50000]}
                  min={0}
                  max={50000}
                  step={1000}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="border-t pt-4 pb-6">
              <h3 className="font-medium mb-4">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm capitalize"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Search and sort bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="">Sort By</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
                <Button
                  variant="outline"
                  className="md:hidden flex items-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 md:hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-flipkart-blue"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 50000]}
                    min={0}
                    max={50000}
                    step={1000}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-4">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`mobile-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label
                        htmlFor={`mobile-category-${category}`}
                        className="ml-2 text-sm capitalize"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => setShowFilters(false)}
              >
                Apply
              </Button>
            </div>
          )}

          {/* Product results */}
          {filteredProducts.length > 0 ? (
            <ProductGrid 
              products={filteredProducts} 
              title={`${filteredProducts.length} Products Found`} 
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-lg font-medium mb-2">No products found</h2>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Products;
