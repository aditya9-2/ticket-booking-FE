interface EventCardProps {
  image: string
  title: string
  date: string
  onBook?: () => void
}

const Card = ({ image, title, date, onBook }: EventCardProps) => {
    return (
        <div className="w-[320px] rounded-2xl overflow-hidden 
                    bg-white shadow-lg hover:shadow-2xl
                    transition-shadow duration-300">

            {/* Image */}
            <div className="h-90 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover 
                     hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-gray-500">{date}</p>
            </div>

            {/* CTA */}
            <div className="p-4 pt-0">
                <button
                    onClick={onBook}
                    className="w-full py-3 rounded-full 
                     bg-purple-600 text-white font-semibold
                     hover:bg-purple-700 transition-colors">
                    Book Now
                </button>
            </div>
        </div>
    )
}

export default Card