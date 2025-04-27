
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ShippingAddressForm from "@/components/checkout/ShippingAddressForm";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import OrderSummary from "@/components/checkout/OrderSummary";
import type { PaymentMethod } from "@/components/checkout/PaymentMethodSelector";
import { createClient } from "@/integrations/supabase/client";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const canceled = searchParams.get("canceled");
  const success = searchParams.get("success");

  // Handle success redirect from payment provider
  if (success) {
    toast({
      title: "Order Placed Successfully",
      description: "Your order has been processed and is being prepared.",
      variant: "default"
    });
    clearCart();
    navigate('/orders', { replace: true });
    return null; // Prevent further rendering
  }

  // Handle canceled payment
  if (canceled) {
    toast({
      title: "Payment canceled",
      description: "You have canceled the payment process",
      variant: "destructive"
    });
    navigate('/checkout', { replace: true });
    return null; // Prevent further rendering
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  const handleStateChange = (state: string) => {
    setAddressForm(prev => ({ ...prev, state }));
  };

  const handleCityChange = (city: string) => {
    setAddressForm(prev => ({ ...prev, city }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some products before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);

    try {
      // For simple demo simulation
      if (paymentMethod === "cod") {
        await simulatePaymentProcessing();
        processSuccessfulPayment();
        return;
      }
      
      // For card and UPI payments, call the Supabase Edge Function
      const supabase = createClient();
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          addressForm,
          cartItems,
          cartTotal,
          paymentMethod
        }
      });

      if (error) {
        throw new Error(`Payment processing failed: ${error.message}`);
      }

      if (paymentMethod === "card" && data?.url) {
        // Redirect to Stripe checkout for card payments
        window.location.href = data.url;
        return;
      }
      
      // For UPI or if no redirect URL is provided
      processSuccessfulPayment();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "There was a problem processing your payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  // Simulate payment processing for demo purposes
  const simulatePaymentProcessing = async () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  // Handle successful payment
  const processSuccessfulPayment = () => {
    toast({
      title: "Order Placed Successfully",
      description: `Your order has been placed using ${
        paymentMethod === "card" ? "Credit/Debit Card" : 
        paymentMethod === "upi" ? "UPI" : "Cash on Delivery"
      }`,
      variant: "default"
    });
    clearCart();
    navigate('/orders?success=true', { replace: true });
  };

  if (cartItems.length === 0) {
    return (
      <main className="flipkart-container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-4">Add some products to your cart before checking out.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="flipkart-container py-6">
      <h1 className="section-title">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-8/12">
          <ShippingAddressForm
            addressForm={addressForm}
            handleInputChange={handleInputChange}
            handleStateChange={handleStateChange}
            handleCityChange={handleCityChange}
          />
          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
          />
        </div>

        <div className="lg:w-4/12">
          <OrderSummary
            cartItems={cartItems}
            cartTotal={cartTotal}
            isProcessing={isProcessing}
            onSubmit={handleSubmit}
          />
        </div>
      </form>
    </main>
  );
};

export default Checkout;
