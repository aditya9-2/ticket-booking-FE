import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/all-bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setBookings(res.data.allBookings || []))
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  // Correct Calculation: Sum of (Price * Quantity) for all bookings
  const totalEarnings = bookings.reduce(
    (sum, b) => sum + (b.priceAtBooking * b.quantity || 0), 
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="group flex items-center gap-2 text-gray-500 hover:text-black transition-all font-medium mb-8"
        >
          <svg 
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Bookings</h1>
            <p className="text-gray-500 mt-1">Total {bookings.length} successful transactions</p>
          </div>
          
          {/* Earnings Card */}
          <div className="bg-black text-white px-8 py-5 rounded-4xl shadow-2xl flex flex-col min-w-50 border-b-4 border-green-500">
            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Total Revenue</span>
            <span className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</span>
          </div>
        </div>

        {/* Bookings List */}
        <div className="grid grid-cols-1 gap-4">
          {bookings.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
              <p className="text-gray-500 font-medium">No bookings found yet.</p>
            </div>
          ) : (
            bookings.map(b => (
              <div key={b._id} className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                    {b.userId.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-lg text-gray-800">{b.userId.name}</p>
                      <span className="text-[10px] bg-green-100 px-2 py-0.5 rounded-full text-green-700 uppercase font-extrabold">Paid</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">{b.userId.email}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end w-full md:w-auto">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400 font-medium">Event:</span>
                    <p className="text-sm font-bold text-gray-700">{b.eventId.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 px-2 py-1 bg-gray-50 rounded-lg">
                      {b.quantity} {b.quantity > 1 ? 'Tickets' : 'Ticket'}
                    </span>
                    <p className="text-xl font-black text-black">
                      ₹{(b.priceAtBooking * b.quantity).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsPage;