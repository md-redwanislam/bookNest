import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedSkeleton = ({ length }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: length }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white w-72 shadow-sm hover:shadow-md"
        >
          <Skeleton height={192} borderRadius={0} />

          <div className="p-4 text-sm">
            <Skeleton width="30%" height={14} />
            <Skeleton width="80%" height={16} style={{ marginTop: 6, marginBottom: 6 }} />
            <Skeleton width="60%" height={14} />
            <Skeleton width="50%" height={16} style={{ marginTop: 8, marginBottom: 8 }} />
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Skeleton height={36} />
              <Skeleton height={36} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSkeleton;