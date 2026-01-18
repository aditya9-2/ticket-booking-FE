import { useNavigate } from "react-router-dom"
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    return (
        <div className="sticky top-0 z-50 bg-white/30">

            <div className="p-5 flex justify-between items-center">
                <div className=" font-bold text-2xl">
                    BOOKTHESHOW<span className="text-black">.</span>
                </div>

                <div className="px-6 py-3 rounded-full 
                        backdrop-blur-xl 
                        bg-white/30 
                        border border-white/30 
                        shadow-lg">
                    <ul className="flex items-center gap-6 font-medium">
                        <li className="hover:opacity-80 cursor-pointer">Events</li>
                        <li className="hover:opacity-80 cursor-pointer">About</li>
                        <li className="hover:opacity-80 cursor-pointer">Contact us</li>
                    </ul>
                </div>

                <div className="flex justify-center items-center gap-5">
                    {!token ? (
                        <>
                            <button
                                className="bg-black text-white px-4 py-2 rounded-full"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </button>
                            <button
                                className="border border-gray-300 px-4 py-2 rounded-full"
                                onClick={() => navigate("/signin")}
                            >
                                Sign in
                            </button>
                        </>
                    ) : (
                        <ProfileMenu />
                    )}
                </div>
            </div>

        </div>
    )
}

export default Navbar
