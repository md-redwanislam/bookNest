import Lottie from "lottie-react";
import Skeleton from "react-loading-skeleton";

import ImagePlaceholder from "../../assets/book-skeleton.json";

const BookListSkeleton = ({ length, count }) => {
  return Array.from({ length }).map((_, index) => (
    <div
      key={index}
      className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden w-72"
    >
      <Lottie className="w-full h-48" animationData={ImagePlaceholder} loop />

      <div className="p-4">
        <Skeleton count={count} />
      </div>
    </div>
  ));
};

export default BookListSkeleton;
