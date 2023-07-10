import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const days = !searchParams.get("filter")
    ? 7
    : Number(searchParams.get("filter"));

  const queryDate = subDays(new Date(), days).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["recentBookings", `last-${days}`],
  });

  return { isLoading, bookings, days };
};
