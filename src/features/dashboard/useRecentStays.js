import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const days = !searchParams.get("filter")
    ? 7
    : Number(searchParams.get("filter"));

  const queryDate = subDays(new Date(), days).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["recentStays", `last-${days}`],
  });

  const confirmed = stays?.filter((el) => el.status !== "unconfirmed");

  return { isLoading, stays, confirmed };
};
