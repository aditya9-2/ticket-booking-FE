const Footer = () => {
  return (
    <footer className="w-full border-t border-b border-black/20 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between gap-16">

          {/* Brand */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              BOOKTHESHOW<span className="text-black">.</span>
            </h1>
          </div>

          {/* Links */}
          <div className="flex gap-24">
            {/* Explore */}
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-black cursor-pointer">Events</li>
                <li className="hover:text-black cursor-pointer">About</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-black cursor-pointer">Contact Us</li>
                <li className="hover:text-black cursor-pointer">Refunds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">

          <p>© 2026 BookTheShow Private Limited</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-black cursor-pointer">Privacy Policy</span>
            <span className="hover:text-black cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-black cursor-pointer">Cookie Settings</span>

            {/* Social icons */}
            <div className="flex gap-4 ml-4">
              <span className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-black hover:text-white cursor-pointer">
                f
              </span>
              <span className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-black hover:text-white cursor-pointer">
                in
              </span>
              <span className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-black hover:text-white cursor-pointer">
                ig
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
