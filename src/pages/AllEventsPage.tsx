import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import EventCardSkeleton from "../components/skeletons/EventCardSkeleton";
import { toast } from "react-toastify";

interface Section {
    _id: string;
    name: string;
    price: number;
    remaining: number;
}

interface Events {
    _id: string;
    name: string;
    createdAt: string;
    sections: Section[];
}
const SKELETON_COUNT = 6;

const AllEventsPage = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState<Events[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const baseURL = import.meta.env.VITE_API_BASE_URL;
            const res = await axios.get(`${baseURL}/event/all`);
            const data = res.data;


            setEvents(data.events || null);
        } catch (err) {
            setLoading(false);
            toast.error(`failed to load events`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                pauseOnHover: true,
                progress: undefined,
                theme: 'light'
            })
            console.error("Failed to load event", err);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchEvents();
    }, []);

    if (!events) {

        return <p className="text-center py-20">Event not found</p>;
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {loading ?
                        Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
                            <EventCardSkeleton key={idx} />
                        ))
                        : events.map((event: Events) => (
                            <Card
                                key={event._id}
                                image={`/events/${event._id}.png`}
                                title={event.name}
                                date={new Date(event.createdAt).toDateString()}
                                onBook={() => navigate(`/event/${event._id}`)}
                            />
                        ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AllEventsPage