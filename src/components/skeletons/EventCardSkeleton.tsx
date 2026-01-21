import Skeleton from "react-loading-skeleton"

const EventCardSkeleton = () => {
  return (
   <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* Image */}
      <Skeleton height={180} />

      <div className="p-4 space-y-3">
        <Skeleton height={22} width="80%" />
        <Skeleton height={16} width="50%" />
        <Skeleton height={40} className="mt-4" />
      </div>
    </div>
  )
}

export default EventCardSkeleton