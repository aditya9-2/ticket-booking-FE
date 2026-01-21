import Skeleton from "react-loading-skeleton";

const MyBookingsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Title */}
      <Skeleton height={36} width={220} className="mb-6" />

      {/* Scroll container */}
      <div
        className="
          h-[calc(100vh-220px)]
          overflow-y-auto
          pr-2
          space-y-4
        "
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-6"
          >
            {/* LEFT CONTENT */}
            <div className="space-y-3 flex-1">
              <Skeleton height={20} width="60%" />
              <Skeleton height={16} width="40%" />
              <Skeleton height={16} width="30%" />
              <Skeleton height={16} width="50%" />
            </div>

            {/* QR CODE PLACEHOLDER */}
            <Skeleton
              height={120}
              width={120}
              className="rounded-xl self-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsSkeleton;
