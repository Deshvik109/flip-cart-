
import { Banner, Category, Product } from "../types";

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  },
  {
    id: "home",
    name: "Home",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: "appliances",
    name: "Appliances",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "mobile",
    name: "Mobiles",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: "travel",
    name: "Travel",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
  }
];

export const banners: Banner[] = [
  {
    id: "summer-sale",
    title: "Summer Sale!",
    description: "Up to 50% off on all summer items",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    link: "/products?category=fashion"
  },
  {
    id: "electronic-deals",
    title: "Electronic Deals",
    description: "Latest gadgets at best prices",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: "/products?category=electronics"
  },
  {
    id: "new-arrivals",
    title: "New Arrivals",
    description: "Check out our latest products",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    link: "/products"
  }
];

export const products: Product[] = [
  {
    id: "1",
    title: "Smartphone X Pro",
    price: 12999,
    originalPrice: 15999,
    description: "6.5 inch display, 128GB storage, 8GB RAM, 50MP camera",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    rating: {
      rate: 4.5,
      count: 120
    },
    isNew: true,
    discount: 18
  },
  {
    id: "2",
    title: "Laptop Ultra Slim",
    price: 49999,
    originalPrice: 59999,
    description: "15.6 inch FHD display, 512GB SSD, 16GB RAM, Intel i7",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    rating: {
      rate: 4.7,
      count: 85
    },
    discount: 16
  },
  {
    id: "3",
    title: "Wireless Earbuds",
    price: 1999,
    originalPrice: 2499,
    description: "Bluetooth 5.0, Active Noise Cancellation, 30hr Battery Life",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606220588913-84ea3f449565",
    rating: {
      rate: 4.3,
      count: 189
    },
    isSale: true,
    discount: 20
  },
  {
    id: "4",
    title: "Men's Cotton T-Shirt",
    price: 499,
    originalPrice: 799,
    description: "100% Cotton, Breathable Fabric, Available in multiple colors",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820",
    rating: {
      rate: 4.2,
      count: 231
    },
    discount: 37
  },
  {
    id: "5",
    title: "Women's Denim Jacket",
    price: 1299,
    originalPrice: 1999,
    description: "Classic denim jacket with modern fit and comfort",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    rating: {
      rate: 4.6,
      count: 78
    },
    isSale: true,
    discount: 35
  },
  {
    id: "6",
    title: "Smart TV 4K",
    price: 32999,
    originalPrice: 37999,
    description: "55 inch 4K UHD display, Smart TV with built-in streaming",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    rating: {
      rate: 4.8,
      count: 56
    },
    isNew: true,
    discount: 13
  },
  {
    id: "7",
    title: "Coffee Maker",
    price: 2499,
    originalPrice: 2999,
    description: "Automatic coffee maker with integrated grinder",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1566657040696-53e2Kyd7c7c7",
    rating: {
      rate: 4.4,
      count: 112
    },
    discount: 16
  },
  {
    id: "8",
    title: "Running Shoes",
    price: 2299,
    originalPrice: 2799,
    description: "Lightweight running shoes with cushioned support",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    rating: {
      rate: 4.1,
      count: 167
    },
    discount: 17
  },
  {
    id: "9",
    title: "Bluetooth Speaker",
    price: 1499,
    originalPrice: 1999,
    description: "Portable Bluetooth speaker with 20hr battery life",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    rating: {
      rate: 4.0,
      count: 94
    },
    discount: 25
  },
  {
    id: "10",
    title: "Stainless Steel Water Bottle",
    price: 599,
    originalPrice: 799,
    description: "Insulated water bottle keeps drinks cold for 24hrs",
    category: "home",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    rating: {
      rate: 4.9,
      count: 211
    },
    isSale: true,
    discount: 25
  }
];
