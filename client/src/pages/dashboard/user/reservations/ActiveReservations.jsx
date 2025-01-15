import { useEffect, useState } from "react";
import { fetchActiveReservations } from "@api/reservations";
import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";

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
            {error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : reservations.length === 0 ? (
                <p className="text-gray-600 text-center">No active reservations at the moment.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {reservations.map((res) => {
                        const status = GetReservationStatus(res.status);
                        return (
                            <li
                                key={res._id}
                                className="bg-white border border-gray-200 shadow-md rounded-lg p-4 sm:p-6 flex flex-col space-y-3 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center space-x-2">
                                    {status.icon}
                                    <span
                                        className={`text-sm font-medium ${status.color} capitalize`}
                                    >
                                        {status.label}
                                    </span>
                                </div>

                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                                    {res.purpose}
                                </h3>

                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>{res.additionalDetails}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(res.startTime).toLocaleString()} —{" "}
                                        {new Date(res.endTime).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <Link
                                        to={`/dashboard-user/reservation/${res._id}`}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        View Details
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