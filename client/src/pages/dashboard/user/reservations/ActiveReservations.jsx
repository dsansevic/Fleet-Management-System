import { fetchActiveReservations } from "@api/reservations";
import ReservationsList from "./ReservationsList";

const ActiveReservations = () => {
    return (
        <ReservationsList
            title="Active Reservations"
            description="Active reservations include upcoming bookings and those currently in progress. 
                         You can check the details of each reservation and, if needed, change the end time or 
                         cancel them up to 90 minutes before the start time."
            fetchFunction={fetchActiveReservations}
            storageKey="activeReservationsPage"
            emptyMessage = "No active reservations at the moment. "
            link = "/dashboard-user/new-reservation" 
        />
    );
};

export default ActiveReservations;