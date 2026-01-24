import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminEventCard from "../../components/admin/adminEventCard";

interface Event {
  _id: string;
  name: string;
  createdAt: string;
}

const AdminEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/event/all`
    );
    setEvents(res.data.events || []);
  };

  const deleteEvent = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/delete-event/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Event deleted");
      fetchEvents();
    } catch {
      toast.error("Failed to delete event");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <button
          onClick={() => navigate("/admin/events/create")}
          className="bg-black text-white px-5 py-2 rounded-full font-medium"
        >
          + Create Event
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map(event => (
            <AdminEventCard
              key={event._id}
              id={event._id}
              name={event.name}
              date={new Date(event.createdAt).toDateString()}
              onDelete={() => deleteEvent(event._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventsPage;
