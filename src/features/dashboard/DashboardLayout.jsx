import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 1250px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 34rem auto;
  }
`;

const DashboardLayout = () => {
  const { bookings, isLoading, days } = useRecentBookings();
  const { stays, confirmed, isLoading: isLoadingStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmed={confirmed}
        days={days}
        cabinCount={cabins.length}
      />
      <Today />
      <DurationChart confirmed={confirmed} />
      <SalesChart bookings={bookings} days={days} />
    </StyledDashboardLayout>
  );
};
export default DashboardLayout;
