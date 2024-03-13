import { useQuery } from "@tanstack/react-query";
import { UserService } from "../../api/service/user.service";
import { Users } from "../../interfaces/user.interface";

const useGetUsers = () => {
  return useQuery<Users[]>({
    queryKey: ["users"],
    queryFn: UserService.getAllusers,
  });
};

export { useGetUsers };
