import React from "react";
import { Input } from "@/components/ui/input";
import StateCity from "@/components/StateCity";

interface AddressForm {
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ShippingAddressFormProps {
  addressForm: AddressForm;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStateChange: (state: string) => void;
  handleCityChange: (city: string) => void;
}

const ShippingAddressForm = ({
  addressForm,
  handleInputChange,
  handleStateChange,
  handleCityChange,
}: ShippingAddressFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              type="text"
              name="fullName"
              value={addressForm.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <Input
              type="tel"
              name="phoneNumber"
              value={addressForm.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Street Address</label>
          <Input
            type="text"
            name="streetAddress"
            value={addressForm.streetAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        <StateCity 
          onStateChange={handleStateChange}
          onCityChange={handleCityChange}
          selectedState={addressForm.state}
          selectedCity={addressForm.city}
        />

        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <Input
            type="text"
            name="zipCode"
            value={addressForm.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
