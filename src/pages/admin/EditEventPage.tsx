import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface Section {
  _id?: string;
  name: string;
  price: number;
  capacity: number;
}

interface EventData {
  name: string;
  date: string;
  posterUrl?: string;
  sections: Section[];
}

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventData | null>(null);
  const [newPoster, setNewPoster] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/event/${eventId}`);
        const data = res.data.event;

        if (data.date) {
          const d = new Date(data.date);
          // Build local string: YYYY-MM-DDTHH:mm
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const hours = String(d.getHours()).padStart(2, '0');
          const minutes = String(d.getMinutes()).padStart(2, '0');
          data.date = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
        setEvent(data);
      } catch (err) {
        toast.error("Failed to load event data");
        navigate("/admin/events");
      }
    };
    fetchEvent();
  }, [eventId, navigate]);

  const updateSection = (index: number, key: keyof Section, value: string | number) => {
    if (!event) return;
    const updatedSections = [...event.sections];
    updatedSections[index] = { ...updatedSections[index], [key]: value };
    setEvent({ ...event, sections: updatedSections });
  };

  const handleUpdate = async () => {
    if (!event) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("date", event.date);
    // Send as stringified JSON
    formData.append("sections", JSON.stringify(event.sections));

    if (newPoster) {
      formData.append("posters", newPoster);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/update-event/${eventId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Event updated successfully");
      navigate("/admin/events");
    } catch (err) {
      toast.error("Update failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="text-sm mb-6 text-gray-400 hover:text-black transition-colors">
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-8">Edit Event</h1>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-sm space-y-6 mb-8">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">Event Title</label>
          <input className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black outline-none" value={event.name} onChange={e => setEvent({ ...event, name: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">Date & Time</label>
          <input type="datetime-local" className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black outline-none" value={event.date} onChange={e => setEvent({ ...event, date: e.target.value })} />
        </div>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-sm mb-8">
        <h3 className="font-bold mb-4">Poster</h3>
        <div className="flex items-center gap-6">
          <img src={event.posterUrl} className="w-24 h-32 object-cover rounded-xl border" alt="current" />
          <input type="file" accept="image/*" onChange={(e) => e.target.files && setNewPoster(e.target.files[0])} />
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <h3 className="font-bold">Ticket Sections</h3>
        {event.sections.map((section, idx) => (
          <div key={idx} className="bg-white border-2 border-gray-100 rounded-2xl p-6 grid grid-cols-3 gap-4">
            <input className="border rounded-lg p-2" value={section.name} onChange={e => updateSection(idx, "name", e.target.value)} />
            <input type="number" className="border rounded-lg p-2" value={section.price} onChange={e => updateSection(idx, "price", Number(e.target.value))} />
            <input type="number" className="border rounded-lg p-2" value={section.capacity} onChange={e => updateSection(idx, "capacity", Number(e.target.value))} />
          </div>
        ))}
      </div>

      <button onClick={handleUpdate} disabled={loading} className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-xl hover:opacity-90">
        {loading ? "Saving..." : "Update Event"}
      </button>
    </div>
  );
};

export default EditEventPage;