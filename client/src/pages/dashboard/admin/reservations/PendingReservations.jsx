import { useState, useEffect } from "react";
import { apiClient } from "@api/apiClient";
import { Link } from "react-router-dom";

const PendingReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPendingReservations = async () => {
            try {
                const response = await apiClient.get("/reservation?status=pending");
                setReservations(response.data);
            } catch (err) {
                console.error("Failed to fetch reservations", err);
                setError("Failed to load pending reservations. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPendingReservations();
    }, []);

    if (loading) {
        return <div>Loading pending reservations...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (reservations.length === 0) {
        return <div>No pending reservations at the moment.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Reservations waiting for your response</h2>
            <ul className="space-y-4">
                {reservations.map((reservation) => (
                    <li
                        key={reservation._id}
                        className="border p-4 rounded shadow-md flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-medium">
                                Reservation ID: {reservation._id}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Purpose: {reservation.purpose}
                            </p>
                            <p className="text-sm text-gray-600">
                                Requested by: {reservation.user.firstName}, {reservation.user.email}
                            </p>
                        </div>
                        <Link
                            to = {`/dashboard-admin/review-reservation/${reservation._id}`}
                            className="bg-brand-base text-white px-4 py-2 rounded inline-block text-center"
                            >
                            Review
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingReservations;