import { fetchActiveReservations } from "@api/reservations";
import ReservationsList from "./ReservationsList";

const ActiveReservations = () => {
  return (
    <ReservationsList
      title="Active Reservations"
      description="Active reservations include upcoming bookings and those currently in progress. 
                         You can change the end time or cancel up to 90 minutes before the reservation starts."
      fetchFunction={fetchActiveReservations}
      storageKey="activeReservationsPage"
      emptyMessage="No active reservations at the moment. "
      link="/dashboard-user/new-reservation"
    />
  );
};

export default ActiveReservations;
