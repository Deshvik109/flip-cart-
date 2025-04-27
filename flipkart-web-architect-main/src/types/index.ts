

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Banner {
  id: string;
  title: string;
  description?: string;
  image: string;
  link: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

