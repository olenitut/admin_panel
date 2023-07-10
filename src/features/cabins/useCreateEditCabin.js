import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, editCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

const useCreateEditCabin = (editData) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: editData ? editCabin : createCabin,
    onSuccess: () => {
      toast.success(editData ? `Cabin upadated` : "New cabin created");
      queryClient.invalidateQueries({
        queryKey: "cabin",
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, mutate };
};

export default useCreateEditCabin;
