interface EventCardProps {
  image: string;
  title: string;
  date: string;
  onBook: () => void;
}

const Card = ({ image, title, date, onBook }: EventCardProps) => {
  return (
    <div
      className="w-[320px] rounded-2xl overflow-hidden 
                 bg-white shadow-lg hover:shadow-2xl
                 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="h-45 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover 
                     hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold truncate">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      {/* CTA */}
      <div className="p-4 pt-0">
        <button
          onClick={onBook}
          className="w-full py-3 rounded-full 
                     bg-black text-white font-semibold
                      transition-colors hover:cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Card;
