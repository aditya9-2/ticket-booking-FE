import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-14">
            Admin Dashboard
          </h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            {/* Manage Events Card */}
            <button
              onClick={() => navigate("/admin/events")}
              className="w-80 h-56 rounded-3xl p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-left hover:-translate-y-1"
            >
              <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
              <p className="text-gray-500 text-base">
                View, update or delete events
              </p>
            </button>

            {/* View Bookings Card */}
            <button
              onClick={() => navigate("/admin/bookings")}
              className="w-80 h-56 rounded-3xl p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-left hover:-translate-y-1"
            >
              <h2 className="text-2xl font-semibold mb-4">View Bookings</h2>
              <p className="text-gray-500 text-base">
                All user bookings
              </p>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminHomePage;
