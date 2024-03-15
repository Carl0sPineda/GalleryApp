import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddPost } from "../hooks/mutations/post.mutations";
import { Post } from "../interfaces/post.interface";
import { useAuthStore } from "../stores/auth.store";
import toast from "react-hot-toast";

const AddPost = () => {
  const addPostMutation = useAddPost();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pick<Post, "title" | "image">>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const onSubmit = async (data: Pick<Post, "title" | "image">) => {
    try {
      setIsSubmitting(true);
      await addPostMutation.mutateAsync({ ...data, userId });
      toast.success("Post upload successful!");
      reset();
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="flex justify-center items-center py-14 mt-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>
        <div className="relative mb-4">
          <div className="w-[450px] h-[300px] border-2 border-gray-300 border-dashed rounded-lg p-6">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <span className="text-xl text-gray-500">Add an image</span>
              </div>
            )}
          </div>
          <input
            id="image"
            type="file"
            {...register("image")}
            onChange={onImageChange}
            className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
          />
          {errors.image && (
            <span className="text-red-500 text-xs">{errors.image.message}</span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          {isSubmitting ? "Submit..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
