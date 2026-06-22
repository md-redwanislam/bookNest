import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BookListSkeleton = ({ length }) => {
  return Array.from({ length }).map((_, index) => (
    <div key={index} className="flex flex-wrap gap-6">
      <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden w-72">
        <Skeleton height={192} borderRadius={0} />

        <div className="flex flex-col p-4 gap-2 text-sm flex-1 justify-between">
          <div>
            <Skeleton width="30%" height={14} />
            <Skeleton width="80%" height={16} />
            <Skeleton width="60%" height={14} />
          </div>

          <div className="flex flex-col">
            <Skeleton width="50%" height={16} style={{ marginTop: 8, marginBottom: 8 }} />
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Skeleton height={36} />
              <Skeleton height={36} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default BookListSkeleton;