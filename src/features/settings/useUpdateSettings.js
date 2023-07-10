import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated");
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
export default useUpdateSettings;
