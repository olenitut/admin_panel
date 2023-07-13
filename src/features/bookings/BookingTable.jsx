import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import useBookings from "./useBookings";
import { useState } from "react";
import { styled } from "styled-components";

const PaginatorContainer = styled.div`
  .item {
    display: flex;
    align-items: center;
    color: var(--color-grey-600);
    cursor: pointer;
    font-size: 15px;
    justify-content: center;
    padding: 4px 10px;
    border-radius: 5px;

    &:hover {
      background-color: var(--color-grey-200);
    }
  }

  .disabled-page {
    color: var(--color-grey-400);
  }

  .active {
    color: var(--color-indigo-700);
    border: 1px solid var(--color-indigo-700);
  }

  .next {
    font-size: 15px;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }

  .pagination-page {
    font-weight: 600;
  }

  .previous {
    font-size: 15px;
  }
`;

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bookings?.length;
    setItemOffset(newOffset);
  };

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

  const pageCount = Math.ceil(bookingsToRender?.length / itemsPerPage);
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
      <PaginatorContainer>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          activeClassName={"item active "}
          breakClassName={"item break-me "}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          pageClassName={"item pagination-page "}
          previousClassName={"item previous"}
        />
      </PaginatorContainer>
    </Menus>
  );
}

export default BookingTable;
