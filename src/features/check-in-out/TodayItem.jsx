import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 920px) {
    grid-template-columns: 8rem 2rem 1fr 5rem;
    gap: 0.5rem;
    align-items: center;

    font-size: 1rem;
    padding: 0.6rem 0;
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const TodayItem = ({ el }) => {
  const { status, guests, numNights } = el;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests?.countryFlag} alt={`Flag of ${guests?.country}`}></Flag>
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
    </StyledTodayItem>
  );
};
export default TodayItem;
