import { styled } from "styled-components";

const StyledPopup = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MapPopup = ({ title, price }) => {
  return (
    <StyledPopup>
      <div>Cabin {title}</div>
      <strong>${price}</strong>
    </StyledPopup>
  );
};
export default MapPopup;
