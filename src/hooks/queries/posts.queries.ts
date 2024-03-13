import { useQuery } from "@tanstack/react-query";
import { PostService } from "../../api/service/post.service";
import { Posts } from "../../interfaces/post.interface";

const useGetPosts = () => {
  return useQuery<Posts[]>({
    queryKey: ["posts"],
    queryFn: PostService.getAllposts,
  });
};

export { useGetPosts };
