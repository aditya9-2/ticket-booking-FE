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
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/event/all`
      );
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const deleteEvent = async (id: string) => {
    // Basic confirmation for safety
    if (!window.confirm("Are you sure you want to delete this event?")) return;

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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Header Section */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="group flex items-center gap-2 text-gray-500 hover:text-black transition-all font-medium mb-8"
        >
          <svg 
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
            <p className="text-gray-500 mt-1">Total events: {events.length}</p>
          </div>
          <button
            onClick={() => navigate("/admin/events/create")}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>+</span> Create New Event
          </button>
        </div>
      </div>

      {/* Events Grid Section */}
      <div className="max-w-7xl mx-auto px-6">
        {events.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
            <p className="text-gray-500 font-medium">No events found. Start by creating one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
    </div>
  );
};

export default AdminEventsPage;