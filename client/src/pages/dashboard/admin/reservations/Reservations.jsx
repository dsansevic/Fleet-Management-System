import { fetchAllReservations } from "@api/reservations";
import usePagination from "@hooks/usePagination";
import Pagination from "@utils/Pagination";
import Loading from "@utils/Loading";
import Title from "@components/ui/Title";
import GetReservationStatus from "@utils/GetReservationStatus";
import { getPreviewText } from "@utils/getPreviewText";
import { formatDate } from "@utils/formatDate";

const Reservations = () => {
    const { data: reservations, error, loading, totalPages, currentPage, handlePageChange } =
        usePagination(fetchAllReservations, "reservationsPage", 6);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Title>All Reservations</Title>
            <p className="text-gray-600 mb-4">Here is a list of all reservations made within your company.</p>

            {loading ? (
                <Loading />
            ) : error ? (
                <p className="text-error bg-red-100 p-4 rounded-md">{error}</p>
            ) : reservations.length === 0 ? (
                <p className="flex flex-col items-center justify-center text-gray-500 text-lg text-center p-10 bg-gray-50 border border-gray-300 rounded-xl shadow-sm">
                    <span className="text-4xl mb-2">ⓘ</span>
                    <span className="font-semibold text-gray-700">No reservations recorded</span>
                    <span className="text-sm text-gray-500 text-center">
                        There are no active or past reservations in the system.<br />
                        Check again later or contact support if this seems incorrect.
                    </span>
                </p>            
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

                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                                        <p><strong>Requested by:</strong> {res.user?.firstName} {res.user?.lastName}</p>
                                        <p><strong>Email:</strong> {res.user?.email}</p>
                                    </div>

                                    {res.vehicle && (
                                        <div className="mt-3 p-3 bg-purple-50 rounded-lg text-sm">
                                            <p><strong>Vehicle:</strong> {res.vehicle.brand} {res.vehicle.model}</p>
                                            <p><strong>License Plate:</strong> {res.vehicle.licensePlate}</p>
                                            <p><strong>Type:</strong> {res.vehicle.type}</p>
                                        </div>
                                    )}
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

export default Reservations;