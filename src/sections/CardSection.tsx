import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const CardSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEventData = async () => {
    try {
      // Use the environment variable
      const baseURL = import.meta.env.VITE_API_BASE_URL; 
      const res = await axios.get(`${baseURL}/event/all`);
      
      // CRITICAL: Based on your JSON, data is in res.data.events
      setEvents(res.data.events || []);
    } catch (err) {
      console.error(`Failed to fetch events`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <div className="w-full bg-gray-100 py-10 overflow-hidden">
      {loading ? (
        <p className="text-center">Loading Events...</p>
      ) : (
        /* The Moving Container */
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {/* We double the array to create a seamless loop */}
          {[...events, ...events].map((event, index) => (
            <div key={`${event._id}-${index}`} className="mx-4">
              <Card
                title={event.name}
                date={new Date(event.createdAt).toLocaleDateString()}
                image="https://via.placeholder.com/320x180" // Replace with real image key if available
                onBook={() => console.log("Booking:", event._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSection;