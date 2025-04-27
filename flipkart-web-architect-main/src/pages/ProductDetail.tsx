
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "@/types";
import { products } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import ProductGrid from "@/components/ProductGrid";
import { Star, Truck, Package } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct || null);
    setLoading(false);
    
    // Reset quantity when product changes
    setQuantity(1);
    
    // Scroll to top on product change
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  // Find related products based on category
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5)
    : [];

  if (loading) {
    return (
      <div className="flipkart-container py-8">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/5">
              <div className="h-80 bg-gray-300 rounded"></div>
            </div>
            <div className="w-full md:w-3/5">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-24 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flipkart-container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-4">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="flipkart-container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-2/5">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="relative pt-[100%]">
              <img
                src={product.image}
                alt={product.title}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button 
              className="w-full bg-flipkart-blue" 
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
            <Button 
              className="w-full bg-flipkart-yellow text-black hover:bg-flipkart-yellow/90" 
              onClick={() => {
                addToCart(product, 1);
                window.location.href = "/cart";
              }}
            >
              BUY NOW
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-3/5">
          <nav className="text-sm breadcrumbs mb-4">
            <ol className="flex space-x-2">
              <li><Link to="/" className="text-flipkart-blue hover:underline">Home</Link></li>
              <li className="text-gray-500">/</li>
              <li>
                <Link 
                  to={`/products?category=${product.category}`} 
                  className="text-flipkart-blue hover:underline capitalize"
                >
                  {product.category}
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-500 truncate">{product.title}</li>
            </ol>
          </nav>

          <h1 className="text-xl md:text-2xl font-medium mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-flipkart-green text-white text-sm px-1.5 py-0.5 rounded">
              <span className="font-medium">{product.rating.rate}</span>
              <Star className="h-4 w-4 ml-0.5 fill-white" />
            </div>
            <span className="text-sm text-gray-500 ml-2">{product.rating.count} Ratings & Reviews</span>
          </div>
          
          <div className="mb-4">
            <div className="flex items-baseline">
              <span className="text-2xl font-medium">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-gray-500 line-through ml-3">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-flipkart-green ml-3">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>
            {product.originalPrice && <p className="text-xs text-flipkart-green mt-1">Price inclusive of all taxes</p>}
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Select Quantity</h3>
            <div className="flex items-center border rounded w-max">
              <button 
                className="px-3 py-2 border-r hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="w-10 text-center py-2">{quantity}</span>
              <button 
                className="px-3 py-2 border-l hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="mb-6 space-y-4">
            <div className="flex items-start">
              <Truck className="h-6 w-6 text-flipkart-blue mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Delivery</h3>
                <p className="text-sm text-gray-600">Free delivery available</p>
              </div>
            </div>
            <div className="flex items-start">
              <Package className="h-6 w-6 text-flipkart-blue mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Returns Policy</h3>
                <p className="text-sm text-gray-600">Items are eligible for return within 7 days of delivery</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="font-medium mb-3">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <ProductGrid products={relatedProducts} title="You Might Also Like" />
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
