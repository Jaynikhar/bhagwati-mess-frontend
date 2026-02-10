import { MapContainer, TileLayer, Marker, useMapEvents, useMap} from "react-leaflet";
import { useState, useEffect } from "react";
import React from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// function LocationMarker({ setPosition }) {
//   const [position, setPos] = useState(null);

//   useMapEvents({
//     click(e) {
//       setPos(e.latlng);
//       setPosition(e.latlng);
//     },
//   });

//   return position ? <Marker position={position} /> : null;
// }

// export default function MapPicker({ setPosition }) {
//   return (
//     <MapContainer
//       center={[22.57, 88.36]}
//       zoom={13}
//       className="h-64 w-full rounded-xl"
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <LocationMarker setPosition={setPosition} />
//     </MapContainer>
//   );
// }

/* Default location → Indramani Nagar, Gwalior */
const DEFAULT_POSITION = [26.2183, 78.1828];

const LocationMarker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
};

/* Move map when position changes */
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 15);
  return null;
};

const MapPicker = ({ addressText, setAddress }) => {
  const [position, setPosition] = useState({
    lat: DEFAULT_POSITION[0],
    lng: DEFAULT_POSITION[1],
  });


  /* Auto convert written address → coordinates */
  useEffect(() => {
    if (!addressText || addressText.length < 5) return;

    const getCoords = async () => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${addressText}`
        );

        if (res.data.length > 0) {
          const lat = parseFloat(res.data[0].lat);
          const lon = parseFloat(res.data[0].lon);

          setPosition({ lat, lng: lon });
          setAddress(`${lat}, ${lon}`);
        }
      } catch (err) {
        console.log("Geocoding failed");
      }
    };

    const delay = setTimeout(getCoords, 800);
    return () => clearTimeout(delay);
  }, [addressText]);

 return (
    <MapContainer
      center={DEFAULT_POSITION}
      zoom={15}
      className="h-64 w-full rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ChangeView center={[position.lat, position.lng]} />

      <LocationMarker
        setPosition={(pos) => {
          setPosition(pos);
          setAddress(`${pos.lat}, ${pos.lng}`);
        }}
      />

      <Marker position={[position.lat, position.lng]} />
    </MapContainer>
  );
};

export default MapPicker;