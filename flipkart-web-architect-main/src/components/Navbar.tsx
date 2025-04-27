
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Search, ShoppingCart, User, Menu, LogIn, UserPlus, LogOut } from "lucide-react";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full bg-flipkart-blue shadow-md">
      <div className="flipkart-container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Flipkart</span>
            <span className="text-xs italic text-white/80 ml-1 hidden sm:block">
              Explore <span className="text-flipkart-yellow">Plus</span>
            </span>
          </Link>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative w-full max-w-2xl">
            <Input
              type="search"
              placeholder="Search for products, brands and more"
              className="w-full h-10 pl-10 bg-white"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white">
                {user ? (
                  <>
                    <User className="h-5 w-5 mr-2" />
                    <span>{user.name}</span>
                  </>
                ) : (
                  <>
                    <User className="h-5 w-5 mr-2" />
                    <span>Login</span>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user ? (
                <>
                  <DropdownMenuItem className="font-medium text-sm">{user.email}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => navigate("/account")}>
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/orders")}>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onSelect={() => navigate("/login")}>
                    <LogIn className="h-4 w-4 mr-2" />
                    <span>Sign In</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/register")}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span>Register</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/cart">
            <Button variant="ghost" className="text-white relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-flipkart-yellow text-flipkart-blue rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-white">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-flipkart-yellow text-flipkart-blue rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden bg-flipkart-blue px-4 pb-3">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search products"
            className="w-full h-10 pl-10 bg-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 right-0 h-full w-3/4 bg-white shadow-xl animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                  ✕
                </Button>
              </div>
            </div>
            <nav className="p-4 space-y-4">
              {user ? (
                <>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <Link 
                    to="/account" 
                    className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>My Account</span>
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>My Orders</span>
                  </Link>
                  <button
                    className="flex items-center p-2 hover:bg-gray-100 rounded-md w-full text-left"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-3 text-flipkart-blue" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3 text-flipkart-blue" />
                  <span>Login / Register</span>
                </Link>
              )}
              <Link 
                to="/cart" 
                className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-3 text-flipkart-blue" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="ml-2 bg-flipkart-blue text-white rounded-full px-2 py-1 text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
