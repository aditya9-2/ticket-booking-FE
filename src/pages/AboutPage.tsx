import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold mb-6">
          About BookTheShow
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-10">
          BookTheShow is a simple and reliable event booking platform designed
          to make discovering and booking events effortless. From concerts and
          shows to exclusive experiences, our goal is to connect people with
          events they love — without unnecessary friction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">🎟 Easy Booking</h3>
            <p className="text-gray-600">
              Book tickets in just a few clicks with transparent pricing and
              real-time availability.
            </p>
          </div>

          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">🔒 Secure Platform</h3>
            <p className="text-gray-600">
              Your data and payments are protected with industry-standard
              security practices.
            </p>
          </div>

          <div className="border rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">🚀 Built for Scale</h3>
            <p className="text-gray-600">
              Designed with modern tech to support growing events and audiences
              seamlessly.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
