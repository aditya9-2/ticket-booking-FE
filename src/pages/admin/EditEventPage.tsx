import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
/**
 * TODO
 * i need to add date, location for this i need to change the API
 * upload section wil come from storage blob which needs to be created
 * need to add section specific edits for that maybe i need to change the schema
 * need a back button too
 */

const EditEventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [poster, setPoster] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/event/${eventId}`)
      .then(res => setEvent(res.data.event))
      .catch(() => toast.error("Failed to load event"));
  }, [eventId]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/update-event/${eventId}`,
        event,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Event updated successfully");
    } catch {
      toast.error("Failed to update event");
    }
  };

  if (!event) return null;

  return (
    <div className="max-w-xl mx-auto px-6 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Edit Event
      </h1>

      {/* Event Details Card */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm mb-8 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">
          Event Details
        </h2>

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Event Name"
          value={event.name || ""}
          onChange={e => setEvent({ ...event, name: e.target.value })}
        />

{/*         
        <input
          type="date"
          className="w-full border rounded-xl px-4 py-3"
          value={event.date?.slice(0, 10) || ""}
          onChange={e =>
            setEvent({ ...event, date: e.target.value })
          }
        /> */}

        {/* <input
          type="number"
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Price"
          value={event.price || ""}
          onChange={e =>
            setEvent({ ...event, price: e.target.value })
          }
        /> */}
        {/*  */}
      </div>

      {/* Poster Upload Card */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm mb-10">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Event Poster - PNG FILE ONLY
        </h2>

        <div className="border-2 border-dashed rounded-xl p-6 text-center">
          <input
            type="file"
            accept="image/.png"
            className="w-full"
            onChange={e =>
              setPoster(e.target.files?.[0] || null)
            }
          />

          {poster && (
            <p className="mt-3 text-sm text-gray-600">
              Selected file: <span className="font-medium">{poster.name}</span>
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition"
      >
        Update Event
      </button>
    </div>
  );
};

export default EditEventPage;
