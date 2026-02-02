import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardSectionSkeleton from "../components/skeletons/CardSectionSkeleton";

// Updated Interface to match the new schema
interface Event {
  _id: string;
  name: string;
  date: string;       // Actual event date
  posterUrl?: string; // Root level poster
  createdAt: string;
}

const CardSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEventData = async () => {
    try {
      setLoading(true);
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
        theme: 'light',
      });
      navigate("/signin");
      return;
    }

    navigate(`/event/${eventId}`);
  };

  if (loading) {
    return <CardSectionSkeleton />;
  }

  // If no events exist, don't show an empty marquee
  if (events.length === 0) return null;

  return (
    <div className="w-full bg-gray-100 py-10 overflow-hidden">
      {/* Infinite Marquee Container */}
      <div className="flex w-max animate-marquee">
        {[...events, ...events].map((event, index) => (
          <div
            key={`${event._id}-${index}`}
            className="mx-4 shrink-0"
          >
            <Card
              title={event.name}
              // Fixed: Using the event's actual date
              date={new Date(event.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
              // Fixed: Using the root posterUrl from R2
              image={event.posterUrl || "https://placehold.co/600x400?text=No+Poster"}
              onBook={() => handleBook(event._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;