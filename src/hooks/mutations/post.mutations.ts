import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "../../api/service/post.service";

const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PostService.addPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export { useAddPost };
