const Landing = () => {
    return (

        <div className="min-h-[calc(100vh-96px)]
                    flex flex-col justify-center
                    px-12 md:px-20">

            {/* Heading */}
            <h1 className="font-extrabold tracking-tight leading-none text-center">
                <div className="text-4xl md:text-6xl lg:text-8xl">
                    WE BUILD
                </div>

                <div className="text-center text-[7rem] sm:text-[9.5rem] md:text-[11rem] lg:text-[13rem]">
                    EXPERIENCES
                </div>
            </h1>

            {/* Subheading */}
            <div className="mt-10 flex justify-center items-center gap-6 
                text-lg md:text-4xl font-semibold text-gray-700">
                <span>DIGITAL, LIVE &</span>

                <span className="w-40 h-[1.5px] bg-gray-400"></span>

                <span>EVERYTHING IN BETWEEN</span>
            </div>
        </div>

    )
}

export default Landing
