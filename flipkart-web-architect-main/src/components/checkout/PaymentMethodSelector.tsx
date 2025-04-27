
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Banknote } from "lucide-react";

export type PaymentMethod = "card" | "upi" | "cod";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector = ({ selectedMethod, onMethodChange }: PaymentMethodSelectorProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-xl font-medium mb-4">Payment Method</h2>
      <p className="text-gray-500 mb-4">
        For demo purposes, all payment methods will simulate a successful transaction.
      </p>
      <RadioGroup value={selectedMethod} onValueChange={(value) => onMethodChange(value as PaymentMethod)}>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 border rounded-md p-3 hover:bg-gray-50 cursor-pointer transition-colors">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex flex-1 items-center gap-3 cursor-pointer">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <div className="grid gap-1 font-normal">
                <span className="font-medium">Credit/Debit Card</span>
                <span className="text-sm text-gray-500">Pay securely with your card</span>
              </div>
            </Label>
          </div>

          <div className="flex items-start space-x-3 border rounded-md p-3 hover:bg-gray-50 cursor-pointer transition-colors">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="flex flex-1 items-center gap-3 cursor-pointer">
              <Wallet className="h-5 w-5 text-gray-600" />
              <div className="grid gap-1 font-normal">
                <span className="font-medium">UPI</span>
                <span className="text-sm text-gray-500">Pay using UPI apps like Google Pay, PhonePe, etc.</span>
              </div>
            </Label>
          </div>

          <div className="flex items-start space-x-3 border rounded-md p-3 hover:bg-gray-50 cursor-pointer transition-colors">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex flex-1 items-center gap-3 cursor-pointer">
              <Banknote className="h-5 w-5 text-gray-600" />
              <div className="grid gap-1 font-normal">
                <span className="font-medium">Cash on Delivery</span>
                <span className="text-sm text-gray-500">Pay when your order arrives</span>
              </div>
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
