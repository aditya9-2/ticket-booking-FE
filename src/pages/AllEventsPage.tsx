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
    date: string;       
    posterUrl?: string;
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
            setEvents(res.data.events || []);
        } catch (err) {
            toast.error(`Failed to load events`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchEvents(); }, []);

    if (!loading && events.length === 0) {
        return (
            <>
                <Navbar /><p className="text-center py-20 text-gray-500">No upcoming events found</p><Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12 min-h-[60vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {loading ?
                        Array.from({ length: SKELETON_COUNT }).map((_, idx) => <EventCardSkeleton key={idx} />)
                        : events.map((event: Events) => (
                            <Card
                                key={event._id}
                                image={event.posterUrl || ""}
                                title={event.name}
                                // FIXED: using toLocaleString to show time correctly
                                date={new Date(event.date).toLocaleString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
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