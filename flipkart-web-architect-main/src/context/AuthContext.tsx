
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("flipkart_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("flipkart_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Check if email and password meet minimum criteria
      if (!email.includes("@") || password.length < 6) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }

      // In a real app, this data would come from an API
      const mockUser: User = {
        id: "user-" + Date.now(),
        name: email.split("@")[0],
        email,
        isAuthenticated: true,
      };

      // Save to localStorage
      localStorage.setItem("flipkart_user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  // Mock register function - in a real app, this would call an API
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Validate inputs
      if (!name || !email.includes("@") || password.length < 6) {
        toast({
          title: "Registration Failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }

      // In a real app, this would check if email already exists
      const mockUser: User = {
        id: "user-" + Date.now(),
        name,
        email,
        isAuthenticated: true,
      };

      // Save to localStorage
      localStorage.setItem("flipkart_user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Registration Successful",
        description: `Welcome to Flipkart, ${name}!`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("flipkart_user");
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
