import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="relative">
      <div
        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        U
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-xl overflow-hidden">
         
          <button
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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
