import { useSearchParams } from "react-router-dom";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import useBookings from "./useBookings";
import { useEffect, useState } from "react";
import Paginator from "../../ui/Paginator";

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  const itemsPerPage = 5;

  let bookingsToRender = bookings;
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  const [itemOffset, setItemOffset] = useState(
    () => (page * itemsPerPage) % bookingsToRender?.length
  );
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    const newOffset = ((page - 1) * itemsPerPage) % bookingsToRender?.length;
    setItemOffset(newOffset);
  }, [page, bookingsToRender?.length]);

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

  if (search) {
    bookingsToRender = bookingsToRender.filter((el) => {
      let toInclude = false;
      Object.keys(el).forEach((key) => {
        el[key];
        if (JSON.stringify(el[key]).toLowerCase().includes(search)) {
          toInclude = true;
        }
      });

      return toInclude;
    });
  }

  const paginatedBookings = bookingsToRender?.slice(itemOffset, endOffset);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 0.1fr">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={paginatedBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
      <Paginator
        length={bookingsToRender?.length}
        itemsPerPage={itemsPerPage}
      />
    </Menus>
  );
}

export default BookingTable;
