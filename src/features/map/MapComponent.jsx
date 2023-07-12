import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useCabins from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import MapPopup from "./MapPopup";
import MapClickHandler from "./MapClickHandler";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateCabinForm from "../cabins/CreateCabinForm";
import { useDarkMode } from "../../context/DarkModeContext";

const spain = [40.416775, -3.70379];

const MapComponent = () => {
  const { isLoading, cabins } = useCabins();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const { isDark } = useDarkMode();
  const url = `https://{s}.basemaps.cartocdn.com/${
    isDark ? "dark" : "light"
  }_all/{z}/{x}/{y}{r}.png`;

  if (isLoading) return <Spinner />;
  const handleClick = (coords) => {
    setIsModalOpen(true);
    setClicked(coords);
  };

  return (
    <div>
      <MapContainer center={spain} zoom={14} style={{ height: "65vh" }}>
        <TileLayer url={url} />
        <MapClickHandler onCoords={handleClick} />
        {cabins?.map((el) => {
          const [lat, lng] = el.position.split(",");
          return (
            <Marker
              position={[lat, lng]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
              }}
              key={el.id}
            >
              <Popup>
                <MapPopup
                  title={el.name}
                  price={el.regularPrice}
                  description={el.description}
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <Modal onClose={() => setIsModalOpen(false)}>
        <Modal.Window name="cabin-form" isOpen={isModalOpen}>
          <CreateCabinForm coords={`${clicked?.lat},${clicked?.lng}`} />
        </Modal.Window>
      </Modal>
    </div>
  );
};
export default MapComponent;
