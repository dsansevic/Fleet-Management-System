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
                icon: <CheckCircleIcon className="h-6 w-6 text-green-800" />,
                color: "text-green-800",
                message: "This reservation has been approved!",
            };
        case "resolved":
            return {
                label: "Resolved",
                icon: <CheckCircleIcon className="h-6 w-6 text-green-800" />,
                color: "text-green-800",
                message: "This reservation has been approved and is ready to use.",
            };
        case "pending":
        case "pending-reapproval":
            return {
                label: "Pending",
                icon: <ClockIcon className="h-6 w-6 text-yellow-800" />,
                color: "text-yellow-800",
                message: "This reservation is awaiting manager approval. You will be notified once a decision is made.",
            };
        case "declined":
            return {
                label: "Declined",
                icon: <XCircleIcon className="h-6 w-6 text-red-800" />,
                color: "text-red-800",
                message: "Unfortunately, your reservation has been declined.",
            };
        case "canceled":
            return {
                label: "Canceled",
                icon: <XCircleIcon className="h-6 w-6 text-gray-800" />,
                color: "text-gray-800",
                message: "This reservation has been canceled.",
            };
        case "expired":
            return {
                label: "Expired",
                icon: <ExclamationCircleIcon className="h-6 w-6 text-red-800" />,
                color: "text-gray-800",
                message: "This reservation has expired.",
            };
        case "completed":
            return {
                label: "Completed",
                icon: <CheckCircleIcon className="h-6 w-6 text-blue-800" />,
                color: "text-blue-800",
                message: "This reservation has been successfully completed.",
            };
        case "live":
            return {
                label: "Live",
                icon: <PlayCircleIcon className="h-6 w-6 text-blue-800" />,
                color: "text-blue-800",
                message: "This reservation is currently active.",
            };
        case "in-progress":
            return {
                label: "In progress",
                icon: <PlayCircleIcon className="h-6 w-6 text-blue-800" />,
                color: "text-blue-800",
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