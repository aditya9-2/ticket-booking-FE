import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

interface Section {
  _id: string;
  name: string;
  price: number;
  remaining: number;
}

interface Event {
  _id: string;
  name: string;
  createdAt: string;
  sections: Section[];
}

const EventPage = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.get(`${baseURL}/event/all`);

        const foundEvent = res.data.events.find(
          (e: Event) => e._id === eventId
        );

        setEvent(foundEvent || null);
      } catch (err) {
        console.error("Failed to load event", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleBooking = async () => {
    if (!event || !selectedSection) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to book tickets", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          progress: undefined,
          theme: 'light'
        });
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

      toast.success("Booking successful", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light'
      });

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
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20">Loading event...</p>;
  }

  if (!event) {
    return <p className="text-center py-20">Event not found</p>;
  }

  const minPrice = Math.min(...event.sections.map((s) => s.price));

  const displayPrice = selectedSection
    ? selectedSection.price * quantity
    : minPrice;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl font-extrabold mb-4">{event.name}</h1>

          <p className="text-gray-500 mb-8">
            {new Date(event.createdAt).toDateString()}
          </p>

          <h2 className="text-xl font-semibold mb-4">Available Tickets</h2>

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
                  className={`flex justify-between items-center border rounded-xl p-4 transition
                    ${soldOut
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:shadow-md"
                    }
                    ${isSelected ? "border-black shadow-md" : ""}
                  `}
                >
                  <div>
                    <p className="font-semibold">{section.name}</p>
                    <p className="text-sm text-gray-500">
                      {soldOut
                        ? "Sold out"
                        : `${section.remaining} seats left`}
                    </p>
                  </div>

                  <p className="font-bold">₹{section.price}</p>
                </div>
              );
            })}
          </div>

          {/* QUANTITY */}
          {selectedSection && (
            <div className="mt-8 border rounded-xl p-4 space-y-4">
              <h3 className="font-semibold text-lg">
                Selected: {selectedSection.name}
              </h3>

              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity</span>
                <input
                  type="number"
                  min={1}
                  max={selectedSection.remaining}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(
                        selectedSection.remaining,
                        Math.max(1, Number(e.target.value))
                      )
                    )
                  }
                  className="w-20 border rounded-lg px-2 py-1"
                />
              </div>

              <p className="text-gray-600">
                ₹{selectedSection.price} × {quantity}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center gap-6">
          <img
            src={`/events/${event._id}.png`}
            alt={event.name}
            className="w-full max-w-md rounded-2xl shadow-xl"
            onError={(e) => {
              e.currentTarget.src = "/events/default.png";
            }}
          />

          <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 shadow">
            <p className="text-sm text-gray-500 mb-1">
              {selectedSection ? "Total price" : "Starting from"}
            </p>

            <p className="text-3xl font-bold mb-4">₹{displayPrice}</p>

            <button
              disabled={!selectedSection || bookingLoading}
              onClick={handleBooking}
              className={`w-full py-3 rounded-full font-semibold
                ${selectedSection
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventPage;
