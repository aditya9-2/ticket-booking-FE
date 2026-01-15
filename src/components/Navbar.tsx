const Navbar = () => {
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
                    <button className="bg-black text-white p-2 hover:cursor-pointer rounded-full">sign up</button>
                    <button className="border border-gray-300 text-black p-2 hover:cursor-pointer rounded-full">sign in</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar
