import { getVehicles } from "@api/vehicles";
import Pagination from "@utils/Pagination";
import Loading from "@utils/Loading";
import { Link } from "react-router-dom";
import { formatDate } from "@utils/formatDate"
import usePagination from "@hooks/usePagination";

const VehicleList = () => {
    const { data: vehicles, error, loading, totalPages, currentPage, handlePageChange } =
    usePagination(getVehicles, "vehiclePage", 6);

    return (
        <div className="pt-6">
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="text-error bg-red-100 p-4 rounded-md">{error}</p>
            ) : vehicles.length === 0 ? (
                <p className="text-gray-600 text-center">No vehicles registered.</p>
            ) : (
                <>
                    <div className="max-w-6xl mx-auto">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {vehicles.map((vehicle) => (
                                <li
                                key={vehicle._id}
                                className="flex flex-col justify-between p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition duration-200"
                            >
                                <div className="flex justify-between items-center w-full pb-3 border-b border-gray-300">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {vehicle.brand} {vehicle.model}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 text-xs font-medium uppercase rounded-full ${
                                            vehicle.status === 'available' 
                                                ? 'bg-green-100 text-green-700' 
                                                : vehicle.status === 'occupied' 
                                                ? 'bg-red-100 text-red-700' 
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 text-gray-700 text-sm">
                                    <p><strong>Plate:</strong> {vehicle.licensePlate}</p>
                                    <p><strong>Type:</strong> {vehicle.type}</p>
                                    <p><strong>Capacity:</strong> {vehicle.capacity} seats</p>
                                    <p><strong>Inspection due:</strong> {formatDate(vehicle.vehicleInspection)}</p>
                                </div>

                                <Link
                                    to={`edit/${vehicle._id}`}
                                    className="mt-4 px-4 py-2 text-brand-dark bg-purple-50 hover:bg-purple-100 rounded-md text-sm font-medium shadow-sm transition-all w-full text-center"
                                >Edit
                                </Link>
                            </li>
                            
                            ))}
                        </ul>
                    </div>

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

export default VehicleList;