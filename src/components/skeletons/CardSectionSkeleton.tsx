import Skeleton from "react-loading-skeleton";

const CardSectionSkeleton = () => {
  return (
    <div className="w-full bg-gray-100 py-10 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mx-4 shrink-0">
            <div className="w-64 h-80 p-4 bg-white rounded-xl shadow-md">
              <Skeleton height={150} className="rounded-lg mb-4" />
              <Skeleton height={20} width="80%" className="mb-2" />
              <Skeleton height={20} width="60%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSectionSkeleton;
