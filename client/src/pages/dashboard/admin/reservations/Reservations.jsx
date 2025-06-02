import { fetchAllReservations } from "@api/reservations";
import usePagination from "@hooks/usePagination";
import Pagination from "@utils/Pagination";
import Loading from "@utils/Loading";
import Title from "@components/ui/Title";
import GetReservationStatus from "@utils/GetReservationStatus";
import { getPreviewText } from "@utils/getPreviewText";
import { shortDate } from "@utils/shortDate";
import EmptyStateMessage from "@components/ui/EmptyStateMessage";
import { Link } from "react-router-dom";

const Reservations = () => {
  const {
    data: reservations,
    error,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
  } = usePagination(fetchAllReservations, null, 6);

  return (
    <div className="p-6 w-full mx-auto">
      <Title>All Reservations</Title>
      <p className="text-gray-600 mb-4 text-xl">
        A read-only list displaying every reservation across your organization.
        To make changes or manage active bookings, head to the{" "}
        <Link
          to={"../pending-reservations"}
          className="text-brand-base hover:text-brand-light"
        >
          Active Reservations{" "}
        </Link>{" "}
      </p>

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-error bg-red-100 p-4 rounded-md">{error}</p>
      ) : reservations.length === 0 ? (
        <EmptyStateMessage
          icon="🕒"
          title="No reservations recorded"
          message="There are no active or past reservations in the system. 
                            Check again later or contact support if this seems incorrect."
        />
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((res) => {
              const status = GetReservationStatus(res.status);
              return (
                <li
                  key={res._id}
                  className="relative bg-white border border-gray-200 backdrop-blur-xl shadow-sm rounded-base p-5 flex flex-col space-y-4 hover:shadow-md shadow-gray-300 transition-all duration-300"
                >
                  <div className="w-full pb-3 border-b border-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900 mt-2 break-words hyphens-auto">
                      {getPreviewText(res.purpose)}
                    </h3>
                    <div>
                      <span className="text-sm text-gray-500">
                        {shortDate(res.startTime)} – {shortDate(res.endTime)}
                      </span>

                      <span className="flex items-center">
                        <span className="w-4 h-4 flex items-center justify-center text-sm">
                          {status.icon}
                        </span>
                        <span
                          className={`text-sm font-medium px-2 py-0.5 rounded-full ${status.color} bg-opacity-20 flex items-center`}
                        >
                          {status.label}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-gray-700 text-md">
                    <p>
                      <strong>Requested by:</strong> {res.user?.firstName}{" "}
                      {res.user?.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {res.user?.email}
                    </p>

                    {res.vehicle && (
                      <p>
                        <strong>Assigned vehicle: </strong>
                        {res.vehicle.brand} {res.vehicle.model} (
                        {res.vehicle.licensePlate})
                      </p>
                    )}
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

export default Reservations;
