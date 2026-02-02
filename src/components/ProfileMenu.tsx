import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../types/decodeToken";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      isAdmin = decoded.roleId === 1;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="relative">
      <div
        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer font-bold"
        onClick={() => setOpen(!open)}
      >
        {isAdmin ? "A" : "U"}
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-100 rounded-xl overflow-hidden z-50">
          {isAdmin ? (
            <button
              className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-100 transition-colors flex items-center gap-2"
              onClick={() => {
                navigate('/admin');
                setOpen(false);
              }}
            >
              Admin
            </button>
          ) : (
            <button
              className="w-full text-left px-4 py-3 text-sm font-semibold text-black hover:bg-gray-100 transition-colors flex items-center gap-2"
              onClick={() => {
                navigate('/my-bookings');
                setOpen(false);
              }}
            >
              My bookings
            </button>
          )}

          <div className="border-t border-gray-100"></div>

          <button
            className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
