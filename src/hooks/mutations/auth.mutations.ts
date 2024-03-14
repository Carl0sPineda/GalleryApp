import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../../api/service/auth.service";

const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AuthService.Register,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export { useRegisterUser };
