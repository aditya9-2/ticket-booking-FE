import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Changed to flex-col and removed justify-center from the outer container 
          to ensure the top button is always visible */}
      <div className="min-h-screen flex flex-col bg-gray-50">
        
        {/* Navigation Bar / Back Button Container */}
        <div className="w-full max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-gray-500 hover:text-black transition-all font-medium bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 w-fit"
          >
            <svg 
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Content Area - centered vertically in remaining space */}
        <div className="grow flex items-center justify-center px-6 pb-20">
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
      </div>
      <Footer />
    </>
  );
};

export default AdminHomePage;