
import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: number;
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const OrderSummary = ({ cartItems, cartTotal, isProcessing, onSubmit }: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
      <div className="max-h-80 overflow-y-auto mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex py-2 border-b">
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-3 flex-grow">
              <p className="text-sm line-clamp-1">{item.title}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              <p className="font-medium">₹{item.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span className="text-flipkart-green">FREE</span>
        </div>
        <div className="flex justify-between font-medium text-lg pt-2 border-t mt-2">
          <span>Total</span>
          <span>₹{cartTotal.toLocaleString()}</span>
        </div>

        <Button 
          onClick={onSubmit}
          className="w-full mt-4 bg-flipkart-yellow text-black hover:bg-flipkart-yellow/90"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
