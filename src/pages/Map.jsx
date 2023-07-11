import { styled } from "styled-components";
import MapComponent from "../features/map/MapComponent";
import Heading from "../ui/Heading";
import TooltipButton from "../ui/Tooltip";

const StyledTooltipContainer = styled.div`
  position: relative;
  width: max-content;
`;

const Map = () => {
  return (
    <>
      <StyledTooltipContainer>
        <Heading as="h1">View and Add Cabins on Map</Heading>
        <TooltipButton text="Click on a position on the map to add a cabin there" />
      </StyledTooltipContainer>
      <MapComponent />
    </>
  );
};
export default Map;
