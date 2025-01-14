import { ClockIcon, UserIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@utils/formatDate";

const ReservationDetails = ({ reservation }) => {
    const detailItem = ({ icon: Icon, title, value, iconBg, iconText }) => (
        <div className="flex items-center space-x-4">
            <div className={`${iconBg} ${iconText} rounded-full p-2`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-500">{title}</h4>
                <p className="text-md font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );

    return (
        <section className="mb-6">
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Reservation Details</h3>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                    Please review the details of the reservation below.
                </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {detailItem({
                    icon: UserIcon,
                    title: "Requested by",
                    value: `${reservation.user?.firstName} ${reservation.user?.lastName}`,
                    iconBg: "bg-blue-100",
                    iconText: "text-blue-500",
                })}

                {detailItem({
                    icon: ClipboardDocumentIcon,
                    title: "Purpose",
                    value: reservation.purpose,
                    iconBg: "bg-green-100",
                    iconText: "text-green-500",
                })}

                {detailItem({
                    icon: ClockIcon,
                    title: "Time",
                    value: `${formatDate(reservation.startTime)} – ${formatDate(reservation.endTime)}`,
                    iconBg: "bg-yellow-100",
                    iconText: "text-yellow-500",
                })}
            </div>
            {reservation.additionalDetails?.trim() && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500">Additional details:</h4>
                    <p className="text-md font-medium text-gray-800">{reservation.additionalDetails}</p>
                </div>
            )}
            </div>
        </section>
    );
};

export default ReservationDetails;