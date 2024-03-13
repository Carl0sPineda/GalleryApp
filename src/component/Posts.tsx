import { useGetPosts } from "../hooks/queries/posts.queries";

const Posts = () => {
  const { data: posts } = useGetPosts();

  return (
    <section className="py-14 mt-6">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl mx-auto sm:text-center"></div>
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {posts?.map((post) => (
              <li key={post.id}>
                <div className="relative w-full h-60 sm:h-52 md:h-56">
                  <img
                    src={post.image}
                    className="w-full h-full object-cover object-center shadow-md rounded-xl"
                    alt=""
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-50 text-white text-left rounded-xl">
                    <h4 className="text-xl font-semibold">{post.title}</h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Posts;
