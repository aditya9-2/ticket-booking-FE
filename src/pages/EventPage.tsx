import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import MainEventSkeleton from "../components/skeletons/MainEventSkeleton";

interface Section {
  _id: string;
  name: string;
  price: number;
  remaining: number;
}

interface Event {
  _id: string;
  name: string;
  date: string;       // Actual Event Date
  posterUrl?: string; // Root level Poster
  createdAt: string;
  sections: Section[];
}

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const baseURL = import.meta.env.VITE_API_BASE_URL;

        // Use the specific get-event-by-id endpoint for better performance
        const res = await axios.get(`${baseURL}/event/${eventId}`);

        setEvent(res.data.event || null);
      } catch (err) {
        console.error("Failed to load event", err);
        toast.error("Event not found");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  const handleBooking = async () => {
    if (!event || !selectedSection) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Please login to book tickets");
        navigate("/signin");
        return;
      }

      // Check if event has already passed (safety check)
      if (new Date(event.date) < new Date()) {
        toast.error("Booking closed: This event has already happened.");
        return;
      }

      setBookingLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/bookings/create-booking`,
        {
          eventId: event._id,
          sectionId: selectedSection._id,
          quantity,
          idempotencyKey: crypto.randomUUID(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking successful!");

      // Update local state to reflect reduced capacity
      setEvent((prev) =>
        prev
          ? {
            ...prev,
            sections: prev.sections.map((s) =>
              s._id === selectedSection._id
                ? { ...s, remaining: s.remaining - quantity }
                : s
            ),
          }
          : prev
      );

      setSelectedSection(null);
      setQuantity(1);
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "Booking failed";
      toast.error(errMsg);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <MainEventSkeleton />
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 min-h-[50vh]">
          <h2 className="text-2xl font-bold">Event not found</h2>
          <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">Back to Home</button>
        </div>
        <Footer />
      </>
    );
  }

  const minPrice = Math.min(...event.sections.map((s) => s.price));
  const displayPrice = selectedSection ? selectedSection.price * quantity : minPrice;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl font-extrabold mb-4">{event.name}</h1>

          <div className="flex items-center gap-2 text-gray-600 mb-8 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(event.date).toLocaleString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </div>

          <h2 className="text-xl font-semibold mb-4">Select Category</h2>

          <div className="space-y-4">
            {event.sections.map((section) => {
              const isSelected = selectedSection?._id === section._id;
              const soldOut = section.remaining === 0;

              return (
                <div
                  key={section._id}
                  onClick={() => {
                    if (soldOut) return;
                    setSelectedSection(section);
                    setQuantity(1);
                  }}
                  className={`flex justify-between items-center border-2 rounded-2xl p-5 transition-all
                    ${soldOut
                      ? "opacity-50 cursor-not-allowed bg-gray-50"
                      : "cursor-pointer hover:border-black"
                    }
                    ${isSelected ? "border-black bg-gray-50 shadow-sm" : "border-gray-100"}
                  `}
                >
                  <div>
                    <p className="font-bold text-lg">{section.name}</p>
                    <p className={`text-sm ${section.remaining < 10 ? "text-red-500 font-medium" : "text-gray-500"}`}>
                      {soldOut ? "Sold out" : `${section.remaining} tickets left`}
                    </p>
                  </div>

                  <p className="font-black text-xl">₹{section.price}</p>
                </div>
              );
            })}
          </div>

          {/* QUANTITY PICKER */}
          {selectedSection && (
            <div className="mt-8 border-2 border-dashed border-gray-200 rounded-2xl p-6 space-y-4 bg-white">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Quantity</h3>
                <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold"
                  >-</button>
                  <span className="font-bold w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => Math.min(selectedSection.remaining, prev + 1))}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold"
                  >+</button>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic text-right">
                Max available: {selectedSection.remaining}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE (Poster & Checkout) */}
        <div className="flex flex-col items-center gap-8">
          {/* Fixed: Use root level posterUrl */}
          <img
            src={event.posterUrl || "https://placehold.co/600x800?text=Event+Poster"}
            alt={event.name}
            className="w-full max-w-sm rounded-4xl shadow-2xl border-8 border-white object-cover aspect-3/4"
          />

          <div className="w-full max-w-sm bg-black text-white rounded-4xl p-8 shadow-2xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">
                  {selectedSection ? "Total Payable" : "Starting Price"}
                </p>
                <p className="text-4xl font-black italic">₹{displayPrice.toLocaleString()}</p>
              </div>
              {selectedSection && <p className="text-xs text-gray-400 font-medium italic">Incl. all taxes</p>}
            </div>

            <button
              disabled={!selectedSection || bookingLoading}
              onClick={handleBooking}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95
                ${selectedSection
                  ? "bg-green-500 text-black hover:bg-green-400"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {bookingLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : "Secure My Spot"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventPage;