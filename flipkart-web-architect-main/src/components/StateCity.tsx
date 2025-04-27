
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const indianStates = [
  { name: "Andhra Pradesh", cities: ["Visakhapatnam", "Vijayawada", "Guntur"] },
  { name: "Karnataka", cities: ["Bangalore", "Mysore", "Hubli"] },
  { name: "Kerala", cities: ["Kochi", "Thiruvananthapuram", "Kozhikode"] },
  { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
  { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai"] },
  { name: "Telangana", cities: ["Hyderabad", "Warangal", "Karimnagar"] },
];

interface StateCityProps {
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  selectedState: string;
  selectedCity: string;
}

const StateCity = ({ onStateChange, onCityChange, selectedState, selectedCity }: StateCityProps) => {
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const handleStateChange = (state: string) => {
    const stateData = indianStates.find(s => s.name === state);
    setAvailableCities(stateData?.cities || []);
    onStateChange(state);
    onCityChange(''); // Reset city when state changes
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">State</label>
        <Select value={selectedState} onValueChange={handleStateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {indianStates.map((state) => (
              <SelectItem key={state.name} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {availableCities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StateCity;
