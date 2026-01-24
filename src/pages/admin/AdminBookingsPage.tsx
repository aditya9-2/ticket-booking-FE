import { useEffect, useState } from "react";
import axios from "axios";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/all-bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setBookings(res.data.allBookings));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <div className="space-y-4">
        {bookings.map(b => (
          <div key={b._id} className="bg-white shadow rounded-xl p-4">
            <p className="font-semibold">{b.userId.name}</p>
            <p className="text-gray-600 text-sm">{b.userId.email}</p>
            <p className="mt-1 text-sm">Event: {b.eventId.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookingsPage;
