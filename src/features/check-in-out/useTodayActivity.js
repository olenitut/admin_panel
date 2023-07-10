import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

const useTodayActivity = () => {
  const { data, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today"],
  });

  return { isLoading, data };
};
export default useTodayActivity;
