import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  date: string;
  onDelete: () => void;
}

const AdminEventCard = ({ id, name, date, onDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-sm text-gray-500 mb-6">{date}</p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/admin/events/edit/${id}`)}
          className="flex-1 border border-black py-2 rounded-lg font-medium hover:bg-black hover:text-white"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg font-medium hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminEventCard;
