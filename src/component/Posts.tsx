import { useGetPosts } from "../hooks/queries/posts.queries";
import SkeletonPost from "./SkeletonPost";

const Posts = () => {
  const { data: posts, isLoading } = useGetPosts();

  if (isLoading) {
    return <SkeletonPost />;
  }

  return (
    <div className="py-14 mt-6">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          {posts && posts.length > 0 ? (
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <div className="relative w-full h-60 sm:h-52 md:h-56">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover object-center shadow-md rounded-xl"
                      alt="postImages.jpg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-50 text-white text-left rounded-xl">
                      <h4 className="text-xl font-semibold">{post.title}</h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-4xl">No hay posts disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
