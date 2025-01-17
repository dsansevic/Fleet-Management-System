import { useEffect, useState } from "react";
import { fetchActiveReservations } from "@api/reservations";
import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";
import { formatDate } from "@utils/formatDate"
import { getPreviewText } from "@utils/getPreviewText";

const ActiveReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadReservations = async () => {
            try {
                const activeReservations = await fetchActiveReservations();
                setReservations(activeReservations);
            } catch (error) {
                setError(error.message);
            }
        };

        loadReservations();
    }, []);

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
                Active Reservations
            </h2>
            <p className="text-gray-600 mb-4">
            Active reservations include upcoming bookings and those currently in progress. 
            You can check the details of each reservation and, if needed, change the end time or cancel them up to <strong>90 minutes </strong> before the start time. 
            </p>
            {error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : reservations.length === 0 ? (
                <p className="text-gray-600 text-center">No active reservations at the moment.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reservations.map((res) => {
                        const status = GetReservationStatus(res.status);
                        return (
                            <li
                                key={res._id}
                                className="relative bg-white backdrop-blur-xl shadow-lg rounded-2xl p-5 flex flex-col space-y-4 hover:shadow-xl shadow-gray-300 transition-all duration-300 hover:bg-gray-50"
                            >       
                               <div className="absolute top-3 right-3 flex items-center">
                                    <span className="w-4 h-4 flex items-center justify-center text-sm">
                                        {status.icon}
                                    </span>
                                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${status.color} bg-opacity-20 flex items-center`}>
                                        {status.label}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mt-2 break-words hyphens-auto ;">
                                    {res.purpose}
                                </h3>
                                <p className="text-sm text-gray-700">
                                    {getPreviewText(res.additionalDetails) || "No additional details provided."}
                                </p>

                                <div className="text-sm text-gray-600">
                                    <p>📅{formatDate(res.startTime)} – {formatDate(res.endTime)}  </p>
                                </div>

                                <div className="mt-3 flex justify-end items-center">
                                    <Link
                                        to={`/dashboard-user/reservation/${res._id}`}
                                        className="text-brand-darker hover:text-brand-dark text-sm font-medium"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ActiveReservations;