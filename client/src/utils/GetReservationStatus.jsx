import { 
    CheckCircleIcon, 
    ClockIcon, 
    XCircleIcon,
    ExclamationCircleIcon,
    PlayCircleIcon
} from "@heroicons/react/20/solid";

const GetReservationStatus = (status) => {
    switch (status) {
        case "approved":
            return {
                label: "Approved",
                icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                color: "text-green-600",
                message: "This reservation has been approved and is ready to use.",
            };
        case "pending":
        case "pending-reapproval":
            return {
                label: "Pending",
                icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
                color: "text-yellow-600",
                message: "This reservation is awaiting manager approval. You will be notified once a decision is made.",
            };
        case "declined":
            return {
                label: "Declined",
                icon: <XCircleIcon className="h-6 w-6 text-red-500" />,
                color: "text-red-600",
                message: "Unfortunately, your reservation has been declined.",
            };
        case "canceled":
            return {
                label: "Canceled",
                icon: <XCircleIcon className="h-6 w-6 text-gray-500" />,
                color: "text-gray-500",
                message: "This reservation has been canceled.",
            };
        case "expired":
            return {
                label: "Expired",
                icon: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />,
                color: "text-gray-500",
                message: "This reservation has expired.",
            };
        case "completed":
            return {
                label: "Completed",
                icon: <CheckCircleIcon className="h-6 w-6 text-blue-500" />,
                color: "text-blue-600",
                message: "This reservation has been successfully completed.",
            };
        case "live":
            return {
                label: "Live",
                icon: <PlayCircleIcon className="h-6 w-6 text-blue-500" />,
                color: "text-blue-500",
                message: "This reservation is currently active.",
            };
        default:
            return {
                label: "Unknown",
                icon: null,
                color: "text-gray-600",
                message: "Unknown status.",
            };
    }
};

export default GetReservationStatus;