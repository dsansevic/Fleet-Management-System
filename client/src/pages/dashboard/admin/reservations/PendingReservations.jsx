import { useState, useEffect } from "react";
import { apiClient } from "@api/apiClient";
import { Link } from "react-router-dom";
import Loading from "@utils/Loading";
import EmptyStateMessage from "@components/ui/EmptyStateMessage";

const PendingReservations = () => {
    const [pendingReservations, setPendingReservations] = useState([]);
    const [reapprovalReservations, setReapprovalReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPendingReservations = async () => {
            try {
                const response = await apiClient.get("/reservation/pending");
                setPendingReservations(response.data.pending);
                setReapprovalReservations(response.data.pendingReapproval);
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
        return <Loading />;
    }

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Reservations waiting for your response</h2>
            <p className="text-sm text-gray-600 mb-4">
                Reservations will not appear here if they start in less than 60 minutes.
            </p>
            {error && (
                <p className="text-error bg-red-100 p-3 rounded-md text-sm mb-4">{error}</p>
            )}
            {pendingReservations.length === 0 && reapprovalReservations.length === 0 ? (
                <EmptyStateMessage
                    title="No reservations pending"
                    message="There are no reservations awaiting approval at the moment. Check back later."
                />
            ) : (
                <>
                {reapprovalReservations.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                            Reservations Awaiting Your Review
                        </h3>
                        <div className="bg-yellow-50 p-4 rounded border border-yellow-500 mb-4">
                            <p className="text-sm text-yellow-800">
                                <strong>Important:</strong> The following reservations have been modified by the user. These changes 
                                require your review and approval. If no action is taken before the reservation's start time, 
                                the original details will remain active. Please review the changes promptly to ensure all updates 
                                are accounted for.
                            </p>
                        </div>
                        <ul className="space-y-4">
                            {reapprovalReservations.map((reservation) => (
                                <li
                                    key={reservation._id}
                                    className="border border-yellow-500 p-4 rounded shadow-md flex justify-between items-center"
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
                                        to={`/dashboard-admin/review-reservation/${reservation._id}`}
                                        className="bg-brand-base text-white px-4 py-2 rounded inline-block text-center"
                                    >
                                        Review Changes
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {pendingReservations.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Pending Reservations</h3>
                        <ul className="space-y-4">
                            {pendingReservations.map((reservation) => (
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
                                        to={`/dashboard-admin/review-reservation/${reservation._id}`}
                                        className="bg-brand-base text-white px-4 py-2 rounded inline-block text-center"
                                    >
                                        Review
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}
             </>
            )}
        </div>
    );
};

export default PendingReservations;