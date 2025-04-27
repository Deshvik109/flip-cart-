
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block flex-grow">
        <div className="relative pt-[100%] overflow-hidden">
          {product.isNew && <span className="badge-new">NEW</span>}
          {product.isSale && <span className="badge-sale">SALE</span>}
          <img 
            src={product.image} 
            alt={product.title} 
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.title}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center bg-flipkart-green text-white text-xs px-1 rounded">
              <span>{product.rating.rate}</span>
              <Star className="h-3 w-3 ml-0.5 fill-white" />
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.rating.count})</span>
          </div>
          <div className="flex items-baseline">
            <span className="font-medium">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-gray-500 line-through ml-2">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs text-flipkart-green ml-2">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <Button 
          className="w-full bg-flipkart-yellow hover:bg-flipkart-yellow/90 text-black"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
