import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Event {
  _id: string;
  name: string;
  createdAt: string;
}

const CardSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEventData = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.get(`${baseURL}/event/all`);
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleBook = (eventId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warn("Please login to book tickets", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light',
      });
      navigate("/signin");
      return;
    }

    navigate(`/event/${eventId}`);
  };

  if (loading) {
    return <p className="text-center py-10">Loading events...</p>;
  }

  return (
    <div className="w-full bg-gray-100 py-10 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...events, ...events].map((event, index) => (
          <div
            key={`${event._id}-${index}`}
            className="mx-4 shrink-0"
          >
            <Card
              title={event.name}
              date={new Date(event.createdAt).toLocaleDateString()}
              image={`/events/${event._id}.png`}
              onBook={() => handleBook(event._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
