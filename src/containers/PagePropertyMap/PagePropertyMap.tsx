import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function PagePropertyMap() {
  const mapStyles = {
    width: '100%',
    height: '91.5%',
  };

  const defaultCenter = {
    lat: 2.508827891694753,
    lng: 103.21007663738632,
  };

  return (
    <div className="min-h-screen">
      <div className="h-screen">
        {/* <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API as string}
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={defaultCenter}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript> */}
      </div>
    </div>
  );
}
