import { GoogleMap, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { add } from 'lodash';
import React, { useState } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import PlacesAutoComplete from 'shared/PlacesAutoComplete/PlacesAutoComplete';


const containerStyle = {
  width: '100%',
  height: '100%',
};

interface GoogleMapChooserProps {
  onChangePosition?: (position: Position) => void;
  onSave? : (position: Position, result: any) => void;
}

export type Position = {
  lat: number;
  lng: number;
};

const GoogleMapChooser: React.FC<GoogleMapChooserProps> = ({
  onChangePosition,
  onSave
}) => {
  const [markerPosition, setMarkerPosition] = useState<Position>({
    lat: 41.2995,
    lng: 69.2401,
  });
  const [result, setResult] = useState<any>();

  
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      getAddressFromCoordinates(lat , lng)
      setMarkerPosition({ lat, lng });
      onChangePosition && onChangePosition({ lat, lng });
    }
  };

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`
      );
      const data = response.data;
      while (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const neededComponent = ['locality', 'administrative_area_level_1'];
        const set = new Set<string>();
        for(const addr of addressComponents) {
          for(const type of addr.types) {
            set.add(type);
          }
        }
        for(const needed of neededComponent){
          if(!set.has(needed)) {
            data.results.shift();
            continue;
          }
        }
        setResult(data.results[0])
        return
      } 

      setResult(undefined)
    } catch (error) {
      console.log('[Error] on get address from coordinate')
    }
  }
  
  return (
    <div className='h-[80vh] sm:h-[70vh] flex flex-col'>
      <label className="block">
        <span className="mb-2.5 text-neutral-800 dark:text-neutral-200">
          Search your place
        </span>
        <PlacesAutoComplete
          className="mb-2"
          onChangePosition={({ lat, lng }) => {
            getAddressFromCoordinates(lat , lng)
            setMarkerPosition({ lat, lng });
            onChangePosition && onChangePosition({ lat, lng });
          }}
        />
      </label>
      <div className="h-full rounded-3xl overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={10}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>
        <ButtonPrimary
        disabled={!result}
        onClick={() => {
          if(onSave){
            onSave(markerPosition, result)
          }
        }}
        className='w-full mt-3'>
          Save
        </ButtonPrimary>
    </div>
  );
};

export default GoogleMapChooser;
