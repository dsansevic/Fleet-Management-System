import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchReservationById, updateReservation } from "@api/reservations";
import GetReservationStatus from "@utils/GetReservationStatus";
import EditReservationForm from "./EditReservationForm";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/20/solid";
import SuccessMessage from "@components/ui/SuccessMessage";
import { formatDate } from "@utils/formatDate";
import Modal from "@components/ui/Modal";
import ServerErrorMessage from "@components/ui/ServerErrorMessage";
import Loading from "@utils/Loading"; 

const ReservationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadReservation = async () => {
            try {
                setLoading(true);
                const data = await fetchReservationById(id);
                setReservation(data);
                console.log(data)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        };
        loadReservation();
    }, [id]);

    const timeDifferenceInMinutes = (date) =>
        (new Date(date) - new Date()) / (1000 * 60);

    const handleUpdate = async (NewEndTime) => {
        try {
            setLoading(true)
            const updatedReservation = await updateReservation(id, { NewEndTime });
            setReservation(updatedReservation.reservation);
            setSuccessMessage("Reservation updated successfully.");
            setIsEditing(false);
        } catch (error) {
            setError(error.message || "Failed to update reservation.");
        } finally {
            setLoading(false)
        }
    };

    const handleCancel = async () => {
        try {
            setLoading(true)
            const updatedReservation = await updateReservation(id, { status: "canceled" });
            setReservation((prev) => ({
                ...prev,
                status: updatedReservation.reservation.status,
            }));
            setSuccessMessage("Reservation canceled successfully.");
            setShowCancelConfirm(false);
        } catch (error) {
            setError(error.message || "Failed to cancel reservation.");
        } finally {
            setLoading(false)
        }
    };

    if (error) {
        return (
            <div className="flex items-center space-x-2 text-error bg-red-100 p-4 rounded-md">
                <span>{error}</span>
            </div>
        )
    }
    if (loading || !reservation ) {
        return <Loading />
    }

    const statusInfo = GetReservationStatus(reservation.status);

    const canEditOrCancel =
        timeDifferenceInMinutes(reservation.startTime) > 90 &&
        ["approved", "pending", "pending-reapproval"].includes(reservation.status);

    return (
        <div className="p-6 lg:px-20 sm:w-screen max-w-3xl mx-auto my-auto h-full">
            <div className="bg-white shadow-md border rounded-2xl p-6 space-y-4 relative">
            <button onClick={() => navigate(-1)} className="absolute top-0 right-0 text-xl">
            ✖
            </button>
            {successMessage && <SuccessMessage message={successMessage} />}

                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900">{reservation.purpose}</h3>
                    <div className={`inline-flex items-center px-3 py-1 mt-2 rounded-full text-md font-medium ${statusInfo.color} `}>
                        <span className="ml-2">{statusInfo.message}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 text-sm rounded-lg text-gray-700 bg-purple-50 p-4 pl-10">
                    <p><span className="font-bold">Starts:</span> {formatDate(reservation.startTime)}</p>
                    <p><span className="font-bold">Ends:</span> {formatDate(reservation.endTime)}</p>

                    {reservation.newEndTime && (
                        <p><span className="font-bold">Proposed ending:</span> {formatDate(reservation.newEndTime)}</p>
                    )}
                    {reservation.additionalDetails && (
                        <p className="col-span-2">
                            <span className="font-bold">Additional Details:</span> {reservation.additionalDetails}
                        </p>
                    )}
                    {reservation.vehicle && (
                        <p className="col-span-2">
                            <span className="font-bold">Assigned vehicle:</span> {reservation.vehicle.brand}, {reservation.vehicle.model}, {reservation.vehicle.type}, {reservation.vehicle.licensePlate}, seat number: {reservation.vehicle.capacity}
                        </p>
                    )}
                </div>
                

                {isEditing && canEditOrCancel ? (
                    <EditReservationForm
                        reservation={reservation}
                        onSave={handleUpdate}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : canEditOrCancel ? (
                    <>
                    <div className="flex justify-between">
                        <button
                            className="bg-white text-brand-base px-4 py-2 rounded-2xl shadow shadow-gray-300 hover:bg-gray-50 flex items-center space-x-2"
                            onClick={() => setIsEditing(true)}
                        >
                            <PencilSquareIcon className="h-5 w-5" />
                            <span>Update</span>
                        </button>
                        <button
                            className="bg-white text-gray-500 px-4 py-2 rounded-2xl shadow shadow-gray-300 hover:bg-gray-50 flex items-center space-x-2"
                            onClick={() => setShowCancelConfirm(true)}
                        >
                            <XCircleIcon className="h-5 w-5" />
                            <span>Cancel reservation</span>
                        </button>
                    </div>
                    </>
                ) : (
                    <div className="text-center text-brand-darkest font-bold space-x-2 ">
                        You can no longer edit or cancel this reservation !
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