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
        <div className="p-6 w-full mx-auto">
            <Title>Reservations Awaiting Your Review</Title>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed my-4">
                Review pending reservations and approve or decline them 1 hour before they start.
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
                        <div className="p-4 border border-purple-200 rounded-2xl bg-gray-200 mb-8">
                            <h3 className="text-lg font-bold text-brand-darker mb-3">
                            Modified Reservations
                            </h3>
                            <div className="text-sm bg-white p-3 rounded-2xl mb-4 border-l-4 border-brand-darker">
                                <p className="text-brand-dark">
                                    <strong>Important:</strong> Some reservations have been modified by users and require your review. If no action is taken, the original details will remain active.
                                </p>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {reapprovalReservations.map((res) => (
                                    <li
                                        key={res._id}
                                        className="relative bg-white shadow-md rounded-2xl p-4 flex flex-col space-y-3 hover:shadow-lg border border-brand-lighter transition-all duration-300"
                                    >
                                        <h4 className="text-base font-semibold text-gray-900 truncate">
                                            {getPreviewText(res.purpose)}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {res.user.firstName} {res.user.lastName} ({res.user.email})
                                        </p>
                                        <div className="text-sm text-gray-700">
                                            {formatDate(res.startTime)} – {formatDate(res.endTime)}
                                        </div>
                                        <Link
                                            to={`/dashboard-admin/review-reservation/${res._id}`}
                                            className="mt-3 text-sm text-brand-dark bg-purple-100 hover:bg-purple-200 rounded-2xl py-2 text-center shadow-sm transition-all"
                                        >
                                            Review Changes
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {pendingReservations.length > 0 && (
                        <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <h3 className="text-lg font-bold text-brand-darker mb-3">
                            Pending Approvals
                        </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pendingReservations.map((res) => {
                                    const status = GetReservationStatus(res.status);
                                    return (
                                        <li
                                            key={res._id}
                                            className="relative bg-white shadow-md rounded-2xl p-5 flex flex-col space-y-4 hover:shadow-xl border border-purple-200 transition-all duration-300 hover:bg-slate-50"
                                        >
                                        <div className="w-full pb-3 border-b border-gray-300x shadow-  ">
                                            <h3 className="text-xl font-semibold  text-gray-900">
                                            {getPreviewText(res.purpose)}
                                            </h3>
                                        </div>

                                            <p className="text-sm text-gray-700">
                                            {res.user.firstName}{" "}{res.user.lastName} ({res.user.email})
                                            </p>

                                            <div className="text-sm font-semibold text-gray-600">
                                            <p>{formatDate(res.startTime)} – {formatDate(res.endTime)}</p>
                                            </div>

                                            <Link
                                                to={`/dashboard-admin/review-reservation/${res._id}`}
                                                className="mt-4 px-4 py-2 text-white bg-brand-dark hover:bg-brand-darker rounded-2xl text-sm font-medium shadow-sm transition-all w-full text-center"
                                            >Review
                                            </Link>
                                            
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