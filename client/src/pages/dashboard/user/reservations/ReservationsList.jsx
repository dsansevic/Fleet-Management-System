import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";
import { formatDate } from "@utils/formatDate";
import { getPreviewText } from "@utils/getPreviewText";
import usePagination from "@hooks/usePagination";
import Pagination from "@utils/Pagination";
import Loading from "@utils/Loading";
import Title from "@components/ui/Title";
import EmptyStateMessage from "@components/ui/EmptyStateMessage"

const ReservationsList = ({ title, description, fetchFunction, storageKey, emptyMessage, link }) => {
    const { data: reservations, error, loading, totalPages, currentPage, handlePageChange } =
        usePagination(fetchFunction, storageKey, 6);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Title>{title}</Title>
            <p className="text-gray-600 mb-4">{description}</p>

            {loading ? (
                <Loading />
            ) : error ? (
                <p className="text-error bg-red-100 p-4 rounded-md">{error}</p>
            ) : reservations.length === 0 ? (
                <EmptyStateMessage 
                    icon="🕒"
                    title="No active reservations"
                    message={emptyMessage}
                    link={link && { to: link, text: "Create one!" }}
                />
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
                                        {getPreviewText(res.purpose)}
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

                    <Pagination 
                        totalPages={totalPages} 
                        currentPage={currentPage} 
                        handlePageChange={handlePageChange} 
                    />
                </>
            )}
        </div>
    );
};

export default ReservationsList;