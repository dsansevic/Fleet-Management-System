import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";
import { shortDate } from "@utils/shortDate";
import { getPreviewText } from "@utils/getPreviewText";
import usePagination from "@hooks/usePagination";
import Pagination from "@utils/Pagination";
import Loading from "@utils/Loading";
import Title from "@components/ui/Title";
import EmptyStateMessage from "@components/ui/EmptyStateMessage";

const ReservationsList = ({
  title,
  description,
  fetchFunction,
  storageKey,
  emptyMessage,
  link,
}) => {
  const {
    data: reservations,
    error,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
  } = usePagination(fetchFunction, storageKey, 6);

  return (
    <div className="p-6 w-full mx-auto">
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

                  <p className="text-sm text-gray-700">
                    {res.additionalDetails ? (
                      <>
                        <strong>Special request: </strong>{" "}
                        {getPreviewText(res.additionalDetails)}
                      </>
                    ) : (
                      "No special request provided."
                    )}
                  </p>

                  <Link
                    to={`/dashboard-user/reservation/${res._id}`}
                    className="mt-3 w-full text-center text-brand-darker bg-sky-50 p-2 rounded-xl hover:bg-sky-100 cursor-pointer text-sm font-medium"
                  >
                    View Details
                  </Link>
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
