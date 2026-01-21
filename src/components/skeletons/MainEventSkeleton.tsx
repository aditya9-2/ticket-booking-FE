import Skeleton from "react-loading-skeleton"

const MainEventSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      {/* LEFT */}
      <div>
        <Skeleton height={40} width="70%" />
        <Skeleton height={20} width="40%" className="mt-3" />

        <div className="mt-10 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border rounded-xl p-4 flex justify-between items-center"
            >
              <div className="space-y-2">
                <Skeleton height={18} width={120} />
                <Skeleton height={14} width={80} />
              </div>
              <Skeleton height={20} width={60} />
            </div>
          ))}
        </div>

        <div className="mt-8 border rounded-xl p-4 space-y-4">
          <Skeleton height={20} width={160} />
          <Skeleton height={40} width={120} />
          <Skeleton height={20} width={100} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-center gap-6">
        <Skeleton height={320} width="100%" className="rounded-2xl" />

        <div className="w-full bg-gray-50 rounded-2xl p-6 shadow space-y-4">
          <Skeleton height={16} width={100} />
          <Skeleton height={36} width={140} />
          <Skeleton height={48} width="100%" className="rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default MainEventSkeleton