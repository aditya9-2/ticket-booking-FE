import { useState, type ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Section {
  name: string;
  price: number;
  capacity: number;
}

const CreateEventPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState(""); // New Date State
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    { name: "", price: 0, capacity: 1 }
  ]);

  // Changed to a single File state instead of an array
  const [poster, setPoster] = useState<File | null>(null);

  const updateSection = <K extends keyof Section>(
    index: number,
    key: K,
    value: Section[K]
  ) => {
    setSections(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const addSection = () => {
    setSections(prev => [...prev, { name: "", price: 0, capacity: 1 }]);
  };

  const removeSection = (index: number) => {
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  const handlePosterSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("File size must be less than 4MB");
      return;
    }
    setPoster(file);
  };

  const handleCreate = async () => {
    if (!name.trim()) return toast.error("Event name is required");
    if (!date) return toast.error("Event date and time are required");
    if (sections.some(s => !s.name.trim())) return toast.error("All section names are required");

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date); // Appending the date
    formData.append(
      "sections",
      JSON.stringify(sections.map(s => ({ ...s, remaining: s.capacity })))
    );

    // Appending single poster at root
    if (poster) {
      formData.append("posters", poster);
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/create-event`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Event created successfully");
      navigate("/admin/events");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-sm mb-6 text-gray-600 hover:text-black flex items-center gap-2 transition-colors"
      >
        <span>←</span> Back
      </button>

      <h1 className="text-3xl font-bold mb-8 tracking-tight">Create New Event</h1>

      {/* Main Event Details Card */}
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-sm space-y-8 mb-10">
        <h2 className="text-xl font-bold flex items-center gap-2">
           <span className="w-2 h-6 bg-black rounded-full"></span>
           General Information
        </h2>

        {/* Event Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Event Title</label>
          <input
            className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black focus:outline-none transition-all text-lg"
            placeholder="e.g. Arijit Singh - One Night Only"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Event Date & Time */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Event Date & Time</label>
          <input
            type="datetime-local"
            className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black focus:outline-none transition-all text-lg"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <p className="text-[11px] text-gray-400 mt-2 font-medium">Note: User booking will be disabled once this time passes.</p>
        </div>

        {/* Global Event Poster */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">Main Event Poster</label>
          {!poster ? (
            <div 
              onClick={() => document.getElementById('main-poster')?.click()}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:border-black hover:bg-gray-100 transition-all cursor-pointer group"
            >
              <input
                id="main-poster"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) handlePosterSelect(e.target.files[0]);
                }}
              />
              <p className="text-sm font-medium text-gray-700">Click to upload poster</p>
              <p className="text-xs text-gray-400 mt-1">Single image used for all sections (max 4MB)</p>
            </div>
          ) : (
            <div className="relative inline-block group">
              <img
                src={URL.createObjectURL(poster)}
                className="w-48 h-64 object-cover rounded-2xl shadow-lg border-4 border-white"
                alt="Preview"
              />
              <button
                onClick={() => setPoster(null)}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1.5 shadow-xl hover:bg-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Sections */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2">
           <span className="w-2 h-6 bg-black rounded-full"></span>
           Pricing & Sections
        </h2>

        {sections.map((section, idx) => (
          <div
            key={idx}
            className="border-2 border-gray-100 rounded-3xl p-8 bg-white shadow-sm space-y-6 relative"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="bg-gray-100 text-black w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold">
                    {idx + 1}
                </span>
                <h3 className="font-bold text-gray-800">Section Details</h3>
              </div>
              {sections.length > 1 && (
                <button
                  onClick={() => removeSection(idx)}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  REMOVE
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Category Name</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-black outline-none transition-all"
                  placeholder="VIP / General Admission"
                  value={section.name}
                  onChange={e => updateSection(idx, "name", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Price (₹)</label>
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-black outline-none transition-all"
                  value={section.price}
                  onChange={e => updateSection(idx, "price", Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Total Capacity</label>
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-black outline-none transition-all"
                  value={section.capacity}
                  onChange={e => updateSection(idx, "capacity", Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addSection}
        className="mt-8 flex items-center gap-2 text-sm font-bold bg-gray-100 px-6 py-3 rounded-xl hover:bg-black hover:text-white transition-all w-full justify-center border-2 border-dashed border-gray-300"
      >
        + Add Another Ticket Tier
      </button>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <button
            disabled={loading}
            onClick={handleCreate}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:opacity-90 active:scale-95'
            }`}
        >
            {loading ? "Publishing..." : "Launch Event"}
        </button>
      </div>
    </div>
  );
};

export default CreateEventPage;