import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../animations/mainAnimationForLanding";
import { useNavigate } from "react-router-dom";

const SubLanding = () => {
    const navigate = useNavigate();

    return (


        <motion.div className="min-h-[calc(100vh-96px)]
                    flex flex-col justify-center
                    px-12 md:px-20"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >

            <motion.h1 className="font-extrabold tracking-tight leading-none text-center"
                variants={itemVariants}
            >
                <div className="text-2xl md:text-4xl lg:text-6xl">
                    EVENTS · TECHNOLOGY · CREATIVITY
                </div>
            </motion.h1>

            <motion.div className="flex justify-center items-center mt-5"
                variants={itemVariants}
            >

                <p className="p-12 w-6xl text-center text-xl">
                    from large-scale events to custom solutions adn world-class design {" "}
                    <span className="font-bold">BOOKTHESHOW</span>
                    {" "} deliverse end to end solutions that bring indeas to lifeand experiences to people
                </p>
            </motion.div>

            <motion.div className="flex justify-center items-center gap-6" variants={itemVariants}>
                <button className="p-6 border border-black rounded-xl hover:cursor-pointer transition-transform duration-200 ease-out
               hover:scale-105" onClick={() => navigate('/events')}>Explore The Events</button>
                <button className="p-6 bg-black text-white rounded-xl hover:cursor-pointer transition-transform duration-200 ease-out
               hover:scale-105" onClick={() => navigate('/about')}>Know more about us</button>
            </motion.div>
        </motion.div>

    )
}

export default SubLanding
