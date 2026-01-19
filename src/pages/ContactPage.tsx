import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold mb-6">
          Contact Us
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mb-12">
          Have a question, feedback, or need support? We’re here to help.
          Reach out and we’ll get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* LEFT INFO */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">support@booktheshow.com</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">+91 00000 00000</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Office</p>
              <p className="font-semibold">
                Kolkata, West Bengal, India
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form className="border rounded-2xl p-8 space-y-6 shadow-sm">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-black text-white font-semibold"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
