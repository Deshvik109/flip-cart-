
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Mail, User, LogIn, UserPlus } from "lucide-react";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const isRegisterPage = location.pathname === "/register";
  const defaultTab = isRegisterPage ? "register" : "login";

  // Login form
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (values: LoginValues) => {
    const success = await login(values.email, values.password);
    if (success) {
      navigate("/");
    }
  };

  const handleRegister = async (values: RegisterValues) => {
    if (values.password !== values.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    const success = await register(values.name, values.email, values.password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <main className="flipkart-container py-8 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Tabs defaultValue={defaultTab}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="login">
                <h2 className="text-2xl font-bold mb-6 text-flipkart-blue">Welcome Back</h2>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="yourname@example.com"
                                {...field}
                                className="pl-10"
                              />
                            </FormControl>
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="******"
                                {...field}
                                className="pl-10"
                              />
                            </FormControl>
                            <LogIn className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-right">
                      <a href="#" className="text-sm text-flipkart-blue hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <h2 className="text-2xl font-bold mb-6 text-flipkart-blue">Create Account</h2>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                                className="pl-10"
                              />
                            </FormControl>
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="yourname@example.com"
                                {...field}
                                className="pl-10"
                              />
                            </FormControl>
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="******"
                                {...field}
                                className="pl-10"
                              />
                            </FormControl>
                            <LogIn className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="******"
                                {...field}
                                className="pl-10"
                              />
                            </FormControl>
                            <UserPlus className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to Flipkart's{" "}
            <a href="#" className="text-flipkart-blue hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-flipkart-blue hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default Auth;
