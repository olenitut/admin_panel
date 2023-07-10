import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

const useBooking = (id) => {
  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(id),
  });

  return { isLoading, booking };
};
export default useBooking;
