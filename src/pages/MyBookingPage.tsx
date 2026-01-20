import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import TicketCard from "../components/TicketCard";
import { generateQrCode } from "../utils/generateQrCode";

interface Booking {
  _id: string;
  eventName: string;
  sectionName: string;
  quantity: number;
  priceAtBooking: number;
  createdAt: string;
}

const MyBookingPage = () => {
  const [bookings, setBookings] = useState<(Booking & { qrCode?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/bookings/your-booking`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const enriched = await Promise.all(
          res.data.bookings.map(async (b: Booking) => ({
            ...b,
            qrCode: await generateQrCode(`${b._id}-${b.eventName}`),
          }))
        );

        setBookings(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center py-32 text-gray-500">Loading bookings...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-6">My Tickets</h1>

        <div
          className="
      h-[calc(100vh-220px)]
      overflow-y-auto
      pr-2
      space-y-4
      scrollbar-thin
      scrollbar-thumb-gray-300
    "
        >
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-20">
              No bookings yet 🎟️
            </p>
          ) : (
            bookings.map((b) => (
              <TicketCard
                key={b._id}
                eventName={b.eventName}
                sectionName={b.sectionName}
                quantity={b.quantity}
                totalPrice={b.priceAtBooking * b.quantity}
                createdAt={b.createdAt}
                qrCode={b.qrCode}
              />
            ))
          )}
        </div>
      </div>


      <Footer />
    </>
  );
};

export default MyBookingPage;
