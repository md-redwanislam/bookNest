import Lottie from "lottie-react";
import Skeleton from "react-loading-skeleton";

import ImagePlaceholder from "../../assets/book-skeleton.json";

const FeaturedSkeleton = ({ length, count }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: length }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white w-72 shadow-sm hover:shadow-md"
        >
          <Lottie
            className="w-72 h-48 object-cover"
            animationData={ImagePlaceholder}
            loop
          />

          <div className="p-4 text-sm">
            <Skeleton count={count} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSkeleton;
