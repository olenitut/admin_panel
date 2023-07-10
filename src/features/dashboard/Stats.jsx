import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const Stats = ({ bookings, confirmed, days, cabinCount }) => {
  const numBookings = bookings?.length;
  const totalSales = bookings.reduce((acc, el) => acc + el.totalPrice, 0);
  const chikins = confirmed.length;
  const occupancy = Math.round(
    (confirmed.reduce((acc, el) => acc + el.numNights, 0) /
      (days * cabinCount)) *
      100
  );

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={chikins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupancy}%`}
      />
    </>
  );
};
export default Stats;
