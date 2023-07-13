import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");

  let cabinsToRender = cabins;
  if (filter === "discount") {
    cabinsToRender = cabins?.filter((el) => el.discount);
  }
  if (filter === "no-discount") {
    cabinsToRender = cabins?.filter((el) => !el.discount);
  }
  if (sort) {
    const [key, direction] = sort.split("-");
    cabinsToRender?.sort((cur, prev) => {
      if (key === "name") {
        return cur[key].localeCompare(prev[key]);
      }
      return cur[key] - prev[key];
    });

    if (direction === "desc") {
      cabinsToRender?.reverse();
    }
  }

  if (search) {
    cabinsToRender = cabinsToRender.filter((el) => {
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

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabinsToRender}
          render={(el) => <CabinRow cabin={el} key={el.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
