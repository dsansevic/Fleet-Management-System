import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchReservationById, updateReservation } from "@api/reservations";
import GetReservationStatus from "@utils/GetReservationStatus";
import EditReservationForm from "./EditReservationForm";
import { ArrowLeftIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { formatDate } from "@utils/formatDate";
import Modal from "@components/ui/Modal";

const ReservationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    useEffect(() => {
        const loadReservation = async () => {
            try {
                const data = await fetchReservationById(id);
                setReservation(data);
            } catch (error) {
                setError(error.message);
            }
        };
        loadReservation();
    }, [id]);

    const timeDifferenceInMinutes = (date) =>
        (new Date(date) - new Date()) / (1000 * 60);

    const handleUpdate = async (NewEndTime) => {
        setIsUpdating(true);
        try {
            console.log("u kompo", NewEndTime)
            const updatedReservation = await updateReservation(id, { NewEndTime });
            setReservation(updatedReservation.reservation);
            setIsEditing(false);
        } catch (error) {
            setError(error.message || "Failed to update reservation.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = async () => {
        setIsUpdating(true);
        try {
            const updatedReservation = await updateReservation(id, { status: "canceled" });
            setReservation(updatedReservation.reservation);
            setShowCancelConfirm(false);
        } catch (error) {
            setError(error.message || "Failed to cancel reservation.");
        } finally {
            setIsUpdating(false);
        }
    };

    if (error) {
        return (
            <div className="flex items-center space-x-2 text-red-600 bg-red-100 p-4 rounded-md">
                <XCircleIcon className="h-5 w-5" />
                <span>{error}</span>
            </div>
        );
    }

    if (!reservation) {
        return <p>Loading reservation details...</p>;
    }

    const statusInfo = GetReservationStatus(reservation.status);

    const canEditOrCancel =
        timeDifferenceInMinutes(reservation.startTime) > 90 &&
        ["approved", "pending", "pending-reapproval"].includes(reservation.status);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400 flex items-center space-x-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Go back</span>
                </button>
            </div>

            <div className="bg-white shadow-md border rounded-lg p-6 space-y-4">
                <h3
                    className={`text-xl font-semibold ${
                        statusInfo.color === "text-gray-500" ? "line-through" : statusInfo.color
                    }`}
                >
                    {reservation.purpose}
                </h3>
                <div className={`flex items-center space-x-2 ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <span>{statusInfo.message}</span>
                </div>
                <p>
                    <span className="font-bold">Start Time:</span>{" "}
                    {formatDate(reservation.startTime)}
                </p>
                <p>
                    <span className="font-bold">End Time:</span>{" "}
                    {formatDate(reservation.endTime)}
                </p>
                {reservation.newStartTime && (
                    <p>
                        <span className="font-bold">Proposed Start Time:</span>{" "}
                        {formatDate(reservation.newStartTime)}
                    </p>
                )}
                {reservation.newEndTime && (
                    <p>
                        <span className="font-bold">Proposed End Time:</span>{" "}
                        {formatDate(reservation.newEndTime)}
                    </p>
                )}
                {reservation.additionalDetails && (
                    <p>
                        <span className="font-medium">Additional Details:</span>{" "}
                        {reservation.additionalDetails}
                    </p>
                )}

                {isEditing && canEditOrCancel ? (
                    <EditReservationForm
                        reservation={reservation}
                        onSave={handleUpdate}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : canEditOrCancel ? (
                    <>
                    <span className="font-semibold">You can edit this reservation 90 minutes before it starts.</span>
                    <div className="flex space-x-4">
                        <button
                            className="bg-brand-base text-white px-4 py-2 rounded shadow hover:bg-brand-light flex items-center space-x-2"
                            onClick={() => setIsEditing(true)}
                        >
                            <PencilSquareIcon className="h-5 w-5" />
                            <span>Update</span>
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 flex items-center space-x-2"
                            onClick={() => setShowCancelConfirm(true)}
                        >
                            <XCircleIcon className="h-5 w-5" />
                            <span>Cancel reservation</span>
                        </button>
                    </div>
                    </>
                ) : (
                    <div className="flex items-center space-x-2 text-red-600">
                        <XCircleIcon className="h-5 w-5" />
                        <span>You can no longer edit or cancel this reservation.</span>
                    </div>
                )}
            </div>

            <Modal
                isOpen={showCancelConfirm}
                onClose={() => setShowCancelConfirm(false)}
                title="Are you sure you want to cancel this reservation?"
                content={
                    <p>
                        Keep in mind you won't be able to reactivate this reservation once canceled. 
                        You will have to create a new one.
                    </p>
                }
                actions={[
                    {
                        label: "No, go back",
                        className: "bg-gray-300 text-gray-800 px-4 py-2 rounded",
                        onClick: () => setShowCancelConfirm(false),
                    },
                    {
                        label: "Yes, cancel",
                        className: "bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600",
                        onClick: handleCancel,
                    },
                ]}
            />
        </div>
    );
};

export default ReservationDetails;