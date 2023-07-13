import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking, updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

const useCreateEditCabin = (editData) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: editData ? updateBooking : createBooking,
    onSuccess: () => {
      toast.success(editData ? `Booking upadated` : "New booking created");
      queryClient.invalidateQueries({
        queryKey: "bookings",
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, mutate };
};

export default useCreateEditCabin;
