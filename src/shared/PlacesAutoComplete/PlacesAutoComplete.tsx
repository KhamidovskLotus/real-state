import React, { useState } from 'react';
import { Position } from 'shared/GoogleMapChooser/GoogleMapChooser';
import Input from 'shared/Input/Input';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

export type PositionWithAddress = Position & {
  address: string;
};

interface PlacesAutoCompleteProps {
  className?: string;
  onChangePosition?: (pos: PositionWithAddress) => void;
}

export default function PlacesAutoComplete({
  className = '',
  onChangePosition,
}: PlacesAutoCompleteProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({});

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      clearSuggestions();
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    const result = await getGeocode({ address });
    const { lat, lng } = await getLatLng(result[0]);

    if (onChangePosition) {
      onChangePosition({ lat, lng, address });
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        value={value}
        onChange={handleInputChange}
        disabled={!ready}
        placeholder="Select Your Location"
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && status === 'OK' && (
        <div className="absolute top-[44px] flex bg-white flex-col gap-1.5 border border-stroke rounded left-0 w-full z-20">
          {data.map(({ description, place_id }: any) => (
            <div
              className="w-full cursor-pointer bg-white hover:bg-neutral-100 text-sm px-2 rounded py-1"
              key={place_id}
              onClick={() => {
                setShowSuggestions(false);
                handleSelect(description);
              }}
            >
              {description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
