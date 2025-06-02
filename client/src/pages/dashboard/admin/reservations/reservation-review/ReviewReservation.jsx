import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  fetchReservationById,
  updateReservationStatus,
  handleReapproval,
} from "@api/reservations";
import { getVehicles } from "@api/vehicles";
import { useParams, useNavigate } from "react-router-dom";
import SuccessMessage from "@components/ui/SuccessMessage";
import Loading from "@utils/Loading";
import ReservationDetails from "./ReservationDetails";
import VehicleDragAndDropList from "./VehicleDragAndDropList";
import SelectedVehicle from "./SelectedVehicle";
import ApprovalSection from "@pages/dashboard/admin/reservations/reservation-review/ApprovalSection";

const ReviewReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState([]);
  const [status, setStatus] = useState("");
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
        if (res.status !== "pending" && res.status !== "pending-reapproval") {
          navigate("/dashboard-admin");
          return;
        }
        setReservation(res);
        setStatus(res.status);
        const veh = await getVehicles();
        console.log(veh.data);
        setVehicles(veh.data);
      } catch (error) {
        console.log(error);
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

  const handleReservationUpdate = async (action, additionalData = {}) => {
    try {
      setLoading(true);

      if (status === "pending-reapproval") {
        const response = await handleReapproval(id, { action });
        setConfirmationMessage(`Reservation ${action}d successfully!`);
        setReservation(response.reservation);
      } else if (status === "pending") {
        const response = await updateReservationStatus(id, {
          status: action,
          ...additionalData,
        });
        setConfirmationMessage(
          `Reservation ${
            action === "approved" ? "approved" : "rejected"
          } successfully!`
        );
        if (action === "approved") {
          setSelectedVehicle(null);
        } else if (action === "declined") {
          setRejectReason("");
        }
        setReservation(response.reservation);
      }

      setApproveError("");
    } catch (err) {
      setError(
        err.message || "An error occurred while updating the reservation."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = () => {
    if (status === "pending") {
      if (!selectedVehicle) {
        setApproveError("Please select a vehicle to approve the reservation.");
        return;
      }
      handleReservationUpdate("approved", { vehicle: selectedVehicle._id });
    } else if (status === "pending-reapproval") {
      handleReservationUpdate("approve");
    }
  };

  const handleReject = () => {
    if (status === "pending") {
      if (!rejectReason) {
        setApproveError("Please provide a reason for rejection.");
        return;
      }
      handleReservationUpdate("declined", { rejectReason });
    } else if (status === "pending-reapproval") {
      handleReservationUpdate("reject");
    }
  };

  const handleDecideLater = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-error bg-red-100 p-4 rounded-md">
        <span>{error}</span>
      </div>
    );
  }

  const groupedVehicles = vehicles.reduce((acc, veh) => {
    const firstLetter = veh.brand[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(veh);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto mt-6 p-6 bg-white rounded-base shadow relative">
      <button
        onClick={() => navigate("/dashboard-admin/pending-reservations")}
        className="absolute top-0 right-0 text-xl"
      >
        ✖
      </button>
      <ReservationDetails reservation={reservation} />
      {confirmationMessage ? (
        <SuccessMessage message={confirmationMessage} />
      ) : (
        <>
          {status === "pending-reapproval" && (
            <p>Decide if you want to approve the change:</p>
          )}
          <ApprovalSection
            onApprove={handleApprove}
            onReject={handleReject}
            onDecideLater={handleDecideLater}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
            approveError={approveError}
          />
          {status === "pending" && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Assign a vehicle to {reservation.user?.firstName}
              </h3>
              <VehicleDragAndDropList groupedVehicles={groupedVehicles} />
              <SelectedVehicle selectedVehicle={selectedVehicle} />
            </DragDropContext>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewReservation;
