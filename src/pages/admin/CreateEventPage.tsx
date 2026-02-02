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
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    { name: "", price: 0, capacity: 1 }
  ]);

  // Poster files per section
  const [sectionPosters, setSectionPosters] = useState<(File | null)[]>(
    [null]
  );

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
    setSectionPosters(prev => [...prev, null]);
  };

  const removeSection = (index: number) => {
    setSections(prev => prev.filter((_, i) => i !== index));
    setSectionPosters(prev => prev.filter((_, i) => i !== index));
  };

  const handlePosterSelect = (file: File, index: number) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    // 4MB limit check
    if (file.size > 4 * 1024 * 1024) {
      toast.error("File size must be less than 4MB");
      return;
    }

    setSectionPosters(prev => {
      const copy = [...prev];
      copy[index] = file;
      return copy;
    });
  };

  const handleCreate = async () => {
    if (!name.trim()) return toast.error("Event name is required");
    if (sections.some(s => !s.name.trim())) return toast.error("All section names are required");

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append(
      "sections",
      JSON.stringify(sections.map(s => ({ ...s, remaining: s.capacity })))
    );

    const indexWithPoster = sectionPosters.findIndex(f => f !== null);
    if (indexWithPoster !== -1 && sectionPosters[indexWithPoster]) {
      formData.append("posters", sectionPosters[indexWithPoster]!);
      formData.append("posterSectionIndex", indexWithPoster.toString());
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

      {/* Event Name */}
      <div className="mb-10">
        <label className="block text-sm font-semibold mb-2 text-gray-700">Event Title</label>
        <input
          className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black focus:outline-none transition-all text-lg shadow-sm"
          placeholder="e.g. Arijit Singh - One Night Only"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      {/* Ticket Sections */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Pricing & Inventory</h2>
        </div>

        {sections.map((section, idx) => (
          <div
            key={idx}
            className="border-2 border-gray-100 rounded-3xl p-8 bg-white shadow-sm space-y-6 relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="bg-black text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold">
                    {idx + 1}
                </span>
                <h3 className="font-bold text-gray-800 text-lg">Section Details</h3>
              </div>
              {sections.length > 1 && (
                <button
                  onClick={() => removeSection(idx)}
                  className="text-sm text-red-500 font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                >
                  Remove Section
                </button>
              )}
            </div>

            {/* Section Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-600">
                Section Category
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                placeholder="e.g. VIP Front Row / General Admission"
                value={section.name}
                onChange={e => updateSection(idx, "name", e.target.value)}
              />
            </div>

            {/* Price & Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-600">
                  Price (₹)
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                        type="number"
                        min={0}
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:border-black outline-none transition-all"
                        placeholder="0"
                        value={section.price}
                        onChange={e => updateSection(idx, "price", Number(e.target.value))}
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-600">
                  Total Capacity
                </label>
                <input
                    type="number"
                    min={1}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-black outline-none transition-all"
                    placeholder="e.g. 500"
                    value={section.capacity}
                    onChange={e => updateSection(idx, "capacity", Number(e.target.value))}
                />
              </div>
            </div>

            {/* Section Poster Dropzone */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-600">Poster Image</label>
              
              {!sectionPosters[idx] ? (
                <div 
                  onClick={() => document.getElementById(`file-upload-${idx}`)?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:border-black hover:bg-gray-100 transition-all cursor-pointer group"
                >
                  <input
                    id={`file-upload-${idx}`}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files?.[0]) handlePosterSelect(e.target.files[0], idx);
                    }}
                  />
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Upload Section Poster</p>
                  <p className="text-xs text-gray-400 mt-1">PNG or JPG up to 4MB</p>
                </div>
              ) : (
                <div className="relative inline-block group">
                  <img
                    src={URL.createObjectURL(sectionPosters[idx]!)}
                    className="w-40 h-56 object-cover rounded-2xl shadow-lg border-4 border-white"
                    alt="Preview"
                  />
                  <button
                    onClick={() => setSectionPosters(prev => {
                      const copy = [...prev];
                      copy[idx] = null;
                      return copy;
                    })}
                    className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1.5 shadow-xl hover:bg-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <p className="text-[10px] text-gray-400 mt-2 text-center uppercase tracking-widest font-bold">Change Image</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addSection}
        className="mt-8 flex items-center gap-2 text-sm font-bold bg-gray-100 px-6 py-3 rounded-xl hover:bg-black hover:text-white transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Another Section
      </button>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <button
            disabled={loading}
            onClick={handleCreate}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:scale-[1.01] active:scale-[0.99]'
            }`}
        >
            {loading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Uploading to R2...
                </>
            ) : "Publish Event"}
        </button>
      </div>
    </div>
  );
};

export default CreateEventPage;