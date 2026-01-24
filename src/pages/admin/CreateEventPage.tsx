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
  const [sections, setSections] = useState<Section[]>([
    { name: "", price: 0, capacity: 1 }
  ]);

  // Poster (dummy for now)
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

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
    setSections([...sections, { name: "", price: 0, capacity: 1 }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handlePosterSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file));
  };

  /**
   * TODO (future):
   * Upload poster to storage (S3 / GCS / Firebase / Azure Blob)
   * Return public image URL and store in DB
   */
  const uploadEventPoster = async (eventId: string, file: File) => {
    // intentionally left blank
  };

  const handleCreate = async () => {
    if (!name.trim()) return toast.error("Event name is required");

    const payload = {
      name,
      sections: sections.map(s => ({
        ...s,
        remaining: s.capacity
      }))
    };

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/create-event`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      /**
       * TODO:
       * if (posterFile) {
       *   await uploadEventPoster(res.data.eventId, posterFile);
       * }
       */

      toast.success("Event created successfully");
      navigate("/admin/events");
    } catch {
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm mb-6 text-gray-600 hover:text-black hover:cursor-pointer"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-8">Create Event</h1>

      {/* Event Name */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Event name
        </label>
        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="e.g. Coldplay Live Concert"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      {/* Event Poster */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-2">
          Event poster (PNG / JPG)
        </label>

        <div className="flex items-start gap-6">
          <label className="border border-dashed rounded-xl px-6 py-8 cursor-pointer hover:bg-gray-50 transition">
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) {
                  handlePosterSelect(e.target.files[0]);
                }
              }}
            />
            <p className="text-sm text-gray-600">
              Click to upload poster
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Recommended: PNG, 3:4 ratio
            </p>
          </label>

          {posterPreview && (
            <div className="w-32 h-44 rounded-xl overflow-hidden border">
              <img
                src={posterPreview}
                alt="Poster preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Poster upload is temporary. Storage integration will be added later.
        </p>
      </div>

      {/* Ticket Sections */}
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="border rounded-2xl p-6 bg-gray-50 space-y-5"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                Ticket Section {idx + 1}
              </h3>
              {sections.length > 1 && (
                <button
                  onClick={() => removeSection(idx)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Section Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Section name
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Gold / Platinum / Balcony"
                value={section.name}
                onChange={e =>
                  updateSection(idx, "name", e.target.value)
                }
              />
            </div>

            {/* Price & Capacity */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (₹ per seat)
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g. 1500"
                  value={section.price}
                  onChange={e =>
                    updateSection(idx, "price", Number(e.target.value))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Total seats (capacity)
                </label>
                <input
                  type="number"
                  min={1}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g. 100"
                  value={section.capacity}
                  onChange={e =>
                    updateSection(idx, "capacity", Number(e.target.value))
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Remaining seats will be set equal to capacity
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addSection}
        className="mt-6 text-sm font-medium underline"
      >
        + Add another ticket section
      </button>

      <button
        onClick={handleCreate}
        className="w-full mt-10 bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
      >
        Create Event
      </button>
    </div>
  );
};

export default CreateEventPage;
