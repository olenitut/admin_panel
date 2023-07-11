import { useMapEvents } from "react-leaflet";

function MapClickHandler({ onCoords }) {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      onCoords({ lat, lng });
    },
  });
  return null;
}

export default MapClickHandler;
