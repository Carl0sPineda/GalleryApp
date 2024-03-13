const SkeletonPost = () => {
  return (
    <div className="py-14 mt-6">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-md">
              <div className="animate-pulse h-60 sm:h-52 md:h-56 bg-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
