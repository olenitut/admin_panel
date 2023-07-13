import Filter from "../../ui/Filter";
import Search from "../../ui/Search";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const filters = [
  { title: "All Cabins", value: "all" },
  { title: "With Discount", value: "discount" },
  { title: "No Discount", value: "no-discount" },
];

const sorts = [
  { title: "Sort by name (A-Z)", value: "name-asc" },
  { title: "Sort by name (Z-A)", value: "name-desc" },
  { title: "Sort by price (low first)", value: "regularPrice-asc" },
  { title: "Sort by price (high first)", value: "regularPrice-desc" },
];

const CabinOperations = () => {
  return (
    <TableOperations>
      <Filter filters={filters} />
      <SortBy sorts={sorts} />
      <Search />
    </TableOperations>
  );
};

export default CabinOperations;
