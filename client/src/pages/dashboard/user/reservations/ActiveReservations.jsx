import { useEffect, useState } from "react";
import { fetchActiveReservations } from "@api/reservations";
import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";
import { formatDate } from "@utils/formatDate";
import { getPreviewText } from "@utils/getPreviewText";

const ActiveReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(
        parseInt(sessionStorage.getItem("activeReservationsPage")) || 1
    );
    const reservationsPerPage = 6;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        const loadReservations = async () => {
            try {
                setLoading(true);
                const result = await fetchActiveReservations(currentPage, reservationsPerPage);
                setReservations(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadReservations();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        sessionStorage.setItem("activeReservationsPage", pageNumber);
    };

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Active Reservations</h2>
            <p className="text-gray-600 mb-4">
                Active reservations include upcoming bookings and those currently in progress. 
                You can check the details of each reservation and, if needed, change the end time or cancel them up to <strong>90 minutes</strong> before the start time.
            </p>
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-brand-dark rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : reservations.length === 0 ? (
                <p className="text-gray-600 text-center">No active reservations at the moment.</p>
            ) : (
                <>
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

                                    <h3 className="text-xl font-semibold text-gray-900 mt-2 break-words hyphens-auto">
                                        {res.purpose}
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                        {getPreviewText(res.additionalDetails) || "No additional details provided."}
                                    </p>

                                    <div className="text-sm text-gray-600">
                                        <p>📅 {formatDate(res.startTime)} – {formatDate(res.endTime)}</p>
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

                    <div className="flex justify-center space-x-2 mt-6">
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-brand-dark text-white' : 'bg-gray-300 text-gray-700'}`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ActiveReservations;