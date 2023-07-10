import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const filters = [
  { title: "All Bookings", value: "all" },
  { title: "Unconfirmed", value: "unconfirmed" },
  { title: "Cheked in", value: "checked-in" },
  { title: "Cheked out", value: "checked-out" },
];

const sorts = [
  { title: "Sort by cabin name (A-Z)", value: "cabinName-asc" },
  { title: "Sort by cabin name (Z-A)", value: "cabinName-desc" },
  { title: "Sort by start date (oldest first)", value: "startDate-asc" },
  { title: "Sort by start date (newest first)", value: "startDate-desc" },
  { title: "Sort by price (low first)", value: "totalPrice-asc" },
  { title: "Sort by price (high first)", value: "totalPrice-desc" },
];

const BookingsOperations = () => {
  return (
    <TableOperations>
      <Filter filters={filters} />
      <SortBy sorts={sorts} />
    </TableOperations>
  );
};

export default BookingsOperations;
