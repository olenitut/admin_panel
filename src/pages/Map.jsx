import MapComponent from "../features/map/MapComponent";
import Heading from "../ui/Heading";
import Tooltip from "../ui/Tooltip";

const Map = () => {
  return (
    <>
      <Tooltip text="Click on a position on the map to add a cabin there">
        <Heading as="h1">View and Add Cabins on Map</Heading>
      </Tooltip>
      <MapComponent />
    </>
  );
};
export default Map;
