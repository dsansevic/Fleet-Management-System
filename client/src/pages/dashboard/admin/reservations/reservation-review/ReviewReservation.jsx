import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { fetchReservationById, updateReservation } from "@api/reservations";
import { getVehicles } from "@api/vehicles";
import { useParams, useNavigate } from "react-router-dom";

import ReservationDetails from "./ReservationDetails";
import VehicleDragAndDropList from "./VehicleDragAndDropList";
import SelectedVehicle from "./SelectedVehicle";
import ApprovalSection from "@pages/dashboard/admin/reservations/reservation-review/ApprovalSection";

const ReviewReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [reservation, setReservation] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [rejectReason, setRejectReason] = useState("");
    const [approveError, setApproveError] = useState("");

    useEffect(() => {
        const loadReservation = async () => {
            try {
                setLoading(true);
                const res = await fetchReservationById(id);
                if (res.status !== "pending") {
                    navigate("/dashboard-admin");
                    return;
                }
                setReservation(res);
                const veh = await getVehicles();
                setVehicles(veh);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadReservation();
    }, [id]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        if (result.destination.droppableId === "selectedVehicle") {
            const vehicle = vehicles.find((veh) => veh._id === result.draggableId);
            setSelectedVehicle(vehicle);
            setApproveError("");
        }
    };

    const handleReservationUpdate = async (status, additionalData = {}) => {
        try {
            setLoading(true);
            await updateReservation(id, { status, ...additionalData });

            if (status === "approved") {
                setConfirmationMessage("Reservation approved successfully!");
                setSelectedVehicle(null);
            } else if (status === "declined") {
                setConfirmationMessage("Reservation rejected successfully.");
                setRejectReason("");
            }

            setApproveError("");
        } catch (err) {
            setError(err.message || "An error occurred while updating the reservation.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = () => {
        if (!selectedVehicle) {
            setApproveError("Please select a vehicle to approve the reservation.");
            return;
        }
        handleReservationUpdate("approved", { vehicle: selectedVehicle._id });
    };

    const handleReject = () => {
        if (!rejectReason) {
            setApproveError("Please provide a reason for rejection.");
            return;
        }
        handleReservationUpdate("declined", {rejectReason: rejectReason});
    };

    const handleDecideLater = () => {
        navigate(-1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-error">{error}</div>;
    }

    const groupedVehicles = vehicles.reduce((acc, veh) => {
        const firstLetter = veh.brand[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(veh);
        return acc;
    }, {});

    return (
        <div className="max-w-5xl mx-auto mt-6 p-6 bg-white rounded shadow">
            <ReservationDetails reservation={reservation} />
            {confirmationMessage ? (
                <div className="my-6 p-4 bg-blue-100 text-blue-800 rounded shadow">
                    {confirmationMessage}
                </div>
            ) : (
            <>
                <ApprovalSection
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDecideLater={handleDecideLater}
                    rejectReason={rejectReason}
                    setRejectReason={setRejectReason}
                    approveError={approveError}
                />
                <DragDropContext onDragEnd={handleDragEnd}>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Assign a vehicle to {reservation.user?.firstName}
                    </h3>
                    <VehicleDragAndDropList groupedVehicles={groupedVehicles} />
                    <SelectedVehicle selectedVehicle={selectedVehicle} />
                </DragDropContext>
            </>
        )}
        </div>
    );
};

export default ReviewReservation;