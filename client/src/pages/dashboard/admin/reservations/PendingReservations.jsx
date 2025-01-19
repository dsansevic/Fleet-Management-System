import { useState, useEffect } from "react";
import { fetchPendingReservations } from "@api/reservations";
import { Link } from "react-router-dom";
import Loading from "@utils/Loading";
import Pagination from "@utils/Pagination";
import Title from "@components/ui/Title";
import EmptyStateMessage from "@components/ui/EmptyStateMessage";
import { formatDate } from "@utils/formatDate";
import GetReservationStatus from "@utils/GetReservationStatus";
import { getPreviewText } from "@utils/getPreviewText"

const PendingReservations = () => {
    const [pendingReservations, setPendingReservations] = useState([]);
    const [reapprovalReservations, setReapprovalReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const loadReservations = async () => {
            setLoading(true);
            try {
                const data = await fetchPendingReservations(currentPage, itemsPerPage);
                setPendingReservations(data.pending);
                setTotalPages(data.pendingTotalPages);
                setReapprovalReservations(data.reapproval);
            } catch (err) {
                console.error("Failed to fetch reservations", err);
                setError("Failed to load reservations. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        loadReservations();
    }, [currentPage]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Title>Reservations Awaiting Your Review</Title>
            <p className="text-gray-600 mb-4">
                Review pending reservations and approve or decline them before they start.
            </p>

            {error && <p className="text-error bg-red-100 p-4 rounded-md">{error}</p>}

            {pendingReservations.length === 0 && reapprovalReservations.length === 0 ? (
                <EmptyStateMessage
                    icon="📋"
                    title="No reservations pending"
                    message="There are no reservations awaiting approval at the moment. Check back later."
                />
            ) : (
                <>
                    {reapprovalReservations.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-yellow-700 mb-3">
                                Reservations Requiring Your Review
                            </h3>
                            <div className="bg-yellow-50 p-4 rounded border border-yellow-500 mb-4">
                                <p className="text-sm text-yellow-800">
                                    <strong>Important:</strong> Some reservations have been modified by users. These changes
                                    require your review before confirmation. If no action is taken, the original details
                                    will remain active.
                                </p>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {reapprovalReservations.map((res) => (
                                    <li
                                        key={res._id}
                                        className="relative bg-white shadow-lg rounded-2xl p-5 flex flex-col space-y-4 hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                                    >
                                        <div className="absolute top-3 right-3 flex items-center">
                                            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                                                Reapproval Required
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 break-words">
                                            {getPreviewText(res.purpose)}
                                        </h3>
                                        <p className="text-sm text-gray-700">
                                            {res.user.firstName}{" "} {res.user.lastName} ({res.user.email})
                                        </p>

                                        <div className="text-sm text-gray-600">
                                            <p>📅 {formatDate(res.startTime)} – {formatDate(res.endTime)}</p>
                                        </div>

                                        <div className="mt-3 flex justify-end items-center">
                                            <Link
                                                to={`/dashboard-admin/review-reservation/${res._id}`}
                                                className="text-brand-darker hover:text-brand-dark text-sm font-medium"
                                            >
                                                Review Changes →
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {pendingReservations.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Pending Reservations</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pendingReservations.map((res) => {
                                    const status = GetReservationStatus(res.status);
                                    return (
                                        <li
                                            key={res._id}
                                            className="relative bg-white shadow-lg rounded-2xl p-5 flex flex-col space-y-4 hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                                        >
                                            <div className="absolute top-3 right-3 flex items-center">
                                                <span className="w-4 h-4 flex items-center justify-center text-sm">
                                                    {status.icon}
                                                </span>
                                                <span
                                                    className={`text-sm font-medium px-2 py-0.5 rounded-full ${status.color} bg-opacity-20 flex items-center`}
                                                >
                                                    {status.label}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-semibold text-gray-900 break-words">
                                                {getPreviewText(res.purpose)}
                                            </h3>
                                            <p className="text-sm text-gray-700">
                                                {res.user.firstName}{" "}{res.user.lastName} ({res.user.email})
                                            </p>

                                            <div className="text-sm text-gray-600">
                                                <p>📅 {formatDate(res.startTime)} – {formatDate(res.endTime)}</p>
                                            </div>

                                            <div className="mt-3 flex justify-end items-center">
                                                <Link
                                                    to={`/dashboard-admin/review-reservation/${res._id}`}
                                                    className="text-brand-darker hover:text-brand-dark text-sm font-medium"
                                                >
                                                    Review →
                                                </Link>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PendingReservations;