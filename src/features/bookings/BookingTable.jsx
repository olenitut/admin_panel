import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import useBookings from "./useBookings";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { bookings, isLoading } = useBookings();

  let bookingsToRender = bookings;
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resource="bookings" />;

  if (filter && filter !== "all") {
    bookingsToRender = bookings?.filter((el) => el.status === filter);
  }

  if (sort) {
    const [key, direction] = sort.split("-");
    bookingsToRender?.sort((cur, prev) => {
      if (key === "cabinName") {
        return cur.cabins.name.localeCompare(prev.cabins.name);
      }
      if (key === "startDate") {
        return Number(new Date(cur[key])) - Number(new Date(prev[key]));
      }

      return Number(cur[key]) - Number(prev[key]);
    });

    if (direction === "desc") {
      bookingsToRender?.reverse();
    }
  }

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookingsToRender}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
